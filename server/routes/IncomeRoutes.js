import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  addIncome,
  getIncome,
  deleteIncome,
} from "../controllers/IncomeController.js";

const router = express.Router();

router.route("/")
  .post(protect, addIncome)
  .get(protect, getIncome);

router.route("/:id")
  .delete(protect, deleteIncome);

export default router;