import '@shared/container';
import { errorsHandler } from '@shared/handlers/ErrorsHandler';
import cors from 'cors';
import express from 'express';
import '../typeorm';
import { routes } from './routes/index.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorsHandler);

export { app };
