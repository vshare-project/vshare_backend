import 'reflect-metadata';
import { AppDataSource } from './config/data-source';
import app from './app';
import Logger from '@/utils/logger';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('🔥 Database connected (MySQL)');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📄 Docs available at http://localhost:${PORT}/api-docs`);
      // Logger.info(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => console.log('❌ Database connection failed:', error));