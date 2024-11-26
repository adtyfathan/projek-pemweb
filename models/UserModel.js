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
    phone_number: { type: Number, default: null }
});

const User = mongoose.model("User", userSchema);

export default User;