import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user == null) return res.status(400).json({ error: "Login failed!" });
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: "Login failed!" });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {expiresIn: "1h"});
        res.status(201).json({ 
            token,
            id: user._id
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists!" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email: email,
            password: hashedPassword,
            username: username,
            role: "user"
        });

        await newUser.save();
        res.status(201).send("Register successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const createUser = async (req, res) => {
    const { email, username, password, role } = req.body;

    const newUser = new User({ email, password });

    try {
        await newUser.save();
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateTransaction = async (req, res) => {
    const { userId, car_id, brand, model, email, fname, lname, address, country, region, city, postal_code, phone_number, payment_option, order_price, delivery_price, tax_price, app_price, total_price, status } = req.body;

    // console.log(req.body)
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const randomBytes = crypto.randomBytes(8).toString('hex');
    const transactionId = timestamp + randomBytes;
    // console.log(transactionId)
    const createdAt = new Date();

    // console.log(createdAt)

    try {
        const result = await User.updateOne(
            {_id: userId},
            {
                $push: {
                    transaction: {
                        id: transactionId,
                        car_id,
                        brand,
                        model,
                        // 
                        email,
                        fname,
                        lname,
                        address,
                        country,
                        region,
                        city,
                        postal_code, // int
                        phone_number, // int
                        payment_option,
                        // 
                        order_price, // int
                        delivery_price, // int
                        tax_price, // int
                        app_price, // int
                        total_price, // int
                        status,
                        createdAt
                    }
                }
            }
        );
        res.status(200).json(result);
    } catch(error){
        res.status(400).json({ message: error.message });
    }
}