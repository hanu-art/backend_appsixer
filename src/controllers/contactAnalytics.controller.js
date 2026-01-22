import { getDailyContacts
    , getMonthlyContacts 
    , getContactSummary
 } from "../models/contactAnalytics.model.js";
 import { successResponse
    , errorResponse
  } from "../utils/response.util.js";
  /* =========================
     DAILY ANALYTICS
  ========================= */
  export const fetchDailyAnalytics = async (req, res) => {
    try {
      const data = await getDailyContacts();
  
      return successResponse(res, {
        message: "Daily contact analytics fetched successfully",
        data,
      });
    } catch (error) {
      return errorResponse(res, {
        message: "Failed to fetch daily analytics",
        errors: error.message,
      });
    }
  };
  
  /* =========================
     MONTHLY ANALYTICS
  ========================= */
  export const fetchMonthlyAnalytics = async (req, res) => {
    try {
      const data = await getMonthlyContacts();
  
      return successResponse(res, {
        message: "Monthly contact analytics fetched successfully",
        data,
      });
    } catch (error) {
      return errorResponse(res, {
        message: "Failed to fetch monthly analytics",
        errors: error.message,
      });
    }
  };
  
  /* =========================
     SUMMARY ANALYTICS
  ========================= */
  export const fetchAnalyticsSummary = async (req, res) => {
    try {
      const data = await getContactSummary();
  
      return successResponse(res, {
        message: "Contact analytics summary fetched successfully",
        data,
      });
    } catch (error) {
      return errorResponse(res, {
        message: "Failed to fetch analytics summary",
        errors: error.message,
      });
    }
  };
  