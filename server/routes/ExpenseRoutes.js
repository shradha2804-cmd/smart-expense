import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  addExpense,
  getExpenses,
  deleteExpense,
} from "../controllers/ExpenseController.js";

const router = express.Router();

router.route("/")
  .post(protect, addExpense)
  .get(protect, getExpenses);

router.route("/:id")
  .delete(protect, deleteExpense);

export default router;