/**
 * Currency Formatting Utilities for ZARF WEAR
 * All amounts are stored and calculated as integer Indian Paise (1 INR = 100 paise).
 */

export function formatInr(paise: number, includeDecimals: boolean = false): string {
  const rupees = (paise || 0) / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  }).format(rupees);
}

export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

export function paiseToRupees(paise: number): number {
  return Math.round(paise / 100);
}

