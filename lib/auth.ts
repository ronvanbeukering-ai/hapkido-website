export const SUPERADMIN_EMAIL = "ronvanbeukering@gmail.com";

export function isSuperAdmin(email: string | null | undefined): boolean {
  return email?.toLowerCase() === SUPERADMIN_EMAIL.toLowerCase();
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
