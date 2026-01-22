import express from "express";

import { fetchMonthlyAnalytics
    , fetchDailyAnalytics 
    ,fetchAnalyticsSummary
 } from "../controllers/contactAnalytics.controller.js";
// agar already hai to wahi use kar lena
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* =========================
   CONTACT ANALYTICS ROUTES
   (ADMIN ONLY)
========================= */

// 📊 Day-wise analytics
router.get(
  "/analytics/daily",
    authMiddleware,
  fetchDailyAnalytics
);

// 📊 Month-wise analytics
router.get(
  "/analytics/monthly",
  authMiddleware,
  fetchMonthlyAnalytics
);

// 📊 Dashboard summary cards
router.get(
  "/analytics/summary",
  authMiddleware,
  fetchAnalyticsSummary
);

export default router
