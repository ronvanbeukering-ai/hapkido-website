-- ============================================================
-- Eenmalige toewijzing techniekgroep (subcategorie) voor de
-- zwarte-band-video's die tot nu toe in dit gesprek zijn toegevoegd.
-- Draai dit in de Supabase SQL Editor, ná rls-enable.sql (die voegt
-- de kolom "subcategorie" toe).
--
-- Werkt op basis van het Vimeo-ID in de kolom "id" (LIKE-match),
-- ongeacht eventuele afwijkingen in titel-hoofdletters/spelling.
-- Veilig om opnieuw te draaien.
-- ============================================================

-- ─── Worpen ───────────────────────────────────────────────
UPDATE public.hapkido_videos SET subcategorie = 'Worpen' WHERE id LIKE 'vimeo-400574729%';   -- Worpen
UPDATE public.hapkido_videos SET subcategorie = 'Worpen' WHERE id LIKE 'vimeo-762278422%';   -- Whip throw
UPDATE public.hapkido_videos SET subcategorie = 'Worpen' WHERE id LIKE 'vimeo-762278304%';   -- Two wrist throw

-- ─── Stoten ───────────────────────────────────────────────
UPDATE public.hapkido_videos SET subcategorie = 'Stoten' WHERE id LIKE 'vimeo-755514727%';   -- Twin strike

-- ─── Trapaanvallen staand ─────────────────────────────────
UPDATE public.hapkido_videos SET subcategorie = 'Trapaanvallen staand' WHERE id LIKE 'vimeo-755613076%';   -- Trap knie
UPDATE public.hapkido_videos SET subcategorie = 'Trapaanvallen staand' WHERE id LIKE 'vimeo-748747471%';   -- Trap met stoot schijnbeweging
UPDATE public.hapkido_videos SET subcategorie = 'Trapaanvallen staand' WHERE id LIKE 'vimeo-755664796%';   -- Trap met hiel bovenbeen/lies

-- ─── Faking style ─────────────────────────────────────────
UPDATE public.hapkido_videos SET subcategorie = 'Faking style' WHERE id LIKE 'vimeo-109985508%';   -- Limping style
UPDATE public.hapkido_videos SET subcategorie = 'Faking style' WHERE id LIKE 'vimeo-755664386%';   -- Faking style turning back kick
UPDATE public.hapkido_videos SET subcategorie = 'Faking style' WHERE id LIKE 'vimeo-755664559%';   -- Faking style turning cresent
UPDATE public.hapkido_videos SET subcategorie = 'Faking style' WHERE id LIKE 'vimeo-755612906%';   -- Faking style turning back
UPDATE public.hapkido_videos SET subcategorie = 'Faking style' WHERE id LIKE 'vimeo-755664251%';   -- Faking style. Trap bovenbeen

-- ─── Vanuit zit/stoel ─────────────────────────────────────
UPDATE public.hapkido_videos SET subcategorie = 'Vanuit zit/stoel' WHERE id LIKE 'vimeo-757089658%';   -- Heel kick vanuit zit
UPDATE public.hapkido_videos SET subcategorie = 'Vanuit zit/stoel' WHERE id LIKE 'vimeo-755612344%';   -- Jump side vanuit stoel
UPDATE public.hapkido_videos SET subcategorie = 'Vanuit zit/stoel' WHERE id LIKE 'vimeo-755613677%';   -- Aanval knie vanuit stoel
UPDATE public.hapkido_videos SET subcategorie = 'Vanuit zit/stoel' WHERE id LIKE 'vimeo-757089235%';   -- Jumpturning vanuit zit
UPDATE public.hapkido_videos SET subcategorie = 'Vanuit zit/stoel' WHERE id LIKE 'vimeo-755611733%';   -- Slowmotion frontkick vanuit zit
UPDATE public.hapkido_videos SET subcategorie = 'Vanuit zit/stoel' WHERE id LIKE 'vimeo-755611503%';   -- Stoptrap op knie vanuit zit

-- ─── Wapens ───────────────────────────────────────────────
UPDATE public.hapkido_videos SET subcategorie = 'Wapens' WHERE id LIKE 'vimeo-804913756%';   -- Bo met bezem

-- ─── Verificatie: welke zwarte-band/academie-video's hebben nog
-- geen techniekgroep? (handig om handmatig aan te vullen) ────
SELECT id, titel, categorie, subcategorie
FROM public.hapkido_videos
WHERE categorie IN ('zwarte-band', 'academie') AND subcategorie IS NULL
ORDER BY titel;
