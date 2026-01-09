import {  clsx  } from "clsx";
import {  twMerge  } from "tailwind-merge";

/**
 * Combine clsx and tailwind-merge for better class handling
 * @param {...any} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
