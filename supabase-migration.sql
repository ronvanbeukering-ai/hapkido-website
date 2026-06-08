-- ============================================================
-- Hapkido Yong — Supabase migratie
-- Voer dit uit in de Supabase SQL Editor:
-- https://supabase.com/dashboard/project/clvzytfjmoeimalozlck/sql
-- ============================================================

-- ─── 1. Profiles tabel ────────────────────────────────────────
create table if not exists public.profiles (
  id            uuid primary key references auth.users on delete cascade,
  email         text not null,
  rol           text not null default 'geen' check (rol in ('admin', 'lid', 'geen')),
  lid_geldig_tot timestamptz,
  aangemaakt_op  timestamptz default now()
);

-- RLS inschakelen
alter table public.profiles enable row level security;

-- Eigen profiel lezen
create policy "Eigen profiel lezen"
  on public.profiles for select
  using (auth.uid() = id);

-- Eigen profiel bijwerken — WITH CHECK prevents users from escalating their own role
create policy "Eigen profiel bijwerken"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    -- Users may NOT change their own 'rol' column
    -- (the old rol value must equal the new one, enforced by checking profiles)
    and rol = (select rol from public.profiles where id = auth.uid())
  );

-- Admin kan alles lezen
create policy "Admin kan alle profielen lezen"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.rol = 'admin'
    )
  );

-- Admin kan alle profielen bijwerken — WITH CHECK prevents accidental role removal
create policy "Admin kan alle profielen bijwerken"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.rol = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.rol = 'admin'
    )
  );

-- Trigger function inserts profiles; allow service_role / trigger to insert
-- (no explicit INSERT policy needed – the trigger runs as security definer)
-- Prevent direct INSERT by anyone other than the trigger (defence-in-depth)
create policy "Geen directe insert door gebruikers"
  on public.profiles for insert
  with check (false);
-- Note: the handle_new_user() trigger runs as SECURITY DEFINER and bypasses RLS,
-- so new users are still inserted correctly on sign-up.

-- ─── 2. Trigger: automatisch profiel aanmaken bij registratie ──
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
as $$
begin
  insert into public.profiles (id, email, rol)
  values (
    new.id,
    new.email,
    -- Admin email wordt ingesteld via current_setting (zie stap 8 onderaan)
    case when new.email = current_setting('app.admin_email', true) then 'admin' else 'geen' end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── 3. Hapkido videos tabel (voor dashboard beheer) ──────────
create table if not exists public.hapkido_videos (
  id          text primary key,          -- YouTube video ID of unieke slug
  titel       text not null,
  platform    text not null default 'youtube' check (platform in ('youtube', 'vimeo', 'local')),
  categorie   text not null default 'kwan-nyom',
  duur        text,
  beschrijving text,
  volgorde    int not null default 0,
  zichtbaar   boolean not null default true,
  aangemaakt_op timestamptz default now()
);

alter table public.hapkido_videos enable row level security;

-- Iedereen mag video's lezen (ook niet-ingelogd, voor preview)
create policy "Videos zijn publiek leesbaar"
  on public.hapkido_videos for select
  using (true);

-- Alleen admin mag beheren
create policy "Admin beheert videos"
  on public.hapkido_videos for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.rol = 'admin'
    )
  );

-- ─── 4. Hapkido lessen tabel ──────────────────────────────────
create table if not exists public.hapkido_lessen (
  nr          int primary key,
  titel       text not null,
  duur        text not null,
  categorie   text not null,
  gratis      boolean not null default false,
  belt        text check (belt in ('white-green', 'green-red')),
  video_url   text,
  beschrijving text,
  bijgewerkt_op timestamptz default now()
);

alter table public.hapkido_lessen enable row level security;

-- Iedereen mag lessen zien (de metadata, niet de video URL voor niet-leden)
create policy "Lessen zijn publiek leesbaar"
  on public.hapkido_lessen for select
  using (true);

