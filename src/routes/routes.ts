import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.Controller";
import { login, authMiddleware } from "../controllers/auth.Controller";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */
const router = Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mateus Rodrigues
 *               email:
 *                 type: string
 *                 example: mateus@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error or user already exists
 */
router.post("/users", createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login and get JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: mateus@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful with token
 *       401:
 *         description: Invalid credentials
 */
router.post("/auth/login", login);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
router.get("/auth/users", authMiddleware, getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/auth/users/:id", authMiddleware, getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user data
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mateus Rodrigues
 *               email:
 *                 type: string
 *                 example: mateus@email.com
 *               password:
 *                 type: string
 *                 example: novaSenha123
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put("/auth/users/:id", authMiddleware, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/auth/users/:id", authMiddleware, deleteUser);

export default router;
