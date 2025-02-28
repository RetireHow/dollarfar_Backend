import { TCity, TExchangeRates, TPriceItem } from "../types";
import { getCurrencySymbol } from "./getCurrencySymbol";
import { getExchangeRate } from "./getExchangeRate";
import { getLivingIndex } from "./getLivingIndex";

export function calculateLivingCosts(
  city1Data: TCity,
  city2Data: TCity,
  priceItems: TPriceItem,
  exchangeRates: TExchangeRates
): {
  category: string;
  city1TotalCostCurrencyCode: string;
  city2TotalCostCurrencyCode: string;
  city1TotalCostCurrencySymbol: string;
  city2TotalCostCurrencySymbol: string;
  city1TotalCostOtherCurrencyPrice: number;
  city2TotalCostOtherCurrencyPrice: number;
  city1TotalCost: number;
  city2TotalCost: number;
  totalLivingIndex: number;
  items: {
    city1CurrencyCode: string;
    city2CurrencyCode: string;
    city1CurrencySymbol: string;
    city2CurrencySymbol: string;
    itemName: string;
    city1ItemPrice: number;
    city2ItemPrice: number;
    city1OtherCurrencyItemPrice: number;
    city2OtherCurrencyItemPrice: number;
    livingIndex: number;
  }[];
}[] {
  const categorizedData: Record<
    string,
    {
      category: string;
      city1TotalCostCurrencyCode: string;
      city2TotalCostCurrencyCode: string;
      city1TotalCostCurrencySymbol: string;
      city2TotalCostCurrencySymbol: string;
      city1TotalCostOtherCurrencyPrice: number;
      city2TotalCostOtherCurrencyPrice: number;
      city1TotalCost: number;
      city2TotalCost: number;
      totalLivingIndex: number;
      items: {
        city1CurrencyCode: string;
        city2CurrencyCode: string;
        city1CurrencySymbol: string;
        city2CurrencySymbol: string;
        itemName: string;
        city1ItemPrice: number;
        city2ItemPrice: number;
        city1OtherCurrencyItemPrice: number;
        city2OtherCurrencyItemPrice: number;
        livingIndex: number;
      }[];
    }
  > = {};

  priceItems?.items?.forEach((item) => {
    const city1Item = city1Data.prices.find((p) => p.item_id === item.item_id);
    const city2Item = city2Data.prices.find((p) => p.item_id === item.item_id);

    if (!city1Item || !city2Item) return; // Skip if data is missing

    const city1ExchangeRate =
      getExchangeRate(exchangeRates, city1Data.currency, city2Data.currency) ||
      1;

    const city2ExchangeRate =
      getExchangeRate(exchangeRates, city2Data.currency, city1Data.currency) ||
      1;

    if (!categorizedData[item.category]) {
      categorizedData[item.category] = {
        category: item.category,
        city1TotalCostCurrencyCode: city1Data.currency,
        city2TotalCostCurrencyCode: city2Data.currency,

        city1TotalCostCurrencySymbol:
          getCurrencySymbol(city1Data.currency) || city1Data.currency,
        city2TotalCostCurrencySymbol:
          getCurrencySymbol(city2Data.currency) || city2Data.currency,

        city1TotalCostOtherCurrencyPrice: 0,
        city2TotalCostOtherCurrencyPrice: 0,

        city1TotalCost: 0,
        city2TotalCost: 0,
        totalLivingIndex: 0,
        items: [],
      };
    }

    const city1PriceUSD = (city1Item.average_price || 1) * city1ExchangeRate;
    const city2PriceUSD = (city2Item.average_price || 1) * city2ExchangeRate;

    categorizedData[item.category].items.push({
      city1CurrencyCode: city1Data.currency,
      city2CurrencyCode: city2Data.currency,
      city1CurrencySymbol:
        getCurrencySymbol(city1Data.currency) || city1Data.currency,
      city2CurrencySymbol:
        getCurrencySymbol(city2Data.currency) || city2Data.currency,
      itemName: item.name,
      city1ItemPrice: city1Item.average_price || 0,
      city2ItemPrice: city2Item.average_price || 0,
      city1OtherCurrencyItemPrice: city1PriceUSD,
      city2OtherCurrencyItemPrice: city2PriceUSD,
      livingIndex: getLivingIndex(city1Item.average_price, city2PriceUSD),
    });

    categorizedData[item.category].city1TotalCost += (city1Item.average_price || 0);
    categorizedData[item.category].city2TotalCost += (city2Item.average_price || 0);

    const exchangeRateValueFromCity =
      getExchangeRate(exchangeRates, city1Data.currency, city2Data.currency) ||
      1;
    const exchangeRateValueToCity =
      getExchangeRate(exchangeRates, city2Data.currency, city1Data.currency) ||
      1;

    categorizedData[item.category].city1TotalCostOtherCurrencyPrice +=
      exchangeRateValueFromCity * (city1Item.average_price || 1);
    categorizedData[item.category].city2TotalCostOtherCurrencyPrice +=
      exchangeRateValueToCity * (city2Item.average_price || 1);
  });

  return Object.values(categorizedData).map((category) => {
    category.totalLivingIndex = getLivingIndex(
      category.city1TotalCost,
      category.city2TotalCostOtherCurrencyPrice
    );
    return category;
  });
}
