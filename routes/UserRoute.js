import express from 'express';
import { getUser, createUser, login, signup, updateTransaction, getTransaction } from '../controllers/UserController.js';

const router = express.Router();

router.get("/api/user/:id", getUser);
router.post("/api/user", createUser);
router.post("/login", login);
router.post("/sign-up", signup);
router.post("/api/user/update-transaction", updateTransaction);
router.post("/api/user/transaction/:id", getTransaction);

export default router;