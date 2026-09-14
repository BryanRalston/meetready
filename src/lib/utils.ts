import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function possessive(name: string) {
  const n = name.trim() || "Her";
  return /s$/i.test(n) ? `${n}'` : `${n}'s`;
}

export function formatScore(n: number | null | undefined) {
  if (n == null || Number.isNaN(n)) return "—";
  return n.toFixed(2);
}

export function daysUntil(iso: string | null | undefined) {
  if (!iso) return null;
  const target = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(target.getTime())) return null;
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

export function uid() {
  return crypto.randomUUID();
}
