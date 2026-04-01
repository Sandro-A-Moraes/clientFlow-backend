import { Router } from "express";
import { UserRepository } from "../../user/repository/user.repository";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";
import { AuthMiddleware } from "../middleware/auth.middleware";

const authRoutes = Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);
const authMiddleware = new AuthMiddleware();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Registrar novo usuário
 *     description: Cria uma nova conta de usuário no sistema.
 *     tags:
 *       - Auth
 *     security: []
 *     requestBody:
 *       required: true
 *       description: Dados necessários para criação da conta
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
authRoutes.post("/register", authController.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Autenticar usuário
 *     description: Valida as credenciais do usuário e retorna um token JWT.
 *     tags:
 *       - Auth
 *     security: []
 *     requestBody:
 *       required: true
 *       description: Credenciais de acesso
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
authRoutes.post("/login", authController.login);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Obter usuário autenticado
 *     description: Retorna os dados do usuário associado ao token JWT enviado na requisição.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
authRoutes.get("/me", authMiddleware.authenticate, authController.me);

export { authRoutes };
