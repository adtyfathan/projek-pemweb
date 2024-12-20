import express from 'express';
import { getCars, insertCar, updateCar, createCar, getCar, deleteCar, getTopCars, updateCarComments, handleLike } from "../controllers/carController.js";

const router = express.Router();

router.get("/api/cars", getCars);
router.get("/api/cars/top-cars", getTopCars);
router.get("/api/cars/:id", getCar);
router.post("/api/cars", createCar);
router.delete("/api/delete-car/:id", deleteCar);
router.post("/api/cars/:id/comment", updateCarComments);
router.post("/api/cars/handle-like", handleLike);
router.put("/api/cars/update-car", updateCar);
router.post("/api/cars/insert-car", insertCar);

export default router;