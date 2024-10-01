import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    power: { type: Number, required: true },
    max_speed: { type: Number, required: true },
    acceleration: { type: Number, required: true },
    image: { type: String, required: true },
    image_overview: { type: String, required: false },
    image_engine: { type: String, required: false },
    image_interior: { type: String, required: false },
    image_exterior: { type: String, required: false },
    description: { type: String, required: true },
    power_consumption: { type: String, required: true },
    price: { type: String, required: true }, 
    overview: { type: String, required: true },
});

const Car = mongoose.model("Car", carSchema);

export default Car;