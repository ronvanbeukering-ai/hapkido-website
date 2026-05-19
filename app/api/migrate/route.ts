import { NextResponse } from "next/server";

const PROJECT_REF = "clvzytfjmoeimalozlck";

const MIGRATION = `
create table if not exists public.profiles (
  id            uuid primary key references auth.users on delete cascade,
  email         text not null,
  rol           text not null default 'geen' check (rol in ('admin','lid','geen')),
  lid_geldig_tot timestamptz,
  aangemaakt_op  timestamptz default now()
);
alter table public.profiles enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='profiles' and policyname='Eigen profiel lezen') then
    create policy "Eigen profiel lezen" on public.profiles for select using (auth.uid() = id);
  end if;
  if not exists (select 1 from pg_policies where tablename='profiles' and policyname='Eigen profiel bijwerken') then
    create policy "Eigen profiel bijwerken" on public.profiles for update using (auth.uid() = id);
  end if;
  if not exists (select 1 from pg_policies where tablename='profiles' and policyname='Admin leest alle profielen') then
    create policy "Admin leest alle profielen" on public.profiles for select
      using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.rol = 'admin'));
  end if;
  if not exists (select 1 from pg_policies where tablename='profiles' and policyname='Admin bewerkt alle profielen') then
    create policy "Admin bewerkt alle profielen" on public.profiles for update
      using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.rol = 'admin'));
  end if;
end $$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, rol)
  values (new.id, new.email, case when new.email = 'ronvanbeukering@gmail.com' then 'admin' else 'geen' end)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

insert into public.profiles (id, email, rol)
select id, email, 'admin' from auth.users where email = 'ronvanbeukering@gmail.com'
on conflict (id) do update set rol = 'admin';

create table if not exists public.hapkido_videos (
  id           text primary key,
  titel        text not null,
  platform     text not null default 'youtube' check (platform in ('youtube','vimeo','local')),
  categorie    text not null default 'kwan-nyom',
  duur         text,
  beschrijving text,
  volgorde     int not null default 0,
  zichtbaar    boolean not null default true,
  aangemaakt_op timestamptz default now()
);
alter table public.hapkido_videos enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='hapkido_videos' and policyname='Videos publiek leesbaar') then
    create policy "Videos publiek leesbaar" on public.hapkido_videos for select using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename='hapkido_videos' and policyname='Admin beheert videos') then
    create policy "Admin beheert videos" on public.hapkido_videos for all
      using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.rol = 'admin'));
  end if;
end $$;

create table if not exists public.hapkido_lessen (
  nr           int primary key,
  titel        text not null,
  duur         text not null,
  categorie    text not null,
  gratis       boolean not null default false,
  video_url    text,
  beschrijving text,
  bijgewerkt_op timestamptz default now()
);
alter table public.hapkido_lessen enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='hapkido_lessen' and policyname='Lessen publiek leesbaar') then
    create policy "Lessen publiek leesbaar" on public.hapkido_lessen for select using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename='hapkido_lessen' and policyname='Admin beheert lessen') then
    create policy "Admin beheert lessen" on public.hapkido_lessen for all
      using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.rol = 'admin'));
  end if;
end $$;

insert into public.hapkido_videos (id, titel, platform, categorie, volgorde) values
  ('V5TonTVzKns','Kwan Nyom Hapkido — Officiële demonstratie','youtube','kwan-nyom',1),
  ('dplYuFpqNdE','Kwan Nyom Hapkido — Technieken & kata','youtube','kwan-nyom',2),
  ('HNlNNbZ8TyM','Kwan Nyom Hapkido — Geavanceerde technieken','youtube','kwan-nyom',3),
  ('WMkEzCGMPAk','Kwan Nyom Hapkido — Wapentechnieken','youtube','kwan-nyom',4),
  ('cDlCbOqNNqo','Kwan Nyom Hapkido — Dan-graad demonstratie','youtube','kwan-nyom',5),
  ('1U4rkN3rKiY','Kwan Nyom Hapkido — Zelfontwikkeling & kata','youtube','kwan-nyom',6),
  ('MhkYCbBF6Ik','Kwan Nyom Hapkido — Combinaties & flows','youtube','kwan-nyom',7),
  ('XEAoOdRR__4','Hapkido Nederland — Technieken demonstratie','youtube','hapkido-nederland',8),
  ('a3yABVSTHyc','Hapkido Nederland — Joint locks & werpingen','youtube','hapkido-nederland',9),
  ('XHrNmb0kp7Y','Hapkido Nederland — Examendemonstratie','youtube','hapkido-nederland',10)
on conflict (id) do nothing;

insert into public.hapkido_lessen (nr, titel, duur, categorie, gratis) values
  (1,'Introductie & basishouding','28','basis',true),
  (2,'Valbreektechnieken (ukemi)','32','basis',true),
  (3,'Eerste grepen & ontsnappingen','35','basis',false),
  (4,'Traptechnieken — mae-geri & yoko-geri','30','basis',false),
  (5,'Pols- en armklemmen (kote-gaeshi)','38','gevorderd',false),
  (6,'Kniebeschermingstechnieken','25','gevorderd',false),
  (7,'Werpingen (nage-waza)','40','gevorderd',false),
  (8,'Mes- en stockverdediging','35','wapens',false),
  (9,'Meervoudige aanvallers','42','wapens',false),
  (10,'Kwan Nyom kata — deel 1','28','kata',false),
  (11,'Kwan Nyom kata — deel 2','33','kata',false),
  (12,'Examensimulatie & herhaling','45','examen',false)
on conflict (nr) do nothing;
`;

export async function GET() {
  const token = process.env.SUPABASE_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json(
      {
        error: "SUPABASE_ACCESS_TOKEN ontbreekt",
        instructie: "Ga naar supabase.com/dashboard/account/tokens, maak een token aan en voeg toe aan .env.local: SUPABASE_ACCESS_TOKEN=sbp_...",
      },
      { status: 500 }
    );
  }

  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: MIGRATION }),
    }
  );

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    return NextResponse.json({ success: false, status: res.status, body }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: "Migratie geslaagd! Alle tabellen aangemaakt.", body });
}
