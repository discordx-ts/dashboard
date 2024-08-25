import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(fullName: string) {
  return fullName
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2) // Limit to the first 2 initials
    .join("");
}
