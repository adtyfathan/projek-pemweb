import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, default: "/images/profile-default.png" },
    role: { type: String, required: true },
    address: { type: String, default: null },
    country: { type: String, default: null },
    region: { type: String, default: null },
    city: { type: String, default: null },
    postal_code: { type: Number, default: null },
    phone_number: { type: Number, default: null },
    transaction: {
        type: [
            {
                id: { type: String, required: true },
                car_id: { type: String, required: true },
                brand: { type: String, required: true },
                model: { type: String, required: true },
                // 
                email: { type: String, required: true },
                fname: { type: String, required: true },
                lname: { type: String, required: true },
                address: { type: String, required: true },
                country: { type: String, required: true },
                region: { type: String, required: true },
                city: { type: String, required: true },
                postal_code: { type: Number, required: true },
                phone_number: { type: Number, required: true },
                payment_option: { type: String, required: true },
                // 
                order_price: { type: Number, required: true },
                delivery_price: { type: Number, required: true },
                tax_price: { type: Number, required: true },
                app_price: { type: Number, required: true },
                total_price: { type: Number, required: true },
                status: { type: String, required: true },
                createdAt: { type: Date, default: Date.now }
            }
        ],
        default: [],
    },
    liked_cars: {
        type: [String],
        default: []
    },
    liked_news: {
        type: [String],
        default: []
    }
});

const User = mongoose.model("User", userSchema);

export default User;