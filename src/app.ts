import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';

// Routes
app.use('/api', routes);

// Base Route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to FinTrack Core API' });
});

// Error Handler
app.use(errorHandler);

export default app;
