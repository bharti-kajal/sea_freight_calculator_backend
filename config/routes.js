import express from 'express';
const router = express.Router();
import CalculatorController from '../features/controllers/calculator.controller.js';

const calculatorController = new CalculatorController();

// 1. Optimization summary 
router.post("/optimize-load", (req, res) => calculatorController.optimizeLoad(req, res));

export default router;