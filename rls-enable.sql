-- ============================================================
-- Hapkido Yong — Row Level Security (volledig, bijgewerkt)
-- Draai dit in de Supabase SQL Editor:
-- https://supabase.com/dashboard/project/clvzytfjmoeimalozlck/sql
--
-- Veilig om meerdere keren te draaien (idempotent).
-- ============================================================

-- ─── 1. profiles (RLS al aan, policies versterken) ───────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Zwarte band bibliotheek: aparte, additieve toegang los van rol/lid_geldig_tot
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS zwarte_band_geldig_tot timestamptz;

DROP POLICY IF EXISTS "Eigen profiel lezen"                 ON public.profiles;
DROP POLICY IF EXISTS "Eigen profiel bijwerken"             ON public.profiles;
DROP POLICY IF EXISTS "Admin kan alle profielen lezen"      ON public.profiles;
DROP POLICY IF EXISTS "Admin kan alle profielen bijwerken"  ON public.profiles;
DROP POLICY IF EXISTS "Geen directe insert door gebruikers" ON public.profiles;

CREATE POLICY "Eigen profiel lezen"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admin kan alle profielen lezen"
  ON public.profiles FOR SELECT
  USING (
    auth.email() = 'ronvanbeukering@gmail.com'
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.rol = 'admin')
  );

CREATE POLICY "Eigen profiel bijwerken"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND rol = (SELECT rol FROM public.profiles WHERE id = auth.uid())
  );

CREATE POLICY "Admin kan alle profielen bijwerken"
  ON public.profiles FOR UPDATE
  USING (
    auth.email() = 'ronvanbeukering@gmail.com'
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.rol = 'admin')
  )
  WITH CHECK (
    auth.email() = 'ronvanbeukering@gmail.com'
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.rol = 'admin')
  );

-- Trigger handle_new_user() is SECURITY DEFINER en omzeilt deze policy
CREATE POLICY "Geen directe insert door gebruikers"
  ON public.profiles FOR INSERT
  WITH CHECK (false);

-- ─── 2. hapkido_videos (RLS al aan, WITH CHECK toevoegen) ────
ALTER TABLE public.hapkido_videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Videos zijn publiek leesbaar" ON public.hapkido_videos;
DROP POLICY IF EXISTS "Videos publiek leesbaar"      ON public.hapkido_videos;
DROP POLICY IF EXISTS "Admin beheert videos"         ON public.hapkido_videos;

CREATE POLICY "Videos publiek leesbaar"
  ON public.hapkido_videos FOR SELECT
  USING (
    categorie != 'zwarte-band'
    OR auth.email() = 'ronvanbeukering@gmail.com'
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.rol = 'admin')
    OR EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.zwarte_band_geldig_tot IS NOT NULL
        AND p.zwarte_band_geldig_tot > now()
    )
  );

CREATE POLICY "Admin beheert videos"
  ON public.hapkido_videos FOR ALL
  USING (
    auth.email() = 'ronvanbeukering@gmail.com'
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.rol = 'admin')
  )
  WITH CHECK (
    auth.email() = 'ronvanbeukering@gmail.com'
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.rol = 'admin')
  );

-- ─── 3. hapkido_lessen (RLS al aan, WITH CHECK toevoegen) ────
ALTER TABLE public.hapkido_lessen ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lessen zijn publiek leesbaar" ON public.hapkido_lessen;
DROP POLICY IF EXISTS "Lessen publiek leesbaar"      ON public.hapkido_lessen;
DROP POLICY IF EXISTS "Admin beheert lessen"         ON public.hapkido_lessen;

CREATE POLICY "Lessen publiek leesbaar"
  ON public.hapkido_lessen FOR SELECT USING (true);

CREATE POLICY "Admin beheert lessen"
  ON public.hapkido_lessen FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.rol = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.rol = 'admin')
  );

-- ─── 4. bijdragen — NIEUW: betaalrecords, volledig geblokkeerd ─
ALTER TABLE public.bijdragen ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin leest bijdragen" ON public.bijdragen;

CREATE POLICY "Admin leest bijdragen"
  ON public.bijdragen FOR SELECT
  USING (
    auth.email() = 'ronvanbeukering@gmail.com'
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.rol = 'admin')
  );

-- Geen INSERT/UPDATE/DELETE policy → geblokkeerd voor iedereen via client

-- ─── 5. cursussen — NIEUW: legacy/leeg, publiek leesbaar ────
ALTER TABLE public.cursussen ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Cursussen publiek leesbaar" ON public.cursussen;
DROP POLICY IF EXISTS "Admin beheert cursussen"    ON public.cursussen;

CREATE POLICY "Cursussen publiek leesbaar"
  ON public.cursussen FOR SELECT USING (true);

CREATE POLICY "Admin beheert cursussen"
  ON public.cursussen FOR ALL
  USING (
    auth.email() = 'ronvanbeukering@gmail.com'
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.rol = 'admin')
  )
  WITH CHECK (
    auth.email() = 'ronvanbeukering@gmail.com'
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.rol = 'admin')
  );

-- ─── 6. profielen — NIEUW: legacy, volledig geblokkeerd ──────
ALTER TABLE public.profielen ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin leest profielen legacy" ON public.profielen;

CREATE POLICY "Admin leest profielen legacy"
  ON public.profielen FOR SELECT
  USING (
    auth.email() = 'ronvanbeukering@gmail.com'
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.rol = 'admin')
  );

-- ─── 7. proefles_aanvragen (aanmaken indien nog niet bestaat) ─
CREATE TABLE IF NOT EXISTS public.proefles_aanvragen (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  naam          text NOT NULL,
  email         text NOT NULL,
  telefoon      text NOT NULL,
  locatie       text NOT NULL,
  voor          text,
  dag           text,
  leeftijd      int,
  opmerking     text,
  aangemaakt_op timestamptz DEFAULT now()
);

ALTER TABLE public.proefles_aanvragen ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin leest aanvragen" ON public.proefles_aanvragen;
DROP POLICY IF EXISTS "Geen publieke insert"  ON public.proefles_aanvragen;

CREATE POLICY "Admin leest aanvragen"
  ON public.proefles_aanvragen FOR SELECT
  USING (
    auth.email() = 'ronvanbeukering@gmail.com'
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.rol = 'admin')
  );

CREATE POLICY "Geen publieke insert"
  ON public.proefles_aanvragen FOR INSERT
  WITH CHECK (false);

-- ─── 8. Verificatie ─────────────────────────────────────────
SELECT
  tablename,
  rowsecurity AS rls_aan
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
