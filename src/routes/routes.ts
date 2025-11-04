import { Router } from "express";
import { createUser, getAllUsers,getUserById,updateUser,deleteUser } from "../controllers/userController";
import { authMiddlewares } from "../controllers/authController";
import { authMiddleware } from "../middlewares/auth";

export const router = Router();

router.post('/create', createUser);

router.get('/users', authMiddlewares, getAllUsers);
router.get('/users/:id', authMiddlewares, getUserById);
router.put('/users/:id', authMiddlewares, updateUser);
router.delete('/users/:id', authMiddlewares, deleteUser);
