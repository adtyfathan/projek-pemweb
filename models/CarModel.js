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
    engine: { type: String, required: true },
    interior: { type: String, required: true },
    exterior: { type: String, required: true },
    like: {type: Number, required: false, default: 0},
    comment: {
        type: [
            {
                name: { type: String, required: true },
                image: { type: String, default: "/images/profile-default.png" },
                score: { type: Number, required: true },
                message: { type: String, required: true },
                createdAt: { type: Date, default: Date.now }
            }
        ],
        default: []
    }
});

const Car = mongoose.model("Car", carSchema);

export default Car;