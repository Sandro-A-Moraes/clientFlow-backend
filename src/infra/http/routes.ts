import { Router } from "express";
import { authRoutes } from "../../modules/auth/routes/auth.routes.js";
import { clientRoutes } from "../../modules/clients/routes/client.routes.js";
import { appointmentRouter } from "../../modules/appointments/routes/appointment.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/clients", clientRoutes);
router.use("/appointments", appointmentRouter);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Check API health
 *     description: Returns a simple status payload.
 *     tags:
 *       - Health
 *     security: []
 *     responses:
 *       200:
 *         description: API is healthy
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
