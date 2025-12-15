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
    <style>
        body {
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            font-size: 16px;
            color: #333333;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        header {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #3498db;
        }
        .section {
            margin-bottom: 25px;
        }
        h1, h2, h3 {
            color: #2c3e50;
        }
        .info-box {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #3498db;
            margin: 15px 0;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
            font-size: 14px;
            color: #666666;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1 style="color: #2c3e50; margin-bottom: 10px;">RetireHow Retirement Planning</h1>
            <p style="font-size: 18px;">
                Hi <strong>${data?.contact?.name}</strong>,
            </p>
            <p>
                Thank you for submitting your retirement planning details! We've received your information and will review it carefully.
            </p>
        </header>

        <div class="section">
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">📋 Your Submitted Information</h2>
            
            <div class="info-box">
                <h3 style="margin-top: 0; color: #3498db;">Contact Information</h3>
                <p><strong>Name:</strong> ${data?.contact?.name}</p>
                <p><strong>Email:</strong> ${data?.contact?.email}</p>
                <p><strong>Phone:</strong> ${data?.contact?.phone}</p>
                <p><strong>Region/State:</strong> ${data?.contact?.region || 'Not provided'}</p>
                <p><strong>Country:</strong> ${data?.contact?.country || 'Not provided'}</p>
            </div>

            ${
              data?.retirement_snapshot?.target_age ||
              data?.retirement_snapshot?.desired_income ||
              data?.retirement_snapshot?.estimated_savings
                ? `
            <div class="info-box">
                <h3 style="margin-top: 0; color: #3498db;">Retirement Goals</h3>
                ${data?.retirement_snapshot?.target_age ? `<p><strong>Target Retirement Age:</strong> ${data.retirement_snapshot.target_age}</p>` : ''}
                ${data?.retirement_snapshot?.desired_income ? `<p><strong>Desired Annual Income:</strong> ${data.retirement_snapshot.desired_income}</p>` : ''}
                ${data?.retirement_snapshot?.estimated_savings ? `<p><strong>Estimated Current Savings:</strong> ${data.retirement_snapshot.estimated_savings}</p>` : ''}
            </div>
            `
                : ''
            }

            ${
              data?.housing_equity?.estimated_home_equity ||
              data?.housing_equity?.equity_comfort
                ? `
            <div class="info-box">
                <h3 style="margin-top: 0; color: #3498db;">Housing Equity</h3>
                ${data?.housing_equity?.estimated_home_equity ? `<p><strong>Estimated Home Equity:</strong> ${data.housing_equity.estimated_home_equity}</p>` : ''}
                ${data?.housing_equity?.equity_comfort ? `<p><strong>Equity Comfort Level:</strong> ${data.housing_equity.equity_comfort}</p>` : ''}
            </div>
            `
                : ''
            }

            ${
              data?.travel_planning?.months_abroad ||
              data?.travel_planning?.travel_style
                ? `
            <div class="info-box">
                <h3 style="margin-top: 0; color: #3498db;">Travel Planning</h3>
                ${data?.travel_planning?.months_abroad ? `<p><strong>Months Abroad Planned:</strong> ${data.travel_planning.months_abroad}</p>` : ''}
                ${data?.travel_planning?.start_timeline ? `<p><strong>Start Timeline:</strong> ${data.travel_planning.start_timeline}</p>` : ''}
                ${data?.travel_planning?.travel_style ? `<p><strong>Travel Style:</strong> ${data.travel_planning.travel_style}</p>` : ''}
                ${data?.travel_planning?.country_region_interest ? `<p><strong>Country/Region Interest:</strong> ${data.travel_planning.country_region_interest}</p>` : ''}
                ${data?.travel_planning?.ideal_locations_interest ? `<p><strong>Ideal Locations:</strong> ${data.travel_planning.ideal_locations_interest}</p>` : ''}
            </div>
            `
                : ''
            }

            ${
              data?.budget_estimates?.home_spend_monthly ||
              data?.budget_estimates?.abroad_budget_season
                ? `
            <div class="info-box">
                <h3 style="margin-top: 0; color: #3498db;">Budget Estimates</h3>
                ${data?.budget_estimates?.home_spend_monthly ? `<p><strong>Monthly Home Spending:</strong> ${data.budget_estimates.home_spend_monthly}</p>` : ''}
                ${data?.budget_estimates?.abroad_budget_season ? `<p><strong>Abroad Budget per Season:</strong> ${data.budget_estimates.abroad_budget_season}</p>` : ''}
                ${data?.budget_estimates?.flights_insurance_budget ? `<p><strong>Flights & Insurance Budget:</strong> ${data.budget_estimates.flights_insurance_budget}</p>` : ''}
                ${data?.budget_estimates?.flight_class ? `<p><strong>Preferred Flight Class:</strong> ${data.budget_estimates.flight_class}</p>` : ''}
            </div>
            `
                : ''
            }

            ${
              data?.travel_purposes?.travel_purpose?.length
                ? `
            <div class="info-box">
                <h3 style="margin-top: 0; color: #3498db;">Travel Purposes</h3>
                <p><strong>Selected:</strong> ${data.travel_purposes.travel_purpose.join(', ')}</p>
            </div>
            `
                : ''
            }
        </div>

        <div class="section">
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">📧 Next Steps</h2>
            <p>Our retirement planning specialist will review your submission and contact you within 2 business days to discuss the next steps.</p>
            <p>If you have any immediate questions, please don't hesitate to reach out.</p>
        </div>

        <div class="footer">
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
    <style>
        body {
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            font-size: 16px;
            color: #333333;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        header {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e74c3c;
        }
        .section {
            margin-bottom: 25px;
        }
        h1, h2, h3 {
            color: #2c3e50;
        }
        .info-box {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #e74c3c;
            margin: 15px 0;
        }
        .highlight {
            background-color: #fff3cd;
            padding: 10px;
            border-radius: 4px;
            border-left: 4px solid #ffc107;
            margin: 10px 0;
        }
        .label {
            display: inline-block;
            width: 200px;
            font-weight: bold;
            color: #2c3e50;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1 style="color: #2c3e50; margin-bottom: 5px;">🆕 New Retirement Planning Submission</h1>
            <p style="color: #7f8c8d; font-size: 14px;">Received from dollarfar.com</p>
        </header>

        <div class="section">
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">👤 Client Contact Information</h2>
            <div class="info-box">
                <p><span class="label">Name:</span> ${data?.contact?.name}</p>
                <p><span class="label">Email:</span> ${data?.contact?.email}</p>
                <p><span class="label">Phone:</span> ${data?.contact?.phone}</p>
                <p><span class="label">Region/State:</span> ${data?.contact?.region || 'Not provided'}</p>
                <p><span class="label">Country:</span> ${data?.contact?.country || 'Not provided'}</p>
            </div>
        </div>

        ${
          data?.retirement_snapshot?.target_age ||
          data?.retirement_snapshot?.desired_income ||
          data?.retirement_snapshot?.estimated_savings
            ? `
        <div class="section">
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">💰 Retirement Goals</h2>
            <div class="info-box">
                ${data?.retirement_snapshot?.target_age ? `<p><span class="label">Target Retirement Age:</span> ${data.retirement_snapshot.target_age}</p>` : ''}
                ${data?.retirement_snapshot?.desired_income ? `<p><span class="label">Desired Annual Income:</span> ${data.retirement_snapshot.desired_income}</p>` : ''}
                ${data?.retirement_snapshot?.estimated_savings ? `<p><span class="label">Estimated Current Savings:</span> ${data.retirement_snapshot.estimated_savings}</p>` : ''}
            </div>
        </div>
        `
            : ''
        }

        ${
          data?.housing_equity?.estimated_home_equity ||
          data?.housing_equity?.equity_comfort
            ? `
        <div class="section">
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">🏠 Housing Equity</h2>
            <div class="info-box">
                ${data?.housing_equity?.estimated_home_equity ? `<p><span class="label">Estimated Home Equity:</span> ${data.housing_equity.estimated_home_equity}</p>` : ''}
                ${data?.housing_equity?.equity_comfort ? `<p><span class="label">Equity Comfort Level:</span> ${data.housing_equity.equity_comfort}</p>` : ''}
            </div>
        </div>
        `
            : ''
        }

        ${
          data?.travel_planning?.months_abroad ||
          data?.travel_planning?.travel_style
            ? `
        <div class="section">
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">✈️ Travel Planning</h2>
            <div class="info-box">
                ${data?.travel_planning?.months_abroad ? `<p><span class="label">Months Abroad:</span> ${data.travel_planning.months_abroad}</p>` : ''}
                ${data?.travel_planning?.start_timeline ? `<p><span class="label">Start Timeline:</span> ${data.travel_planning.start_timeline}</p>` : ''}
                ${data?.travel_planning?.travel_style ? `<p><span class="label">Travel Style:</span> ${data.travel_planning.travel_style}</p>` : ''}
                ${data?.travel_planning?.independent_travel_ack ? `<p><span class="label">Independent Travel Ack:</span> Yes</p>` : ''}
                ${data?.travel_planning?.country_region_interest ? `<p><span class="label">Country/Region Interest:</span> ${data.travel_planning.country_region_interest}</p>` : ''}
                ${data?.travel_planning?.ideal_locations_interest ? `<p><span class="label">Ideal Locations:</span> ${data.travel_planning.ideal_locations_interest}</p>` : ''}
            </div>
        </div>
        `
            : ''
        }

        ${
          data?.budget_estimates?.home_spend_monthly ||
          data?.budget_estimates?.abroad_budget_season
            ? `
        <div class="section">
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">📊 Budget Estimates</h2>
            <div class="info-box">
                ${data?.budget_estimates?.home_spend_monthly ? `<p><span class="label">Monthly Home Spending:</span> ${data.budget_estimates.home_spend_monthly}</p>` : ''}
                ${data?.budget_estimates?.abroad_budget_season ? `<p><span class="label">Abroad Budget per Season:</span> ${data.budget_estimates.abroad_budget_season}</p>` : ''}
                ${data?.budget_estimates?.flights_insurance_budget ? `<p><span class="label">Flights & Insurance Budget:</span> ${data.budget_estimates.flights_insurance_budget}</p>` : ''}
                ${data?.budget_estimates?.flight_class ? `<p><span class="label">Preferred Flight Class:</span> ${data.budget_estimates.flight_class}</p>` : ''}
            </div>
        </div>
        `
            : ''
        }

        ${
          data?.travel_purposes?.travel_purpose?.length
            ? `
        <div class="section">
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">🎯 Travel Purposes</h2>
            <div class="info-box">
                <p><span class="label">Selected Purposes:</span> ${data.travel_purposes.travel_purpose.join(', ')}</p>
            </div>
        </div>
        `
            : ''
        }

        ${
          data?.dollarfar_planning?.calculators?.length ||
          data?.dollarfar_planning?.interpretation_toggle
            ? `
        <div class="section">
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">📈 DollarFar Planning</h2>
            <div class="info-box">
                ${data?.dollarfar_planning?.calculators?.length ? `<p><span class="label">Selected Calculators:</span> ${data.dollarfar_planning.calculators.join(', ')}</p>` : ''}
                ${data?.dollarfar_planning?.interpretation_toggle !== undefined ? `<p><span class="label">Interpretation Toggle:</span> ${data.dollarfar_planning.interpretation_toggle ? 'Yes' : 'No'}</p>` : ''}
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
        <div class="section">
            <h2 style="font-size: 20px; margin-bottom: 15px; color: #2c3e50;">🔒 Privacy Acknowledgements</h2>
            <div class="highlight">
                ${data?.privacy_acknowledgements?.ack_poc ? `<p>✅ Acknowledged Point of Contact</p>` : ''}
                ${data?.privacy_acknowledgements?.consent_contact ? `<p>✅ Consented to Contact</p>` : ''}
                ${data?.privacy_acknowledgements?.ack_scope ? `<p>✅ Acknowledged Scope</p>` : ''}
            </div>
        </div>
        `
            : ''
        }

        <div class="section">
            <div class="info-box">
                <p style="color: #e74c3c; font-weight: bold;">⏰ Recommended Action:</p>
                <p>Please contact this client within 2 business days to begin their retirement planning journey.</p>
                <p><strong>Primary Contact:</strong> ${data?.contact?.name || 'Client'} via ${data?.contact?.email || 'email'}</p>
            </div>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee; font-size: 12px; color: #95a5a6;">
            <p>This submission was received through Dollarfar's online planning form.</p>
            <p>Submission Date: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
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
