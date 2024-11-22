import express from 'express';
import { getCars, createCar, getCar, getTopCars } from "../controllers/carController.js";

const router = express.Router();

router.get("/api/cars", getCars);
router.get("/api/cars/top-cars", getTopCars);
router.get("/api/cars/:id", getCar);
router.post("/api/cars", createCar);

export default router;