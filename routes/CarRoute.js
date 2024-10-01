import express from 'express';
import { getCars, createCar } from "../controllers/CarController.js";

const router = express.Router();

router.get("/cars", getCars);
router.post("/cars", createCar);

export default router;