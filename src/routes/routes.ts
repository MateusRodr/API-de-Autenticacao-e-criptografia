import { Router } from "express";
import { createUser, getAllUsers,getUserById,updateUser,deleteUser } from "../controllers/userController";
import { authMiddlewares } from "../controllers/authController";
import { authMiddleware } from "../middlewares/auth";

export const router = Router();

router.post('/create', createUser);
router.post('/auth', authMiddlewares);
router.get('/users', authMiddleware, getAllUsers);
router.get('/users/:id', authMiddleware, getUserById);
router.put('/users/:id', authMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, deleteUser);
