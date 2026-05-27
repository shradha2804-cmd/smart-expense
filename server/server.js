import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import path from "path";

import connectDB from "./config/db.js";

import authRoutes from "./routes/AuthRoutes.js";

import expenseRoutes from "./routes/ExpenseRoutes.js";

import incomeRoutes from "./routes/IncomeRoutes.js";

import dashboardRoutes from "./routes/DashboardRoutes.js";

import userRoutes from "./routes/UserRoutes.js";

import adminRoutes from "./routes/AdminRoutes.js";

import notificationRoutes from "./routes/NotificationRoutes.js";

dotenv.config();

connectDB();

const app = express();


// MIDDLEWARES
app.use(cors());

app.use(express.json());


// STATIC UPLOADS
app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);


// ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/expenses",
  expenseRoutes
);

app.use(
  "/api/income",
  incomeRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/users",
  userRoutes
);

//Admin Routes

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);
// HOME ROUTE
app.get("/", (req, res) => {

  res.send(
    "Finora API Running..."
  );

});


// SERVER
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});