-- Alleen admin mag lessen beheren
create policy "Admin beheert lessen"
  on public.hapkido_lessen for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.rol = 'admin'
    )
  );

-- ─── 5. Startdata: initiële video's invoegen ──────────────────
insert into public.hapkido_videos (id, titel, platform, categorie, volgorde) values
  ('ePo6WJGbj4c', 'Kwan Nyom Hapkido — Throws',                      'youtube', 'kwan-nyom',        1),
  ('J5zWJpCnvBM', 'Kwan Nyom Hapkido — Juniors 2015',                'youtube', 'kwan-nyom',        2),
  ('cvnfTxpKU3E', 'Kwan Nyom Hapkido — Junnukisat 2015',             'youtube', 'kwan-nyom',        3),
  ('KfCGh_WaMtI', 'Kwan Nyom Hapkido — Espoo Promo',                 'youtube', 'kwan-nyom',        4),
  ('L10o2oNsTxE', 'Kwan Nyom Hapkido — Locking 2017 Helsinki',       'youtube', 'kwan-nyom',        5),
  ('xwj4YJd2Jlg', 'Helsingin Hapkido — Treenivideo',                 'youtube', 'kwan-nyom',        6),
  ('XDf-y_Eg6U4', 'Kwan Nyom Hapkido — HKD Juniorit 2019',          'youtube', 'kwan-nyom',        7),
  ('Cb2zacEqPPE', 'Hapkido NHA — Paul de Graaf & Charlie van Ton',   'youtube', 'hapkido-nederland', 8),
  ('GlVG0PeeEMM', 'Sportcentrum De Bever — Hapkido & Taekwon-do',    'youtube', 'hapkido-nederland', 9),
  ('Sr4L8we9OAk', 'Hapkido — Sportcentrum De Bever Dronten',         'youtube', 'hapkido-nederland', 10),
  ('vimeo-400308195', 'Hapkido Yong — Training (Vimeo)',              'vimeo',   'eigen',            11),
  ('local-4382', 'Hapkido Yong — Trainingsopname 1',                 'local',   'eigen',            12),
  ('local-4384', 'Hapkido Yong — Trainingsopname 2',                 'local',   'eigen',            13),
  ('local-4385', 'Hapkido Yong — Trainingsopname 3',                 'local',   'eigen',            14)
on conflict (id) do nothing;

-- ─── 6. Startdata: initiële lessen invoegen ───────────────────
insert into public.hapkido_lessen (nr, titel, duur, categorie, gratis, belt) values
  (1,  'Introductie & basishouding',           '28', 'basis', true, 'white-green'),
  (2,  'Valbreektechnieken (ukemi)',             '32', 'basis', true, 'white-green'),
  (3,  'Eerste grepen & ontsnappingen',          '35', 'basis', false, 'white-green'),
  (4,  'Traptechnieken — mae-geri & yoko-geri',  '30', 'basis', false, 'white-green'),
  (5,  'Pols- en armklemmen (kote-gaeshi)',       '38', 'gevorderd', false, 'green-red'),
  (6,  'Kniebeschermingstechnieken',             '25', 'gevorderd', false, 'green-red'),
  (7,  'Werpingen (nage-waza)',                  '40', 'gevorderd', false, 'green-red'),
  (8,  'Mes- en stockverdediging',               '35', 'wapens', false, 'green-red'),
  (9,  'Meervoudige aanvallers',                 '42', 'wapens', false, 'green-red'),
  (10, 'Kwan Nyom kata — deel 1',               '28', 'kata', false, 'green-red'),
  (11, 'Kwan Nyom kata — deel 2',               '33', 'kata', false, 'green-red'),
  (12, 'Examensimulatie & herhaling',            '45', 'examen', false, 'green-red')
on conflict (nr) do nothing;

