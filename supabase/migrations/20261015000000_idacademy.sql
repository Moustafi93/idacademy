-- ════════════════════════════════════════════════════════════════════
--  IDAcademy — base de données (Supabase / PostgreSQL)
--
--  Principe de sécurité : le navigateur ne décide JAMAIS de l'accès premium.
--  Les prix, l'essai et l'activation de l'abonnement sont gérés ici, par des
--  fonctions exécutées sur le serveur. Les règles RLS (Row Level Security)
--  empêchent chaque étudiant de lire ou modifier les données des autres.
-- ════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────── Tarifs et paramètres
create table public.tarifs (
  formule text primary key,
  nom     text not null,
  prix    integer not null check (prix > 0),      -- en francs CFA
  jours   integer not null check (jours > 0),     -- durée d'accès achetée
  actif   boolean not null default true
);

insert into public.tarifs (formule, nom, prix, jours) values
  ('mensuel',   'Mensuel',     3000, 31),
  ('trimestre', 'Pass 3 mois', 8500, 93);

-- Paramètres privés (jamais lisibles depuis le navigateur)
create table public.parametres (
  cle    text primary key,
  valeur text not null
);

insert into public.parametres (cle, valeur) values
  ('code_essai', 'IDA3'),
  ('jours_essai', '3');

-- ─────────────────────────────────────────────── Profils des étudiants
create table public.profils (
  id             uuid primary key references auth.users (id) on delete cascade,
  email          text,
  prenom         text not null default '',
  telephone      text,
  role           text not null default 'etudiant' check (role in ('etudiant', 'admin')),
  essai_utilise  boolean not null default false,
  acces_jusquau  timestamptz,                       -- fin de l'accès complet (essai ou premium)
  type_acces     text check (type_acces in ('essai', 'premium')),
  derniere_lecon text,
  cree_le        timestamptz not null default now()
);

-- Un profil est créé automatiquement à chaque inscription
create function public.creer_profil() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profils (id, email, prenom)
  values (new.id, new.email, coalesce(trim(new.raw_user_meta_data ->> 'prenom'), ''));
  return new;
end $$;

create trigger apres_inscription
  after insert on auth.users
  for each row execute function public.creer_profil();

-- ─────────────────────────────────────────────── Paiements
create table public.paiements (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.profils (id) on delete cascade,
  formule          text not null references public.tarifs (formule),
  montant          integer not null,               -- copié du tarif au moment du paiement
  jours            integer not null,
  moyen            text not null check (moyen in ('djamo', 'wave', 'orange_money', 'mtn_momo', 'moov_money')),
  numero_payeur    text,
  reference        text,                           -- référence de la transaction (mobile money)
  statut           text not null default 'en_attente' check (statut in ('en_attente', 'valide', 'refuse')),
  djamo_charge_id  text unique,
  motif_refus      text,
  cree_le          timestamptz not null default now(),
  traite_le        timestamptz,
  traite_par       uuid references public.profils (id)
);

-- Une même référence de transaction ne peut pas être déclarée deux fois
create unique index paiements_reference_unique
  on public.paiements (moyen, lower(reference))
  where reference is not null and statut <> 'refuse';

create index paiements_statut on public.paiements (statut, cree_le);

-- ─────────────────────────────────────────────── Progression
create table public.progression (
  user_id     uuid not null references public.profils (id) on delete cascade,
  lecon       text not null,                       -- « matiere/chapitre/lecon »
  terminee_le timestamptz not null default now(),
  primary key (user_id, lecon)
);

create table public.activite (
  user_id uuid not null references public.profils (id) on delete cascade,
  jour    date not null default current_date,
  primary key (user_id, jour)
);

-- ─────────────────────────────────────────────── Contenu premium
-- Les chapitres payants ne sont PAS dans le site public : ils sont ici,
-- et seuls les comptes ayant un accès complet peuvent les lire.
create table public.contenu_premium (
  cle        text primary key,                     -- « matiere/chapitre »
  lecons     jsonb not null,
  mis_a_jour timestamptz not null default now()
);

-- ════════════════════════════════════════════════════════════════════
--  Fonctions utilitaires
-- ════════════════════════════════════════════════════════════════════
create function public.est_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select role = 'admin' from public.profils where id = auth.uid()), false)
$$;

create function public.a_acces_complet() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select acces_jusquau > now() from public.profils where id = auth.uid()), false)
$$;

-- ════════════════════════════════════════════════════════════════════
--  Règles d'accès (RLS)
-- ════════════════════════════════════════════════════════════════════
alter table public.tarifs          enable row level security;
alter table public.parametres      enable row level security;
alter table public.profils         enable row level security;
alter table public.paiements       enable row level security;
alter table public.progression     enable row level security;
alter table public.activite        enable row level security;
alter table public.contenu_premium enable row level security;

