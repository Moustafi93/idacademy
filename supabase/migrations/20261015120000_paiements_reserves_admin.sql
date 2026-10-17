-- ════════════════════════════════════════════════════════════════════
--  Les paiements sont visibles UNIQUEMENT par l'administrateur.
--  L'étudiant effectue et déclare son paiement, mais ne voit aucune liste :
--  il sait seulement s'il a un paiement en cours de vérification.
-- ════════════════════════════════════════════════════════════════════

-- 1. Lecture des paiements : administrateur seulement
drop policy if exists paiements_lecture on public.paiements;
create policy paiements_lecture_admin on public.paiements for select
  using (public.est_admin());

-- 2. Ce que l'étudiant peut savoir (sans aucun détail : ni montant, ni référence)
create function public.statut_mes_paiements() returns json
language sql stable security definer set search_path = public as $$
  select json_build_object(
    'en_attente', exists (
      select 1 from public.paiements
       where user_id = auth.uid() and statut = 'en_attente' and reference is not null),
    'refuse', exists (
      select 1 from public.paiements p
       where p.user_id = auth.uid() and p.statut = 'refuse' and p.reference is not null
         and p.traite_le > now() - interval '7 days'
         and not exists (select 1 from public.paiements q
                          where q.user_id = p.user_id and q.cree_le > p.cree_le))
  )
$$;

-- 3. Paiements enregistrés par l'admin : espèces (payé en main propre) ou accès offert
alter table public.paiements add column if not exists note_admin text;
alter table public.paiements drop constraint if exists paiements_moyen_check;
alter table public.paiements add constraint paiements_moyen_check
  check (moyen in ('djamo', 'wave', 'orange_money', 'mtn_momo', 'moov_money', 'especes', 'offert'));

create function public.enregistrer_paiement_admin(p_user uuid, p_formule text, p_moyen text, p_note text)
returns json
language plpgsql security definer set search_path = public as $$
declare
  v_tarif public.tarifs;
  v_id    uuid;
begin
  if not public.est_admin() then
    return json_build_object('ok', false, 'message', 'Réservé à l''administrateur.');
  end if;
  if p_moyen not in ('especes', 'offert') then
    return json_build_object('ok', false, 'message', 'Moyen inconnu.');
  end if;
  select * into v_tarif from public.tarifs where formule = p_formule;
  if not found then
    return json_build_object('ok', false, 'message', 'Formule inconnue.');
  end if;
  if not exists (select 1 from public.profils where id = p_user) then
    return json_build_object('ok', false, 'message', 'Étudiant introuvable.');
  end if;
  insert into public.paiements (user_id, formule, montant, jours, moyen, reference, note_admin)
  values (p_user, v_tarif.formule, case when p_moyen = 'offert' then 0 else v_tarif.prix end, v_tarif.jours,
          p_moyen, null, nullif(trim(p_note), ''))
  returning id into v_id;
  return public.appliquer_paiement(v_id, auth.uid());
end $$;

revoke execute on function public.statut_mes_paiements() from public, anon;
revoke execute on function public.enregistrer_paiement_admin(uuid, text, text, text) from public, anon;
grant execute on function public.statut_mes_paiements() to authenticated;
grant execute on function public.enregistrer_paiement_admin(uuid, text, text, text) to authenticated;