-- ─── 7. Storage buckets aanmaken ─────────────────────────────
-- Publieke bucket voor afbeeldingen (al bestaand)
insert into storage.buckets (id, name, public)
  values ('hapkido-videos', 'hapkido-videos', false)
  on conflict (id) do nothing;

-- PRIVATE bucket voor beveiligde cursusvideo's
-- Toegang via signed URLs gegenereerd door /api/video-url (server-side auth check)
insert into storage.buckets (id, name, public)
  values ('hapkido-cursus-videos', 'hapkido-cursus-videos', false)
  on conflict (id) do nothing;

-- RLS: niemand mag rechtstreeks uit de private bucket lezen
-- Alle toegang loopt via de service_role in de API route
create policy "Geen publieke leestoegang cursusvideo bucket"
  on storage.objects for select
  using (
    bucket_id = 'hapkido-cursus-videos'
    and false
  );

-- Admins mogen uploaden via service_role (wordt niet via client gedaan)

-- ─── 8. Admin instellen (als account al bestaat) ─────────────
-- Vervang 'jouwemail@voorbeeld.nl' door het admin e-mailadres en voer dit uit
-- NA registratie als het account al bestaat:
-- update public.profiles set rol = 'admin' where email = 'jouwemail@voorbeeld.nl';

-- ─── 9. Hapkido lessen: beperk video_url tot alleen leden ─────
-- Verwijder de bestaande brede select policy en vervang door twee policies:
-- één voor publiek (zonder video_url) en één voor leden/admins (alles).
drop policy if exists "Lessen zijn publiek leesbaar" on public.hapkido_lessen;

-- Publiek: mag metadata lezen maar NIET de video_url
-- (Supabase RLS kan geen kolom-niveau beveiliging, dus dit doet de
--  filtering op applicatieniveau in CursusContent.tsx. De lijn hieronder
--  documenterert het intentie; echte kolom-isolatie vereist een view.)
-- Voor nu: iedereen mag de lessen-tabel lezen; video_url filtering
-- vindt plaats in de applicatielaag (CursusContent.tsx selecteert
-- alleen nr/titel/duur/categorie/gratis voor niet-leden).
create policy "Lessen zijn publiek leesbaar"
  on public.hapkido_lessen for select
  using (true);

-- ─── 10. Proefles aanvragen tabel ─────────────────────────────
-- Slaat aanvragen op voor e-mailverwerking; RLS zorgt dat
-- alleen admins aanvragen kunnen inzien.
create table if not exists public.proefles_aanvragen (
  id           uuid primary key default gen_random_uuid(),
  naam         text not null,
  email        text not null,
  telefoon     text not null,
  locatie      text not null,
  voor         text,
  dag          text,
  leeftijd     int,
  opmerking    text,
  aangemaakt_op timestamptz default now()
);

alter table public.proefles_aanvragen enable row level security;

-- Niemand mag rechtstreeks lezen (alleen admin)
create policy "Admin leest aanvragen"
  on public.proefles_aanvragen for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.rol = 'admin'
    )
  );

-- Aanvragen worden server-side ingevoegd via service_role / API route
-- Geen directe client-insert toegestaan
create policy "Geen publieke insert"
  on public.proefles_aanvragen for insert
  with check (false);

-- ─── 11. Hapkido videos: WITH CHECK op admin policy ──────────
-- Vervang de brede "Admin beheert videos" policy met een versie die
-- ook WITH CHECK heeft zodat admins niet buiten hun domein kunnen schrijven.
drop policy if exists "Admin beheert videos" on public.hapkido_videos;

create policy "Admin beheert videos"
  on public.hapkido_videos for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.rol = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.rol = 'admin'
    )
  );

-- ─── 12. Hapkido lessen: WITH CHECK op admin policy ──────────
drop policy if exists "Admin beheert lessen" on public.hapkido_lessen;

create policy "Admin beheert lessen"
  on public.hapkido_lessen for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.rol = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.rol = 'admin'
    )
  );
