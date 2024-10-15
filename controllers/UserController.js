import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user == null) return res.status(400).send("Invalid credentials");
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send("Invalid credentials");
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {expiresIn: "1h"});
        res.json({ token });
    } catch (error) {
        console.log(error)
    }
}

export const signup = async (req, res) => {
    try {
        const { email, username, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).send("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email: email,
            password: hashedPassword,
            username: username,
            role: role
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY, { expiresIn: "1h" });
        res.status(201).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
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