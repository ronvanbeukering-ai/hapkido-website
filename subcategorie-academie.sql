-- ============================================================
-- Eenmalige toewijzing techniekgroep (subcategorie) voor de
-- Academie-video's. Draai dit NA rls-enable.sql (die voegt de
-- kolom "subcategorie" toe als hij nog niet bestaat).
--
-- Werkt op het exacte Vimeo-ID in de kolom "id". Veilig om
-- opnieuw te draaien.
-- ============================================================

-- ─── Kapotte duplicaat opruimen (bekende id-als-PK-kwestie) ──
DELETE FROM public.hapkido_videos
WHERE id = 'https://vimeo.com/manage/videos/1205083393/2e84667395';

-- ─── NBJJV en Seminar ─────────────────────────────────────
UPDATE public.hapkido_videos SET subcategorie = 'NBJJV en Seminar' WHERE id = 'vimeo-1205125402/1d318a9bbb';   -- gezamenlijke training NBJJV
UPDATE public.hapkido_videos SET subcategorie = 'NBJJV en Seminar' WHERE id = 'vimeo-1205124305/33be907308';   -- Training bij de NBJJV
UPDATE public.hapkido_videos SET subcategorie = 'NBJJV en Seminar' WHERE id = 'vimeo-1205224539/efd1f3a9cb';   -- Kick defence. Front kick Seminar Oirschot.
UPDATE public.hapkido_videos SET subcategorie = 'NBJJV en Seminar' WHERE id = 'vimeo-1205435573/fa406df7af';   -- Master Jos. Seminar Oirscho 2
UPDATE public.hapkido_videos SET subcategorie = 'NBJJV en Seminar' WHERE id = 'vimeo-1205435125/b567ababca';   -- Master Jos. Seminar Oirtschot
UPDATE public.hapkido_videos SET subcategorie = 'NBJJV en Seminar' WHERE id = 'vimeo-497724775/62eca4113b';    -- Mini Seminar 2006
UPDATE public.hapkido_videos SET subcategorie = 'NBJJV en Seminar' WHERE id = 'vimeo-1205224907/1c6d06d83c';   -- Seminar Oirschot part Master Ron

-- ─── Traptechnieken ───────────────────────────────────────
UPDATE public.hapkido_videos SET subcategorie = 'Traptechnieken' WHERE id = 'vimeo-419875140/000d9424d6';   -- kick defence variatie

-- ─── Shiatsu ──────────────────────────────────────────────
UPDATE public.hapkido_videos SET subcategorie = 'Shiatsu' WHERE id = 'vimeo-509801610/361a4a7e2f';   -- Shiatsu Japanse drukpuntmassage. Nek-schouders.

-- ─── Wapens ───────────────────────────────────────────────
UPDATE public.hapkido_videos SET subcategorie = 'Wapens' WHERE id = 'vimeo-416850524/6688ae46e5';   -- Bo met de bezem
UPDATE public.hapkido_videos SET subcategorie = 'Wapens' WHERE id = 'vimeo-502224429/382302ee49';   -- Verdediging met sjaal of plastic tas

-- ─── Grondwerk ────────────────────────────────────────────
UPDATE public.hapkido_videos SET subcategorie = 'Grondwerk' WHERE id = 'vimeo-1205102763/e54292c4d7';   -- Training verdedigen op de grond
UPDATE public.hapkido_videos SET subcategorie = 'Grondwerk' WHERE id = 'vimeo-1205077841/787c0bc9e5';   -- Verdediging op de grond na val/worp. Meerdere tegenstanders.

-- ─── Klemmen ──────────────────────────────────────────────
UPDATE public.hapkido_videos SET subcategorie = 'Klemmen' WHERE id = 'vimeo-756341811/cb9ba59ed5';   -- Sir Marco. Diverse S-locks

-- ─── Zelfverdediging geblinddoekt ─────────────────────────
UPDATE public.hapkido_videos SET subcategorie = 'Zelfverdediging geblinddoekt' WHERE id = 'vimeo-1205081354/168365f145';   -- Zelfverdediging ogen gesloten 3
UPDATE public.hapkido_videos SET subcategorie = 'Zelfverdediging geblinddoekt' WHERE id = 'vimeo-1205083393/2e84667395';   -- Zelfverdediging ogen gesloten 4.
UPDATE public.hapkido_videos SET subcategorie = 'Zelfverdediging geblinddoekt' WHERE id = 'vimeo-1205081892/28474fbeaf';   -- Zelfverdediging ogen gesloten1
UPDATE public.hapkido_videos SET subcategorie = 'Zelfverdediging geblinddoekt' WHERE id = 'vimeo-1205081665/6cdc4351e7';   -- Zelfverdediging ogen gesloten2

-- ─── Meerdere tegenstanders ───────────────────────────────
UPDATE public.hapkido_videos SET subcategorie = 'Meerdere tegenstanders' WHERE id = 'vimeo-1205077455/b943d16a9c';   -- Meerdere tegenstanders

-- ─── Diversen ─────────────────────────────────────────────
UPDATE public.hapkido_videos SET subcategorie = 'Diversen' WHERE id = 'vimeo-1205198318/6d73fe85dd';   -- Fun.Museum bezoek
UPDATE public.hapkido_videos SET subcategorie = 'Diversen' WHERE id = 'vimeo-804913756/51ef0811d3';    -- Hapkido Academie. Video met Master John
UPDATE public.hapkido_videos SET subcategorie = 'Diversen' WHERE id = 'vimeo-1205223269/1da32092ab';   -- Master John in Thailand
UPDATE public.hapkido_videos SET subcategorie = 'Diversen' WHERE id = 'vimeo-1205225290/13d148970e';   -- Master Jos, demo kinderen
UPDATE public.hapkido_videos SET subcategorie = 'Diversen' WHERE id = 'vimeo-1205199203/480e662d06';   -- Promo video hapkido Combinatie

-- ─── Verificatie: welke academie-video's hebben nog geen
-- techniekgroep? ───────────────────────────────────────────
SELECT id, titel, subcategorie
FROM public.hapkido_videos
WHERE categorie = 'academie' AND subcategorie IS NULL
ORDER BY titel;
