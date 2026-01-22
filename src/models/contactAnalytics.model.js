import { pool } from "../config/db.config.js"; 



/* =========================
   DAY-WISE ANALYTICS
========================= */
export const getDailyContacts = async () => {
  const query = `
    SELECT 
      DATE(created_at) AS date,
      COUNT(*) AS count
    FROM contacts
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at) ASC
  `;

  const [rows] = await pool.query(query);
  return rows;
};

/* =========================
   MONTH-WISE ANALYTICS
========================= */
export const getMonthlyContacts = async () => {
  const query = `
    SELECT 
      DATE_FORMAT(created_at, '%Y-%m') AS month,
      COUNT(*) AS count
    FROM contacts
    GROUP BY DATE_FORMAT(created_at, '%Y-%m')
    ORDER BY month ASC
  `;

  const [rows] = await pool.query(query);
  return rows;
};

/* =========================
   SUMMARY ANALYTICS
========================= */
export const getContactSummary = async () => {
  const query = `
    SELECT
      SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) AS today,
      SUM(CASE WHEN DATE(created_at) = CURDATE() - INTERVAL 1 DAY THEN 1 ELSE 0 END) AS yesterday,
      SUM(CASE WHEN MONTH(created_at) = MONTH(CURDATE()) 
        AND YEAR(created_at) = YEAR(CURDATE()) THEN 1 ELSE 0 END) AS thisMonth,
      SUM(CASE WHEN MONTH(created_at) = MONTH(CURDATE() - INTERVAL 1 MONTH)
        AND YEAR(created_at) = YEAR(CURDATE() - INTERVAL 1 MONTH) THEN 1 ELSE 0 END) AS lastMonth
    FROM contacts
  `;

  const [rows] = await pool.query(query);
  return rows[0];
};
