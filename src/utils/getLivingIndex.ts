export const getLivingIndex = (
  locationATotalPrice: number,
  locationBTotalPrice: number
) => {
  if (!locationATotalPrice || !locationBTotalPrice) {
    return 0;
  }
  const totalLivingIndex =
    ((locationBTotalPrice - locationATotalPrice) / locationATotalPrice) * 100;
  return Number(totalLivingIndex?.toFixed(2));
};
