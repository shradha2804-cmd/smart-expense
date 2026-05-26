import express from "express";

import {
  addIncome,
  getIncomes,
  deleteIncome,
} from "../controllers/IncomeController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, addIncome)
  .get(protect, getIncomes);

router.route("/:id")
  .delete(protect, deleteIncome);

export default router;