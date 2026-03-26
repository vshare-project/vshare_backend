import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from '@/routes/user.routes';
import authRoutes from '@/routes/auth.routes';
import stationRoutes from '@/routes/station.routes';
import vehicleRoutes from '@/routes/vehicle.routes';
import subscriptionPlanRoutes from '@/routes/subscription-plan.routes';
import subscriptionRoutes from '@/routes/subscription.routes';
import swagger from 'swagger-ui-express';
import { swaggerSpec } from '@/config/swagger';
import { globalErrorHandler } from '@/middlewares/error.middleware';
import { AppError } from './utils/appError';

const app = express();

const allowedOrigins = [
  'http://localhost:3000',      
  'http://localhost:5173',     
  'https://your-production-app.com', 
];
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new AppError('Not allowed by CORS', 403));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
// Middleware
app.use(morgan('dev'));
app.use(express.json());

app.use('/api-docs', swagger.serve, swagger.setup(swaggerSpec));
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/station', stationRoutes);
app.use('/vehicle', vehicleRoutes);
app.use('/subscription', subscriptionRoutes);
app.use('/subscriptionplan', subscriptionPlanRoutes);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;