-- Tarifs : visibles par tous (page Abonnement)
create policy tarifs_lecture on public.tarifs for select using (true);

-- Paramètres : aucune règle = aucun accès depuis le navigateur

-- Profils : chacun voit le sien ; l'admin voit tout
create policy profils_lecture on public.profils for select
  using (id = auth.uid() or public.est_admin());
create policy profils_modification on public.profils for update
  using (id = auth.uid()) with check (id = auth.uid());
-- L'étudiant ne peut modifier QUE ces colonnes (jamais l'accès, le rôle ou l'essai)
revoke update on public.profils from anon, authenticated;
grant update (prenom, telephone, derniere_lecon) on public.profils to authenticated;

-- Paiements : lecture de ses propres paiements ; création et validation
-- uniquement par les fonctions ci-dessous
create policy paiements_lecture on public.paiements for select
  using (user_id = auth.uid() or public.est_admin());
revoke insert, update, delete on public.paiements from anon, authenticated;

-- Progression et activité : chacun gère les siennes
create policy progression_lecture on public.progression for select using (user_id = auth.uid());
create policy progression_ajout on public.progression for insert with check (user_id = auth.uid());
create policy progression_suppression on public.progression for delete using (user_id = auth.uid());
create policy activite_lecture on public.activite for select using (user_id = auth.uid());
create policy activite_ajout on public.activite for insert with check (user_id = auth.uid());

-- Contenu premium : seulement avec un accès complet en cours
create policy contenu_premium_lecture on public.contenu_premium for select
  using (public.a_acces_complet());
revoke insert, update, delete on public.contenu_premium from anon, authenticated;

-- ════════════════════════════════════════════════════════════════════
--  Actions de l'étudiant
-- ════════════════════════════════════════════════════════════════════

-- Code d'essai : une seule fois par compte
create function public.utiliser_code_essai(p_code text) returns json
language plpgsql security definer set search_path = public as $$
declare
  v_profil public.profils;
  v_code   text := (select valeur from public.parametres where cle = 'code_essai');
  v_jours  integer := (select valeur::integer from public.parametres where cle = 'jours_essai');
  v_fin    timestamptz;
begin
  if auth.uid() is null then
    return json_build_object('ok', false, 'message', 'Connecte-toi pour utiliser un code.');
  end if;
  if upper(trim(coalesce(p_code, ''))) <> upper(v_code) then
    return json_build_object('ok', false, 'message', 'Ce code n''est pas valide.');
  end if;
  select * into v_profil from public.profils where id = auth.uid() for update;
  if v_profil.essai_utilise then
    return json_build_object('ok', false, 'message', 'Tu as déjà utilisé ton essai gratuit.');
  end if;
  v_fin := greatest(coalesce(v_profil.acces_jusquau, now()), now()) + make_interval(days => v_jours);
  update public.profils
     set essai_utilise = true,
         acces_jusquau = v_fin,
         type_acces    = coalesce(type_acces, 'essai')
   where id = auth.uid();
  return json_build_object('ok', true, 'message',
    format('Essai activé : tout est ouvert pendant %s jours.', v_jours), 'acces_jusquau', v_fin);
end $$;

-- Déclaration d'un paiement par mobile money (vérifié ensuite par l'admin)
create function public.declarer_paiement(p_formule text, p_moyen text, p_reference text, p_numero text)
returns json
language plpgsql security definer set search_path = public as $$
declare
  v_tarif public.tarifs;
  v_id    uuid;
  v_ref   text := upper(trim(coalesce(p_reference, '')));
begin
  if auth.uid() is null then
    return json_build_object('ok', false, 'message', 'Connecte-toi pour déclarer un paiement.');
  end if;
  select * into v_tarif from public.tarifs where formule = p_formule and actif;
  if not found then
    return json_build_object('ok', false, 'message', 'Formule inconnue.');
  end if;
  if p_moyen not in ('wave', 'orange_money', 'mtn_momo', 'moov_money', 'djamo') then
    return json_build_object('ok', false, 'message', 'Moyen de paiement inconnu.');
  end if;
  if length(v_ref) < 4 or length(v_ref) > 60 then
    return json_build_object('ok', false, 'message', 'Indique la référence de la transaction reçue par SMS.');
  end if;
  if (select count(*) from public.paiements where user_id = auth.uid() and statut = 'en_attente') >= 3 then
    return json_build_object('ok', false, 'message', 'Tu as déjà 3 paiements en attente de vérification.');
  end if;
  begin
    insert into public.paiements (user_id, formule, montant, jours, moyen, reference, numero_payeur)
    values (auth.uid(), v_tarif.formule, v_tarif.prix, v_tarif.jours, p_moyen, v_ref, nullif(trim(p_numero), ''))
    returning id into v_id;
  exception when unique_violation then
    return json_build_object('ok', false, 'message', 'Cette référence de transaction a déjà été déclarée.');
  end;
  return json_build_object('ok', true, 'id', v_id,
    'message', 'Paiement déclaré. Ton accès sera activé dès la vérification (en général en moins de 2 heures).');
