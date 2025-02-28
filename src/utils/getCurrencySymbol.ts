export function getCurrencySymbol(currencyCode: string) {
  return (0)
    .toLocaleString(undefined, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim();
}
