import { RetirementNextStepModel } from './retirementNextStepPlan.model';
import { TRetirementNextStep } from './retirementNextStepPlan.interface';
import { sendUserEmail } from '../../utils/sendUserEmail';
import { ConsultationScheduleConfig } from '../consultationScheduleConfig/consultationScheduleConfig.model';
import { IConsultationScheduleConfig } from '../consultationScheduleConfig/consultationScheduleConfig.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const getCustomerEmailHTMLBody = (data: TRetirementNextStep) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RetireHow Retirement Planning Submission</title>
</head>
<body>
    <div style="margin:10px">
        <header>
            <p>
                Hi <strong>${data?.contact?.name}</strong>,
            </p>
            <p>
                Thank you for submitting your retirement planning details! We've received your information and will review it carefully.
            </p>
        </header>

        <div>
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">📋 Your Submitted Information</h2>
            
            <div>
                <h3 style="margin-top: 0; color: #3498db;">Contact Information</h3>
                <p><strong>Name:</strong> ${data.contact.name}</p>
                <p><strong>Email:</strong> ${data.contact.email}</p>
                <p><strong>Phone:</strong> ${data.contact.phone}</p>
                <p><strong>Country:</strong> ${data?.contact?.country}</p>
                <p><strong>Province/State:</strong> ${data?.contact?.region}</p>
            </div>

            ${
              data?.retirement_snapshot?.target_age ||
              data?.retirement_snapshot?.desired_income ||
              data?.retirement_snapshot?.estimated_savings
                ? `
            <div>
                <h3 style="margin-top: 0; color: #3498db;">Retirement Goals</h3>
                ${
                  data?.retirement_snapshot?.target_age
                    ? `<p><strong>Target Retirement Age:</strong> ${data.retirement_snapshot.target_age}</p>`
                    : ''
                }
                ${
                  data?.retirement_snapshot?.desired_income
                    ? `<p><strong>Desired Annual Income:</strong> ${data.retirement_snapshot.desired_income}</p>`
                    : ''
                }
                ${
                  data?.retirement_snapshot?.estimated_savings
                    ? `<p><strong>Estimated Current Savings:</strong> ${data.retirement_snapshot.estimated_savings}</p>`
                    : ''
                }
            </div>
            `
                : ''
            }

            ${
              data?.housing_equity?.estimated_home_equity ||
              data?.housing_equity?.equity_comfort
                ? `
            <div>
                <h3 style="margin-top: 0; color: #3498db;">Housing Equity</h3>
                ${
                  data?.housing_equity?.estimated_home_equity
                    ? `<p><strong>Estimated Home Equity:</strong> ${data.housing_equity.estimated_home_equity}</p>`
                    : ''
                }
                ${
                  data?.housing_equity?.equity_comfort
                    ? `<p><strong>Equity Comfort Level:</strong> ${data.housing_equity.equity_comfort}</p>`
                    : ''
                }
            </div>
            `
                : ''
            }

            ${
              data?.travel_planning?.months_abroad ||
              data?.travel_planning?.travel_style
                ? `
            <div>
                <h3 style="margin-top: 0; color: #3498db;">Travel Planning</h3>
                ${
                  data?.travel_planning?.months_abroad
                    ? `<p><strong>Months Abroad Planned:</strong> ${data.travel_planning.months_abroad}</p>`
                    : ''
                }
                ${
                  data?.travel_planning?.start_timeline
                    ? `<p><strong>Start Timeline:</strong> ${data.travel_planning.start_timeline}</p>`
                    : ''
                }
                ${
                  data?.travel_planning?.travel_style
                    ? `<p><strong>Travel Style:</strong> ${data.travel_planning.travel_style}</p>`
                    : ''
                }
                ${
                  data?.travel_planning?.country_region_interest
                    ? `<p><strong>Country/Region Interest:</strong> ${data.travel_planning.country_region_interest}</p>`
                    : ''
                }
                ${
                  data?.travel_planning?.ideal_locations_interest
                    ? `<p><strong>Ideal Locations:</strong> ${data.travel_planning.ideal_locations_interest}</p>`
                    : ''
                }
            </div>
            `
                : ''
            }

            ${
              data?.budget_estimates?.home_spend_monthly ||
              data?.budget_estimates?.abroad_budget_season
                ? `
            <div>
                <h3 style="margin-top: 0; color: #3498db;">Budget Estimates</h3>
                ${
                  data?.budget_estimates?.home_spend_monthly
                    ? `<p><strong>Monthly Home Spending:</strong> ${data.budget_estimates.home_spend_monthly}</p>`
                    : ''
                }
                ${
                  data?.budget_estimates?.abroad_budget_season
                    ? `<p><strong>Abroad Budget per Season:</strong> ${data.budget_estimates.abroad_budget_season}</p>`
                    : ''
                }
                ${
                  data?.budget_estimates?.flights_insurance_budget
                    ? `<p><strong>Flights & Insurance Budget:</strong> ${data.budget_estimates.flights_insurance_budget}</p>`
                    : ''
                }
                ${
                  data?.budget_estimates?.flight_class
                    ? `<p><strong>Preferred Flight Class:</strong> ${data.budget_estimates.flight_class}</p>`
                    : ''
                }
            </div>
            `
                : ''
            }

            ${
              data?.travel_purposes?.travel_purpose?.length
                ? `
            <div>
                <h3 style="margin-top: 0; color: #3498db;">Travel Purposes</h3>
                <p><strong>Selected:</strong> ${data.travel_purposes.travel_purpose.join(
                  ', ',
                )}</p>
            </div>
            `
                : ''
            }
        </div>

        <div>
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">📧 Next Steps</h2>
            <p>Our retirement planning specialist will review your submission and contact you within 2 business days to discuss the next steps.</p>
            <p>If you have any immediate questions, please don't hesitate to reach out.</p>
        </div>

        <div>
            <p><strong>Warm regards,</strong></p>
            <p>Rao Movva, PFP, CIM, CIWM, FCSI</p>
            <p>Founder, CEO</p>
            <p>RetireHow.com & TravelGlobal.ca</p>
            <p>Phone Canada Office: 1-289-815-3631</p>
            <p>Email: rao.movva@retirehow.com</p>
            <p style="margin-top: 15px; font-style: italic; color: #7f8c8d;">
                P.S. We're committed to helping you achieve your retirement dreams. Check your inbox for additional resources and insights!
            </p>
        </div>
    </div>
