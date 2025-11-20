export type TContactInfo = {
  name: string;
  phone: string;
  email: string;
  region?: string;
};

export type TRetirementSnapshot = {
  target_age?: string;
  desired_income?: string;
  estimated_savings?: string;
};

export type THousingEquity = {
  estimated_home_equity?: string;
  equity_comfort?: string;
};

export type TDollarFarPlanning = {
  calculators?: string[];
  interpretation_toggle?: boolean;
  name_pre?: string;
  email_pre?: string;
  phone_pre?: string;
  time_pre?: string;
  subscription_status?: '' | 'have' | 'start' | 'paid';
  subscription_payment_intent?: string;
};

export type TTravelPlanning = {
  months_abroad?: string;
  start_timeline?: string;
  travel_style?: string;
  independent_travel_ack?: boolean;
  country_region_interest?: string;
  ideal_locations_interest?: string;
};

export type TBudgetEstimates = {
  home_spend_monthly?: string;
  abroad_budget_season?: string;
  flights_insurance_budget?: string;
  flight_class?: string;
};

export type TTravelPurpose = {
  travel_purpose?: string[];
};

export type TPrivacyAcknowledgements = {
  ack_poc?: boolean;
  consent_contact?: boolean;
  ack_scope?: boolean;
};

export type TRetirementNextStep = {
  contact: TContactInfo;
  retirement_snapshot: TRetirementSnapshot;
  housing_equity: THousingEquity;
  dollarfar_planning: TDollarFarPlanning;
  travel_planning: TTravelPlanning;
  budget_estimates: TBudgetEstimates;
  travel_purpose: TTravelPurpose;
  privacy_acknowledgements: TPrivacyAcknowledgements;
};
