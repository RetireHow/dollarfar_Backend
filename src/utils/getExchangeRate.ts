/* eslint-disable @typescript-eslint/no-explicit-any */
type TCurrency = {
  one_usd_to_currency: number;
  currency: string;
  one_eur_to_currency: number;
};

export function getExchangeRate(
  data: TCurrency[],
  fromCurrency: string,
  toCurrency: string
):number {
  const rates = data.reduce((acc: any, item: TCurrency) => {
    acc[item.currency] = item.one_usd_to_currency;
    return acc;
  }, {});

  if (!rates[fromCurrency] || !rates[toCurrency]) {
    // return "Invalid currency code";
    return 1;
  }

  return rates[toCurrency] / rates[fromCurrency];
}