</body>
</html>`;
};

const getAdvisorEmailHTMLBody = (data: TRetirementNextStep) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Retirement Planning Submission - RetireHow</title>
</head>
<body>
    <div style="margin:10px">
         <header>
            <p>
                Hi <strong>Rao Movva</strong>,
            </p>
            <p>
                A new retirement planning details has been submitted from <strong>Dollarfar.com</strong>
            </p>
        </header>

        <div>
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">👤 Client Contact Information</h2>
            <div>
                <p><strong>Name:</strong> ${data?.contact?.name}</p>
                <p><strong>Email:</strong> ${data?.contact?.email}</p>
                <p><strong>Phone:</strong> ${data?.contact?.phone}</p>
                <p><strong>Country:</strong> ${data?.contact?.country}</p>
                <p><strong>Province/State:</strong> ${data?.contact?.region}</p>
            </div>
        </div>

        ${
          data?.retirement_snapshot?.target_age ||
          data?.retirement_snapshot?.desired_income ||
          data?.retirement_snapshot?.estimated_savings
            ? `
        <div>
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">💰 Retirement Goals</h2>
            <div>
                ${
                  data?.retirement_snapshot?.target_age
                    ? `<p><strong>Target Retirement Age:</strong> ${data.retirement_snapshot.target_age}</p>`
                    : ''
                }
                ${
                  data?.retirement_snapshot?.desired_income
                    ? `<p><strong>Desired Annual Income:</strong> ${data.retirement_snapshot.desired_income}</p>`
                    : ''
                }
                ${
                  data?.retirement_snapshot?.estimated_savings
                    ? `<p><strong>Estimated Current Savings:</strong> ${data.retirement_snapshot.estimated_savings}</p>`
                    : ''
                }
            </div>
        </div>
        `
            : ''
        }

        ${
          data?.housing_equity?.estimated_home_equity ||
          data?.housing_equity?.equity_comfort
            ? `
        <div>
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">🏠 Housing Equity</h2>
            <div>
                ${
                  data?.housing_equity?.estimated_home_equity
                    ? `<p><strong>Estimated Home Equity:</strong> ${data.housing_equity.estimated_home_equity}</p>`
                    : ''
                }
                ${
                  data?.housing_equity?.equity_comfort
                    ? `<p><strong>Equity Comfort Level:</strong> ${data.housing_equity.equity_comfort}</p>`
                    : ''
                }
            </div>
        </div>
        `
            : ''
        }

        ${
          data?.travel_planning?.months_abroad ||
          data?.travel_planning?.travel_style
            ? `
        <div>
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">✈️ Travel Planning</h2>
            <div>
                ${
                  data?.travel_planning?.months_abroad
                    ? `<p><strong>Months Abroad:</strong> ${data.travel_planning.months_abroad}</p>`
                    : ''
                }
                ${
                  data?.travel_planning?.start_timeline
                    ? `<p><strong>Start Timeline:</strong> ${data.travel_planning.start_timeline}</p>`
                    : ''
                }
                ${
                  data?.travel_planning?.travel_style
                    ? `<p><strong>Travel Style:</strong> ${data.travel_planning.travel_style}</p>`
                    : ''
                }
                ${
                  data?.travel_planning?.independent_travel_ack
                    ? `<p><strong>Independent Travel Ack:</strong> Yes</p>`
                    : ''
                }
                ${
                  data?.travel_planning?.country_region_interest
                    ? `<p><strong>Country/Region Interest:</strong> ${data.travel_planning.country_region_interest}</p>`
                    : ''
                }
                ${
                  data?.travel_planning?.ideal_locations_interest
                    ? `<p><strong>Ideal Locations:</strong> ${data.travel_planning.ideal_locations_interest}</p>`
                    : ''
                }
            </div>
        </div>
        `
            : ''
        }

        ${
          data?.budget_estimates?.home_spend_monthly ||
          data?.budget_estimates?.abroad_budget_season
            ? `
        <div>
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">📊 Budget Estimates</h2>
            <div>
                ${
                  data?.budget_estimates?.home_spend_monthly
                    ? `<p><strong>Monthly Home Spending:</strong> ${data.budget_estimates.home_spend_monthly}</p>`
                    : ''
                }
                ${
                  data?.budget_estimates?.abroad_budget_season
                    ? `<p><strong>Abroad Budget per Season:</strong> ${data.budget_estimates.abroad_budget_season}</p>`
                    : ''
                }
                ${
                  data?.budget_estimates?.flights_insurance_budget
                    ? `<p><strong>Flights & Insurance Budget:</strong> ${data.budget_estimates.flights_insurance_budget}</p>`
                    : ''
                }
                ${
                  data?.budget_estimates?.flight_class
                    ? `<p><strong>Preferred Flight Class:</strong> ${data.budget_estimates.flight_class}</p>`
                    : ''
                }
            </div>
        </div>
        `
            : ''
        }

        ${
          data?.travel_purposes?.travel_purpose?.length
            ? `
        <div>
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">🎯 Travel Purposes</h2>
            <div>
                <p><strong>Selected Purposes:</strong> ${data.travel_purposes.travel_purpose.join(
                  ', ',
                )}</p>
            </div>
        </div>
        `
            : ''
        }

        ${
          data?.dollarfar_planning?.calculators?.length ||
          data?.dollarfar_planning?.interpretation_toggle
            ? `
        <div>
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">📈 DollarFar Planning</h2>
            <div>
                ${
                  data?.dollarfar_planning?.calculators?.length
                    ? `<p><strong>Selected Calculators:</strong> ${data.dollarfar_planning.calculators.join(
                        ', ',
                      )}</p>`
                    : ''
                }
                ${
                  data?.dollarfar_planning?.interpretation_toggle !== undefined
                    ? `<p><strong>Interpretation Toggle:</strong> ${
                        data.dollarfar_planning.interpretation_toggle
                          ? 'Yes'
                          : 'No'
                      }</p>`
                    : ''
                }
            </div>
        </div>
        `
            : ''
        }

        ${
          data?.privacy_acknowledgements?.ack_poc ||
          data?.privacy_acknowledgements?.consent_contact ||
          data?.privacy_acknowledgements?.ack_scope
            ? `
        <div>
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">🔒 Privacy Acknowledgements</h2>
            <div>
                ${
                  data?.privacy_acknowledgements?.ack_poc
                    ? `<p>✅ Acknowledged Point of Contact</p>`
                    : ''
                }
                ${
                  data?.privacy_acknowledgements?.consent_contact
                    ? `<p>✅ Consented to Contact</p>`
                    : ''
                }
                ${
                  data?.privacy_acknowledgements?.ack_scope
                    ? `<p>✅ Acknowledged Scope</p>`
                    : ''
                }
            </div>
        </div>
        `
            : ''
        }

        <div>
            <div>
                <p style="color: #e74c3c; font-weight: bold;">⏰ Recommended Action:</p>
                <p>Please contact this client within 2 business days to begin their retirement planning journey.</p>
                <p><strong>Primary Contact:</strong> ${
                  data?.contact?.name || 'Client'
                } via ${data?.contact?.email || 'email'}</p>
            </div>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee; font-size: 12px; color: #95a5a6;">
            <p>This submission was received through Dollarfar's online planning form.</p>
            <p>Submission Date: ${new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</p>
        </div>
    </div>
</body>
</html>`;
};

