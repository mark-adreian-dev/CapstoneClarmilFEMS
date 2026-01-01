export const formatPHP = (amount: number | string | undefined | null): string => {
  if (amount === undefined || amount === null || amount === "") {
    return "₱0.00";
  }

  const numericValue = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numericValue)) return "₱0.00";

  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
};