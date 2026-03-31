import {Router} from "express";
import { UserRepository } from "../../user/repository/user.repository";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";
import { AuthMiddleware } from "../middleware/auth.middleware";

const authRoutes = Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);
const authMiddleware = new AuthMiddleware();

authRoutes.post("/register", authController.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Endpoint to login a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNDU2Nzg5MCIsImlhdCI6MTUxNjIzOTA2Mn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
    *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 1234567890
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
    *                     name:
 *                       type: string
 *                       example: John Doe
    *       401:
 *         description: Invalid credentials
    *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid credentials

 */

authRoutes.post("/login", authController.login);
authRoutes.get("/me", authMiddleware.authenticate, authController.me);

export { authRoutes };