const createRetirementNextStepPlanIntoDB = async (
  payload: TRetirementNextStep,
) => {
  //Get info from consultation schedule config
  const scheduleConfig =
    (await ConsultationScheduleConfig.findOne()) as IConsultationScheduleConfig;
  if (!scheduleConfig) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No consultation schedule configuration found!',
    );
  }

  // Send email to customer
  const customreZeptoRes = await sendUserEmail({
    to: [{ address: payload.contact.email, name: payload.contact.name }],
    subject: 'RetireHow Retirement Planning Submission',
    body: getCustomerEmailHTMLBody(payload),
  });
  if (customreZeptoRes.error) {
    throw customreZeptoRes.error;
  }

  // Send email to consultant
  const consultantZeptoRes = await sendUserEmail({
    to: [{ address: scheduleConfig.email, name: scheduleConfig.name }],
    subject: 'New Retirement Planning Submission - Dollarfar',
    body: getAdvisorEmailHTMLBody(payload),
  });
  if (consultantZeptoRes.error) {
    throw consultantZeptoRes.error;
  }

  const res = await RetirementNextStepModel.create(payload);
  return res;
};

const getAllRetirementNextStepPlansFromDB = async () => {
  const res = await RetirementNextStepModel.find({}).sort({ _id: -1 });
  return res;
};

const getSingleRetirementNextStepPlanFromDB = async (planId: string) => {
  const res = await RetirementNextStepModel.findById(planId);
  return res;
};

export const RetirementNextStepServices = {
  createRetirementNextStepPlanIntoDB,
  getAllRetirementNextStepPlansFromDB,
  getSingleRetirementNextStepPlanFromDB,
};
