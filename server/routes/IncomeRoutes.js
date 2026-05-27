import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  addIncome,
  getIncomes,
  deleteIncome,
} from "../controllers/IncomeController.js";

const router = express.Router();

router.route("/")
  .post(protect, addIncome)
  .get(protect, getIncomes);

router.route("/:id")
  .delete(protect, deleteIncome);

export default router;