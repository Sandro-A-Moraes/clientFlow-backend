import express from 'express';
import { routes } from './routes.js';
import { errorHandler } from './shared/middlewares/error-handler.js';

export const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandler);
