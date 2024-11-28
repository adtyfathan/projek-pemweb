import express from 'express';
import { getCars, createCar, getCar, getTopCars, updateCarComments, handleLike } from "../controllers/carController.js";

const router = express.Router();

router.get("/api/cars", getCars);
router.get("/api/cars/top-cars", getTopCars);
router.get("/api/cars/:id", getCar);
router.post("/api/cars", createCar);
router.post("/api/cars/:id/comment", updateCarComments);
router.post("/api/cars/handle-like", handleLike);

export default router;