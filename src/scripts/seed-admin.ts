import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User, UserRole, UserStatus } from '@/entities';
import Logger from '@/utils/logger';
import bcrypt from 'bcryptjs';

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ['src/entities/**/*.ts'],
});

const seedAdmin = async () => {
  try {
    await AppDataSource.initialize();
    Logger.info('📦 Database connected for seeding...')
    const adminEmail = 'admin@vshare.com';
    const existingAdmin = await User.findOneBy({ email: adminEmail });
    if (existingAdmin) {
      Logger.info('⚠️ Admin account already exists.')
    }
    const hashedPassword = await bcrypt.hash('admin@123', 10);
    const admin = User.create({
      fullName: 'Super Admin',
      email: adminEmail,
      phone: '0999000099',
      password: hashedPassword,
      userType: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      walletBalance: 99999999,
    });

    await User.save(admin);
    Logger.info('✅ Admin account created successfully!');
    Logger.info('Email: ', adminEmail);
    Logger.info('Password: ', 'admin@123');
  } catch (error) {
    Logger.error('❌ Seeding failed:', error)
  } finally {
    await AppDataSource.destroy();
  }
};

seedAdmin();