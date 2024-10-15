import express from 'express';
import { getUser, createUser, login, signup } from '../controllers/UserController.js';

const router = express.Router();

router.get("/api/user", getUser);
router.post("/api/user", createUser);
router.post("/login", login);
router.post("/sign-up", signup)

export default router;