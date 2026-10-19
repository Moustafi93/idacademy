-- ════════════════════════════════════════════════════════════════════
--  Espace administrateur invisible pour les étudiants
--  La page /diagnostic reste ouverte tant qu'aucun administrateur n'existe
--  (pendant l'installation), puis devient introuvable pour tous sauf l'admin.
--  Cette fonction ne renvoie qu'un oui/non : aucune information sur les comptes.
-- ════════════════════════════════════════════════════════════════════
create function public.admin_existe() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profils where role = 'admin')
$$;
grant execute on function public.admin_existe() to anon, authenticated;

create or replace function public.version_schema() returns integer
language sql immutable as $$ select 5 $$;
