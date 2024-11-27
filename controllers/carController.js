import Car from "../models/CarModel.js";
import { ObjectId } from 'mongodb';


export const getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.status(200).json(car);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

export const getTopCars = async (req, res) => {
    try {
        const topModels = await Car.find().sort({ like: -1 }).limit(3);
        res.status(200).json(topModels)
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const createCar = async (req, res) => {
    const { brand, model, power, max_speed, acceleration, image, image_overview, image_engine, image_interior, image_exterior, description, power_consumption, price, overview, engine, interior, exterior, like, comment } = req.body;

    const newCar = new Car({ brand, model, power, max_speed, acceleration, image, image_overview, image_engine, image_interior, image_exterior, description, power_consumption, price, overview, engine, interior, exterior, like, comment });

    try {
        await newCar.save();
        res.status(201).json(newCar)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateCarComments = async (req, res) => {
    const carId = req.params.id;
    const { name, image, score, message } = req.body;
    
    try {
        const result = await Car.updateOne(
            {_id: carId},
            {
                $push: {
                    comment: {
                        name,
                        image,
                        score,
                        message,
                        createdAt: new Date()
                    }
                }
            }
        );    
        res.status(200).json(result);
    } catch(error){
        res.status(400).json({ message: error.message });
    }
}