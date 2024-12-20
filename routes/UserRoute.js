import express from 'express';
import { getUser, createUser, getAdmins, login, signup, updateTransaction, getTransaction, addLiked, removeLiked, updateProfile, changePassword, getUsers } from '../controllers/UserController.js';

const router = express.Router();

router.get("/api/users", getUsers);
router.get("/api/user/:id", getUser);
router.get("/api/admins", getAdmins)
router.post("/api/user", createUser);
router.post("/login", login);
router.post("/sign-up", signup);
router.post("/api/user/update-transaction", updateTransaction);
router.post("/api/user/transaction/:id", getTransaction);
router.post("/api/user/add-liked", addLiked); // const { userId, instanceId, column } = req.body;
router.post("/api/user/remove-liked", removeLiked); // const { userId, instanceId, column } = req.body;
router.post("/api/user/update-profile", updateProfile);
router.post("/api/user/change-password", changePassword);

export default router;