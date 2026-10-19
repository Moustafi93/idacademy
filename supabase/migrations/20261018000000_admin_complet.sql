-- ════════════════════════════════════════════════════════════════════
--  Espace administrateur complet
--   1. L'administrateur a accès à TOUT le contenu (premium compris), sans abonnement
--   2. Il modifie les tarifs, le code d'essai et les réglages de paiement depuis le site
--   3. Il modifie les comptes des étudiants (nom, accès, rôle)
-- ════════════════════════════════════════════════════════════════════

-- 1. Accès complet : abonnement/essai en cours OU administrateur
create or replace function public.a_acces_complet() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select acces_jusquau > now() or role = 'admin' from public.profils where id = auth.uid()), false)
$$;

-- 2a. Tarifs : modifiables par l'administrateur (jamais créés ni supprimés depuis le site)
create policy tarifs_modification_admin on public.tarifs for update
  using (public.est_admin()) with check (public.est_admin());
revoke insert, delete, update on public.tarifs from anon, authenticated;
grant update (nom, prix, jours, actif) on public.tarifs to authenticated;
alter table public.tarifs add constraint tarifs_jours_raisonnables check (jours between 1 and 400);

-- 2b. Réglages publics (affichés sur le site : numéros de paiement, WhatsApp…)
create table public.reglages_publics (
  cle    text primary key check (cle in (
           'numero_wave', 'numero_orange', 'numero_mtn', 'numero_moov', 'numero_djamo',
           'nom_beneficiaire', 'whatsapp', 'lien_wave')),
  valeur text not null default '' check (length(valeur) <= 200)
);
insert into public.reglages_publics (cle) values
  ('numero_wave'), ('numero_orange'), ('numero_mtn'), ('numero_moov'), ('numero_djamo'),
  ('nom_beneficiaire'), ('whatsapp'), ('lien_wave');

alter table public.reglages_publics enable row level security;
create policy reglages_lecture on public.reglages_publics for select using (true);
create policy reglages_modification_admin on public.reglages_publics for update
  using (public.est_admin()) with check (public.est_admin());
revoke insert, delete, update on public.reglages_publics from anon, authenticated;
grant update (valeur) on public.reglages_publics to authenticated;

-- 2c. Paramètres privés (code d'essai) : lus et modifiés par l'admin via des fonctions
create function public.lire_parametres_admin() returns json
language sql stable security definer set search_path = public as $$
  select case when public.est_admin()
    then (select json_object_agg(cle, valeur) from public.parametres)
    else null end
$$;

create function public.modifier_parametre(p_cle text, p_valeur text) returns json
language plpgsql security definer set search_path = public as $$
declare
  v text := upper(trim(coalesce(p_valeur, '')));
begin
  if not public.est_admin() then
    return json_build_object('ok', false, 'message', 'Réservé à l''administrateur.');
  end if;
  if p_cle = 'code_essai' then
    if v !~ '^[A-Z0-9_-]{3,20}$' then
      return json_build_object('ok', false, 'message', 'Le code doit faire 3 à 20 caractères (lettres, chiffres, - ou _).');
    end if;
  elsif p_cle = 'jours_essai' then
    if v !~ '^[0-9]{1,2}$' or v::integer > 30 then
      return json_build_object('ok', false, 'message', 'La durée de l''essai doit être comprise entre 0 et 30 jours.');
    end if;
  else
    return json_build_object('ok', false, 'message', 'Paramètre inconnu.');
  end if;
  update public.parametres set valeur = v where cle = p_cle;
  return json_build_object('ok', true, 'message', 'Enregistré.');
end $$;

-- 3. Modifier le compte d'un étudiant
create function public.admin_modifier_etudiant(
  p_user uuid, p_prenom text, p_nom text, p_telephone text,
  p_acces_jusquau timestamptz, p_type_acces text, p_role text
) returns json
language plpgsql security definer set search_path = public as $$
begin
  if not public.est_admin() then
    return json_build_object('ok', false, 'message', 'Réservé à l''administrateur.');
  end if;
  if p_role not in ('etudiant', 'admin') then
    return json_build_object('ok', false, 'message', 'Rôle inconnu.');
  end if;
  if p_user = auth.uid() and p_role <> 'admin' then
    return json_build_object('ok', false, 'message', 'Tu ne peux pas retirer ton propre rôle d''administrateur.');
  end if;
  if p_acces_jusquau is not null and coalesce(p_type_acces, '') not in ('essai', 'premium') then
    return json_build_object('ok', false, 'message', 'Type d''accès inconnu.');
  end if;
  update public.profils
     set prenom        = trim(coalesce(p_prenom, '')),
         nom           = trim(coalesce(p_nom, '')),
         telephone     = nullif(trim(coalesce(p_telephone, '')), ''),
         acces_jusquau = p_acces_jusquau,
         type_acces    = case when p_acces_jusquau is null then null else p_type_acces end,
         role          = p_role
   where id = p_user;
  if not found then
    return json_build_object('ok', false, 'message', 'Étudiant introuvable.');
  end if;
  return json_build_object('ok', true, 'message', 'Compte modifié.');
end $$;

revoke execute on function public.lire_parametres_admin() from public, anon;
revoke execute on function public.modifier_parametre(text, text) from public, anon;
revoke execute on function public.admin_modifier_etudiant(uuid, text, text, text, timestamptz, text, text) from public, anon;
grant execute on function public.lire_parametres_admin() to authenticated;
grant execute on function public.modifier_parametre(text, text) to authenticated;
grant execute on function public.admin_modifier_etudiant(uuid, text, text, text, timestamptz, text, text) to authenticated;

create or replace function public.version_schema() returns integer
language sql immutable as $$ select 4 $$;
