import { Router } from "express";
import { authRoutes } from "../../modules/auth/routes/auth.routes";
import { clientRoutes } from "../../modules/clients/routes/client.routes";
import { appointmentRouter } from "../../modules/appointments/routes/appointment.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/clients", clientRoutes);
router.use("/appointments", appointmentRouter);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Verifica o status da API
 *     description: Retorna uma resposta simples para confirmar que a API está ativa e operacional.
 *     tags:
 *       - Health
 *     security: []
 *     responses:
 *       200:
 *         description: API em funcionamento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default router;
