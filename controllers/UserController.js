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
            id: user._id,
            role: user.role
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

    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const randomBytes = crypto.randomBytes(8).toString('hex');
    const transactionId = timestamp + randomBytes;
    const createdAt = new Date();

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
        res.status(200).json({
            message: "Transaction added successfully",
            transactionId,
        });
    } catch(error){
        res.status(400).json({ message: error.message });
    }
}

export const getTransaction = async (req, res) => {
    const transactionId = req.params.id;
    const { userId } = req.body;

    try {
        const user = await User.findOne(
            {_id: userId, "transaction.id": transactionId},
            { "transaction.$": 1 }
        );
        if (!user) return res.status(404).json({ message: 'Transaction not found' });
        const transaction = user.transaction[0];
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addLiked = async (req, res) => {
    const { userId, instanceId, column } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            {_id: userId},
            { $push: { [column]:  instanceId} }, // column = liked_cars || liked_news 
            { new: true }
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const removeLiked = async (req, res) => {
    const { userId, instanceId, column } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { [column]: instanceId } }, // column = liked_cars || liked_news 
            { new: true } 
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const { userId, username, address, country, region, city, postal_code, phone_number } = req.body;
    try {
        const user = await User.updateOne(
            { _id: userId },
            {
                $set: { username, address, country, region, city, postal_code, phone_number }
            },
        );
        res.status(200).json({ message: "profile data changed"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const changePassword = async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(userId);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

