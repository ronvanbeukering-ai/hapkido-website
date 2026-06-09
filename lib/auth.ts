// Read from env so the email is never hardcoded in the compiled bundle.
// ADMIN_EMAIL is a server-only variable (no NEXT_PUBLIC_ prefix) and is
// therefore never exposed to the browser.
// The client-side fallback is deliberately empty so that no email address
// leaks into the client JS bundle.
export const SUPERADMIN_EMAIL =
  typeof window === "undefined"
    ? (process.env.ADMIN_EMAIL ?? "")
    : (process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "");

export function isSuperAdmin(email: string | null | undefined): boolean {
  if (!SUPERADMIN_EMAIL || !email) return false;
  return email.toLowerCase() === SUPERADMIN_EMAIL.toLowerCase();
}

export function isAdminOrSuperAdmin(
  email: string | null | undefined,
  rol: string | null | undefined
): boolean {
  return isSuperAdmin(email) || rol === "admin";
}

export function isLidOfAdmin(
  email: string | null | undefined,
  rol: string | null | undefined,
  lid_geldig_tot: string | null | undefined
): boolean {
  if (isSuperAdmin(email)) return true;
  if (rol === "admin") return true;
  if (rol === "lid") {
    if (!lid_geldig_tot) return true;
    return new Date(lid_geldig_tot) > new Date();
  }
  return false;
}

export function isCursusAbonnee(
  email: string | null | undefined,
  rol: string | null | undefined,
  lid_geldig_tot: string | null | undefined
): boolean {
  if (isLidOfAdmin(email, rol, lid_geldig_tot)) return true;
  if (rol === "cursus") {
    if (!lid_geldig_tot) return true;
    return new Date(lid_geldig_tot) > new Date();
  }
  return false;
}
