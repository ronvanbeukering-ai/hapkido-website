import { Resend } from "resend";

export function getMailer() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY ontbreekt");
  }

  return new Resend(apiKey);
}

export function getMailFrom() {
  return process.env.RESEND_FROM ?? "Hapkido Yong <noreply@hapkidonederland.nl>";
}
