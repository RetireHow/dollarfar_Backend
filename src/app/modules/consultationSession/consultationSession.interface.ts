import { Types } from 'mongoose';

// Sub-interfaces
export type IContactInfo = {
  name: string;
  phone: string;
  email: string;
  region: string;
  country: string;
};

export interface IRetirementSnapshot {
  target_age?: string;
  desired_income?: string;
  estimated_savings?: string;
}

export interface IHousingEquity {
  estimated_home_equity?: string;
  equity_comfort?: string;
}

export interface IDollarFarPlanning {
  calculators?: string[];
  interpretation_toggle: boolean;
  consultation_time:string;
}

export interface ITravelPlanning {
  months_abroad?: string;
  start_timeline?: string;
  travel_style?: string;
  independent_travel_ack?: boolean;
  country_region_interest?: string;
  ideal_locations_interest?: string;
}

export interface IBudgetEstimates {
  home_spend_monthly?: string;
  abroad_budget_season?: string;
  flights_insurance_budget?: string;
  flight_class?: string;
}

export interface IPrivacyAcknowledgements {
  ack_poc?: boolean;
  consent_contact?: boolean;
  ack_scope?: boolean;
}

// Main Interface
export interface IConsultationSession {
  _id?: string;
  subscription: Types.ObjectId;
  session_number: number;
  sessions_remaining: number;
  session_duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  scheduled_by: string;

  contact: IContactInfo;
  retirement_snapshot?: IRetirementSnapshot;
  housing_equity?: IHousingEquity;
  dollarfar_planning?: IDollarFarPlanning;
  travel_planning?: ITravelPlanning;
  travel_purposes?: string[];
  budget_estimates?: IBudgetEstimates;
  privacy_acknowledgements?: IPrivacyAcknowledgements;
  isDeleted: boolean;
  slot: Date;
  userTZ:string;
  userTZ_IANA:string;
  consultantTZ:string;
  consultantTZ_IANA:string;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}
