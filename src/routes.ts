import { Router, type Request, type Response } from 'express';

export const routes = Router();

routes.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
  console.log(req.method, req.url, res.statusCode);
});
