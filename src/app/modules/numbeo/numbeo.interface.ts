
export interface CityPricesQueryParams {
  city: string;
  country: string;
  currency: string;
}

export interface CityCostEstimatorQueryParams {
  country: string;
  city: string;
  members: string;
  children: string;
  isRent: string;
  currency: string;
}

export type TRecentComparison = {
  cityA: string;
  cityB: string;
};

export type NumbeoIndicesResponse = {
  name: string;
  cost_of_living_index: number;
  rent_index: number;
  cost_of_living_plus_rent_index: number;
  groceries_index: number;
  restaurant_price_index: number;
  local_purchasing_power_index: number;
};
