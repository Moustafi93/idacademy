-- ════════════════════════════════════════════════════════════════════
--  1. Le NOM de l'étudiant (en plus du prénom) à l'inscription
--  2. Une fonction publique « version_schema » utilisée par la page /diagnostic
--     pour vérifier que toutes les migrations ont été exécutées
-- ════════════════════════════════════════════════════════════════════

alter table public.profils add column if not exists nom text not null default '';

-- Le profil créé à l'inscription reçoit le prénom ET le nom
create or replace function public.creer_profil() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profils (id, email, prenom, nom)
  values (
    new.id,
    new.email,
    coalesce(trim(new.raw_user_meta_data ->> 'prenom'), ''),
    coalesce(trim(new.raw_user_meta_data ->> 'nom'), '')
  );
  return new;
end $$;
revoke execute on function public.creer_profil() from public, anon, authenticated;

-- L'étudiant peut corriger son nom (mais toujours pas son accès ni son rôle)
grant update (prenom, nom, telephone, derniere_lecon) on public.profils to authenticated;

-- Numéro de la dernière migration installée (lisible par tous, ne révèle rien)
create or replace function public.version_schema() returns integer
language sql immutable as $$ select 3 $$;
grant execute on function public.version_schema() to anon, authenticated;
