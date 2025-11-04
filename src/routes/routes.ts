import { Router } from "express";
import { createUser, getAllUsers,getUserById,updateUser,deleteUser } from "../controllers/user.Controller";
import { authMiddlewares } from "../controllers/auth.Controller";
import { authMiddleware } from "../middlewares/auth";

export const router = Router();

router.post('/create', createUser);

router.get('/users', authMiddlewares, getAllUsers);
router.get('/users/:id', authMiddlewares, getUserById);
router.put('/users/:id', authMiddlewares, updateUser);
router.delete('/users/:id', authMiddlewares, deleteUser);
