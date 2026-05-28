import dotenv from "dotenv";

dotenv.config();

import express from "express";

import cors from "cors";

import path from "path";

import connectDB from "./config/db.js";

import authRoutes from "./routes/AuthRoutes.js";

import expenseRoutes from "./routes/ExpenseRoutes.js";

import incomeRoutes from "./routes/IncomeRoutes.js";

import dashboardRoutes from "./routes/DashboardRoutes.js";

import userRoutes from "./routes/UserRoutes.js";

import adminRoutes from "./routes/AdminRoutes.js";

import notificationRoutes from "./routes/NotificationRoutes.js";

import contactRoutes from "./routes/ContactRoutes.js";

// CONNECT DATABASE
connectDB();

const app = express();

// ================= MIDDLEWARES =================

// CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// BODY PARSER
app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ================= STATIC FILES =================

app.use(
  "/uploads",
  express.static(
    path.join(
      process.cwd(),
      "uploads"
    )
  )
);

// ================= ROUTES =================

// AUTH
app.use(
  "/api/auth",
  authRoutes
);

// EXPENSES
app.use(
  "/api/expenses",
  expenseRoutes
);

// INCOME
app.use(
  "/api/income",
  incomeRoutes
);

// DASHBOARD
app.use(
  "/api/dashboard",
  dashboardRoutes
);

// USERS
app.use(
  "/api/users",
  userRoutes
);

// ADMIN
app.use(
  "/api/admin",
  adminRoutes
);

// NOTIFICATIONS
app.use(
  "/api/notifications",
  notificationRoutes
);

// CONTACT MESSAGES
app.use(
  "/api/contact",
  contactRoutes
);

// ================= HOME =================

app.get(
  "/",
  (req, res) => {

    res.send(
      "Finora API Running..."
    );

  }
);

// ================= 404 HANDLER =================

app.use(
  (req, res) => {

    res.status(404).json({
      message:
        "API Route Not Found",
    });

  }
);

// ================= ERROR HANDLER =================

app.use(
  (
    err,
    req,
    res,
    next
  ) => {

    console.error(err);

    res.status(
      err.status || 500
    ).json({
      message:
        err.message ||
        "Server Error",
    });

  }
);

// ================= SERVER =================

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {

    console.log(
      `🚀 Finora Server Running on Port ${PORT}`
    );

  }
);