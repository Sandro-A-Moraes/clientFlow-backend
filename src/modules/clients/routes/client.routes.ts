import { Router } from "express";
import { ClientRepository } from "../repository/client.repository";
import { ClientService } from "../service/client.service";
import { ClientController } from "../controller/client.controller";
import { AuthMiddleware } from "../../auth/middleware/auth.middleware";

const clientRepository = new ClientRepository();
const clientService = new ClientService(clientRepository);
const clientController = new ClientController(clientService);
const authMiddleware = new AuthMiddleware();
const clientRoutes = Router();

/**
 * @openapi
 * /clients:
 *   post:
 *     summary: Create a new client
 *     description: Creates a new client account
 *     tags:
 *       - Clients
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 example: (123) 456-7890
 *               observations:
 *                 type: string
 *                 example: Client with special requirements
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 client:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 1234567890
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     phone:
 *                       type: string
 *                       example: (123) 456-7890
 *                     observations:
 *                       type: string
 *                       example: Client with special requirements
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid client data
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */

clientRoutes.post("/", authMiddleware.authenticate, clientController.create);
clientRoutes.get("/", authMiddleware.authenticate, clientController.list);
clientRoutes.get("/:id", authMiddleware.authenticate, clientController.getById);

export { clientRoutes };
