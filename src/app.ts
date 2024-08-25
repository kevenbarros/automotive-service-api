import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import serviceRoutes from './routes/serviceRoutes';
import clientRoutes from './routes/clientRoutes';
import vehicleRoutes from './routes/vehicleRoutes';
import brandRoutes from './routes/brandRoutes';
import modelRoutes from './routes/modelRoutes';
import { errorHandler } from './utils/errorHandler';
import { setupSwagger } from './swagger';

dotenv.config();

const app: Application = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB', error));

setupSwagger(app);  
app.use('/api', serviceRoutes);
app.use('/api', clientRoutes);
app.use('/api', vehicleRoutes);
app.use('/api', modelRoutes);
app.use('/api', brandRoutes);
app.use(errorHandler);

export default app;
