import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Station, StationType } from '@/entities';
import Logger from '@/utils/logger';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ['src/entities/**/*.ts'],
});

const stationData = [
  {
    stationName: 'Trạm ĐH Bách Khoa',
    address: '1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội',
    latitude: 21.0055,
    longitude: 105.8436,
    totalSlots: 30,
    availableSlots: 20,
    isActive: true,
    stationType: StationType.UNIVERSITY,
    imageUrls: ['https://images.unsplash.com/photo-1542314831-c6a4d1429810?w=800'],
  },
  {
    stationName: 'Trạm Vincom Bà Triệu',
    address: '191 Bà Triệu, Lê Đại Hành, Hai Bà Trưng, Hà Nội',
    latitude: 21.0116,
    longitude: 105.8495,
    totalSlots: 40,
    availableSlots: 40,
    isActive: true,
    stationType: StationType.COMMERCIAL,
    imageUrls: ['https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800'],
  },
  {
    stationName: 'Trạm Hồ Gươm',
    address: '1 Đinh Tiên Hoàng, Hàng Trống, Hoàn Kiếm, Hà Nội',
    latitude: 21.0285,
    longitude: 105.8523,
    totalSlots: 20,
    availableSlots: 5,
    isActive: true,
    stationType: StationType.PUBLIC,
    imageUrls: ['https://images.unsplash.com/photo-1559592413-7a912bb0ffbd?w=800'],
  },
  {
    stationName: 'Trạm Aeon Mall Long Biên',
    address: '27 Cổ Linh, Long Biên, Hà Nội',
    latitude: 21.0253,
    longitude: 105.9004,
    totalSlots: 50,
    availableSlots: 45,
    isActive: true,
    stationType: StationType.COMMERCIAL,
    imageUrls: ['https://images.unsplash.com/photo-1519567281799-ac15ce4b13bd?w=800'],
  },
  {
    stationName: 'Trạm Vinhomes Times City',
    address: '458 Minh Khai, Vĩnh Tuy, Hai Bà Trưng, Hà Nội',
    latitude: 20.9961,
    longitude: 105.8679,
    totalSlots: 35,
    availableSlots: 10,
    isActive: true,
    stationType: StationType.RESIDENTIAL,
    imageUrls: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'],
  },
  {
    stationName: 'Trạm Kaopiz Hoa Kỳ',
    address: 'Tầng 4 The Light, Tố Hữu, Nam Từ Liêm, Hà Nội',
    latitude: 20.9996,
    longitude: 105.7825,
    totalSlots: 10,
    availableSlots: 10,
    isActive: true,
    stationType: StationType.COMMERCIAL,
    imageUrls: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
  },
  {
    stationName: 'Trạm ĐH Kinh tế Quốc dân',
    address: '207 Giải Phóng, Đồng Tâm, Hai Bà Trưng, Hà Nội',
    latitude: 21.0006,
    longitude: 105.8430,
    totalSlots: 25,
    availableSlots: 25,
    isActive: true,
    stationType: StationType.UNIVERSITY,
    imageUrls: ['https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800'],
  },
  {
    stationName: 'Trạm Lotte Center',
    address: '54 Liễu Giai, Cống Vị, Ba Đình, Hà Nội',
    latitude: 21.0318,
    longitude: 105.8123,
    totalSlots: 30,
    availableSlots: 15,
    isActive: true,
    stationType: StationType.COMMERCIAL,
    imageUrls: ['https://images.unsplash.com/photo-1555139049-2eeb2dc58721?w=800'],
  },
  {
    stationName: 'Trạm Tòa nhà Keangnam',
    address: 'Phạm Hùng, Nam Từ Liêm, Hà Nội',
    latitude: 21.0175,
    longitude: 105.7840,
    totalSlots: 40,
    availableSlots: 30,
    isActive: true,
    stationType: StationType.COMMERCIAL,
    imageUrls: ['https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800'],
  },
  {
    stationName: 'Trạm ĐH Quốc Gia Hà Nội',
    address: '144 Xuân Thủy, Cầu Giấy, Hà Nội',
    latitude: 21.0381,
    longitude: 105.7828,
    totalSlots: 20,
    availableSlots: 10,
    isActive: true,
    stationType: StationType.UNIVERSITY,
    imageUrls: ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'],
  },
  {
    stationName: 'Trạm Hồ Tây - Trích Sài',
    address: 'Đường Trích Sài, Tây Hồ, Hà Nội',
    latitude: 21.0505,
    longitude: 105.8126,
    totalSlots: 15,
    availableSlots: 5,
    isActive: true,
    stationType: StationType.PUBLIC,
    imageUrls: ['https://images.unsplash.com/photo-1506744626753-1fa44f4ffb4d?w=800'],
  },
  {
    stationName: 'Trạm Vinhomes Royal City',
    address: '72A Nguyễn Trãi, Thanh Xuân, Hà Nội',
    latitude: 21.0033,
    longitude: 105.8157,
    totalSlots: 45,
    availableSlots: 40,
    isActive: true,
    stationType: StationType.RESIDENTIAL,
    imageUrls: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'],
  },
  {
    stationName: 'Trạm Ga Hà Nội',
    address: '120 Lê Duẩn, Cửa Nam, Hoàn Kiếm, Hà Nội',
    latitude: 21.0252,
    longitude: 105.8423,
    totalSlots: 15,
    availableSlots: 10,
    isActive: true,
    stationType: StationType.PUBLIC,
    imageUrls: ['https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?w=800'],
  },
  {
    stationName: 'Trạm Sân bay Nội Bài',
    address: 'Sân bay Nội Bài, Sóc Sơn, Hà Nội',
    latitude: 21.2187,
    longitude: 105.8042,
    totalSlots: 50,
    availableSlots: 35,
    isActive: true,
    stationType: StationType.PUBLIC,
    imageUrls: ['https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800'],
  },
  {
    stationName: 'Trạm Công viên Thống Nhất',
    address: 'Công viên Thống Nhất, Trần Nhân Tông, Hà Nội',
    latitude: 21.0152,
    longitude: 105.8450,
    totalSlots: 20,
    availableSlots: 18,
    isActive: true,
    stationType: StationType.PUBLIC,
    imageUrls: ['https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800'],
  },
  {
    stationName: 'Trạm AEON Mall Hà Đông',
    address: 'Khu dân cư Hoàng Văn Thụ, Hà Đông, Hà Nội',
    latitude: 20.9754,
    longitude: 105.7483,
    totalSlots: 45,
    availableSlots: 40,
    isActive: true,
    stationType: StationType.COMMERCIAL,
    imageUrls: ['https://images.unsplash.com/photo-1519567281799-ac15ce4b13bd?w=800'],
  },
  {
    stationName: 'Trạm Vinhomes Ocean Park',
    address: 'Đa Tốn, Gia Lâm, Hà Nội',
    latitude: 20.9947,
    longitude: 105.9405,
    totalSlots: 60,
    availableSlots: 30,
    isActive: true,
    stationType: StationType.RESIDENTIAL,
    imageUrls: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'],
  },
  {
    stationName: 'Trạm KTX Mỹ Đình',
    address: 'Hàm Nghi, Nam Từ Liêm, Hà Nội',
    latitude: 21.0345,
    longitude: 105.7667,
    totalSlots: 25,
    availableSlots: 12,
    isActive: true,
    stationType: StationType.RESIDENTIAL,
    imageUrls: ['https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800'],
  },
  {
    stationName: 'Trạm Phố đi bộ Trịnh Công Sơn',
    address: 'Giao ngõ 612 Lạc Long Quân, Tây Hồ, Hà Nội',
    latitude: 21.0772,
    longitude: 105.8153,
    totalSlots: 15,
    availableSlots: 5,
    isActive: true,
    stationType: StationType.PUBLIC,
    imageUrls: ['https://images.unsplash.com/photo-1549487293-c9772ee575d5?w=800'],
  },
  {
    stationName: 'Trạm Chợ Đồng Xuân',
    address: 'Đồng Xuân, Hoàn Kiếm, Hà Nội',
    latitude: 21.0375,
    longitude: 105.8505,
    totalSlots: 20,
    availableSlots: 8,
    isActive: true,
    stationType: StationType.PUBLIC,
    imageUrls: ['https://images.unsplash.com/photo-1516053154881-81f9a888eac4?w=800'],
  },
];

const seedStations = async () => {
  try {
    await AppDataSource.initialize();
    Logger.info('📦 Database connected for seeding stations...');

    let created = 0;
    let skipped = 0;

    for (const data of stationData) {
      const existing = await Station.findOneBy({ stationName: data.stationName });
      if (existing) {
        Logger.info(`⚠️ Station "${data.stationName}" already exists. Skipping.`);
        skipped++;
        continue;
      }

      const station = Station.create(data);
      await Station.save(station);
      Logger.info(`✅ Created station: ${data.stationName}`);
      created++;
    }

    Logger.info(`\n🎉 Station seeding complete! Created: ${created} | Skipped: ${skipped}`);
  } catch (error) {
    Logger.error('❌ Station seeding failed:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
  }
};

seedStations();