end $$;

-- ════════════════════════════════════════════════════════════════════
--  Activation de l'accès (cœur du système)
-- ════════════════════════════════════════════════════════════════════

-- Interne : valide un paiement et prolonge l'accès. Jamais appelable depuis le navigateur.
create function public.appliquer_paiement(p_id uuid, p_par uuid) returns json
language plpgsql security definer set search_path = public as $$
declare
  v_p public.paiements;
  v_fin timestamptz;
begin
  select * into v_p from public.paiements where id = p_id for update;
  if not found then
    return json_build_object('ok', false, 'message', 'Paiement introuvable.');
  end if;
  if v_p.statut = 'valide' then
    return json_build_object('ok', true, 'message', 'Paiement déjà validé.');   -- idempotent (webhook rejoué)
  end if;
  update public.paiements set statut = 'valide', traite_le = now(), traite_par = p_par, motif_refus = null
   where id = p_id;
  update public.profils
     set acces_jusquau = greatest(coalesce(acces_jusquau, now()), now()) + make_interval(days => v_p.jours),
         type_acces    = 'premium'
   where id = v_p.user_id
  returning acces_jusquau into v_fin;
  return json_build_object('ok', true, 'message', 'Paiement validé.', 'acces_jusquau', v_fin);
end $$;

-- Admin : valider un paiement déclaré
create function public.valider_paiement(p_id uuid) returns json
language plpgsql security definer set search_path = public as $$
begin
  if not public.est_admin() then
    return json_build_object('ok', false, 'message', 'Réservé à l''administrateur.');
  end if;
  return public.appliquer_paiement(p_id, auth.uid());
end $$;

-- Admin : refuser un paiement (référence introuvable, mauvais montant…)
create function public.refuser_paiement(p_id uuid, p_motif text) returns json
language plpgsql security definer set search_path = public as $$
begin
  if not public.est_admin() then
    return json_build_object('ok', false, 'message', 'Réservé à l''administrateur.');
  end if;
  update public.paiements
     set statut = 'refuse', motif_refus = nullif(trim(p_motif), ''), traite_le = now(), traite_par = auth.uid()
   where id = p_id and statut = 'en_attente';
  if not found then
    return json_build_object('ok', false, 'message', 'Ce paiement a déjà été traité.');
  end if;
  return json_build_object('ok', true, 'message', 'Paiement refusé.');
end $$;

-- Admin : chiffres du tableau de bord
create function public.statistiques_admin() returns json
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.est_admin() then
    return null;
  end if;
  return json_build_object(
    'inscrits',        (select count(*) from public.profils),
    'abonnes_actifs',  (select count(*) from public.profils where type_acces = 'premium' and acces_jusquau > now()),
    'essais_actifs',   (select count(*) from public.profils where type_acces = 'essai' and acces_jusquau > now()),
    'en_attente',      (select count(*) from public.paiements where statut = 'en_attente'),
    'recette_mois',    (select coalesce(sum(montant), 0) from public.paiements
                         where statut = 'valide' and traite_le >= date_trunc('month', now()))
  );
end $$;

-- ─────────────────────────────────────────────── Droits d'exécution
revoke execute on function public.creer_profil()                         from public, anon, authenticated;
revoke execute on function public.appliquer_paiement(uuid, uuid)          from public, anon, authenticated;
revoke execute on function public.utiliser_code_essai(text)               from public, anon;
revoke execute on function public.declarer_paiement(text, text, text, text) from public, anon;
revoke execute on function public.valider_paiement(uuid)                  from public, anon;
revoke execute on function public.refuser_paiement(uuid, text)            from public, anon;
revoke execute on function public.statistiques_admin()                    from public, anon;
grant execute on function public.utiliser_code_essai(text)                to authenticated;
grant execute on function public.declarer_paiement(text, text, text, text) to authenticated;
grant execute on function public.valider_paiement(uuid)                   to authenticated;
grant execute on function public.refuser_paiement(uuid, text)             to authenticated;
grant execute on function public.statistiques_admin()                     to authenticated;
grant execute on function public.appliquer_paiement(uuid, uuid)           to service_role;
