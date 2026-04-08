import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Vehicle, VehicleType, VehicleStatus, Station } from '@/entities';
import { CarDetails, TransmissionType, DriveMode } from '@/entities/car_details.entity';
import { MotorbikeDetails, MotorbikeType } from '@/entities/motorbike_details.entity';
import Logger from '@/utils/logger';

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

// ─── Sample Data ──────────────────────────────────────────────────────────────

const carData = [
  {
    vehicleCode: 'VF-VF3-001',
    brand: 'VinFast',
    model: 'VF3',
    color: 'Trắng Ngọc Trai',
    year: 2024,
    licensePlate: '30A-001.11',
    batteryLevel: 100,
    rangeKm: 215,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0285, currentLong: 105.8048,
    issueImages: [
      'https://images.unsplash.com/photo-1562141960-1d3b7d8e4d90?w=800',
    ],
    carDetails: {
      capacity: 4, numDoors: 4,
      transmissionType: TransmissionType.AUTOMATIC, driveMode: DriveMode.TWO_WHEEL,
      motorPowerKw: 42, batteryCapacityKwh: 19.05, maxSpeedKmh: 110, chargingTimeHour: 8,
      hasAirConditioning: true, hasSunroof: false, hasGPS: true, hasBackupCamera: true, hasBlindSpotMonitor: false,
      features: ['Cửa sổ điện', 'Kết nối Bluetooth'],
    },
  },
  {
    vehicleCode: 'VF-VF5-001',
    brand: 'VinFast',
    model: 'VF5 Plus',
    color: 'Xanh Dương',
    year: 2023,
    licensePlate: '30A-002.22',
    batteryLevel: 88,
    rangeKm: 326,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0310, currentLong: 105.8060,
    issueImages: [
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
    ],
    carDetails: {
      capacity: 5, numDoors: 5,
      transmissionType: TransmissionType.AUTOMATIC, driveMode: DriveMode.TWO_WHEEL,
      motorPowerKw: 100, batteryCapacityKwh: 37.23, maxSpeedKmh: 130, chargingTimeHour: 8,
      hasAirConditioning: true, hasSunroof: false, hasGPS: true, hasBackupCamera: true, hasBlindSpotMonitor: true,
      features: ['Đèn LED', 'Cảm biến lùi', 'Màn hình cảm ứng 10"'],
    },
  },
  {
    vehicleCode: 'VF-VF6-001',
    brand: 'VinFast',
    model: 'VF6',
    color: 'Đỏ Rực',
    year: 2024,
    licensePlate: '30A-003.33',
    batteryLevel: 75,
    rangeKm: 381,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0330, currentLong: 105.8080,
    issueImages: [
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800',
    ],
    carDetails: {
      capacity: 5, numDoors: 5,
      transmissionType: TransmissionType.AUTOMATIC, driveMode: DriveMode.TWO_WHEEL,
      motorPowerKw: 125, batteryCapacityKwh: 59.6, maxSpeedKmh: 178, chargingTimeHour: 10,
      hasAirConditioning: true, hasSunroof: true, hasGPS: true, hasBackupCamera: true, hasBlindSpotMonitor: true,
      features: ['Phanh tái sinh', 'Màn hình AR HUD', 'Hệ thống âm thanh JBL'],
    },
  },
  {
    vehicleCode: 'VF-VF7-001',
    brand: 'VinFast',
    model: 'VF7',
    color: 'Bạc Ánh Kim',
    year: 2024,
    licensePlate: '30A-004.44',
    batteryLevel: 90,
    rangeKm: 431,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0235, currentLong: 105.8200,
    issueImages: [
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800',
    ],
    carDetails: {
      capacity: 5, numDoors: 5,
      transmissionType: TransmissionType.AUTOMATIC, driveMode: DriveMode.FOUR_WHEEL,
      motorPowerKw: 175, batteryCapacityKwh: 75.3, maxSpeedKmh: 200, chargingTimeHour: 10,
      hasAirConditioning: true, hasSunroof: true, hasGPS: true, hasBackupCamera: true, hasBlindSpotMonitor: true,
      features: ['Đỗ xe tự động', 'Màn hình panoramic', 'Sạc nhanh DC 150kW'],
    },
  },
  {
    vehicleCode: 'VF-VF8-001',
    brand: 'VinFast',
    model: 'VF8',
    color: 'Đen Huyền Bí',
    year: 2023,
    licensePlate: '30A-005.55',
    batteryLevel: 60,
    rangeKm: 471,
    status: VehicleStatus.IN_USE,
    currentLat: 21.0185, currentLong: 105.8250,
    issueImages: [
      'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800',
    ],
    carDetails: {
      capacity: 7, numDoors: 5,
      transmissionType: TransmissionType.AUTOMATIC, driveMode: DriveMode.FOUR_WHEEL,
      motorPowerKw: 260, batteryCapacityKwh: 87.7, maxSpeedKmh: 200, chargingTimeHour: 12,
      hasAirConditioning: true, hasSunroof: true, hasGPS: true, hasBackupCamera: true, hasBlindSpotMonitor: true,
      features: ['Ghế da cao cấp', 'Hệ thống lọc không khí PM2.5', 'Sạc nhanh 150kW'],
    },
  },
  {
    vehicleCode: 'VF-VF9-001',
    brand: 'VinFast',
    model: 'VF9',
    color: 'Trắng Sứ',
    year: 2024,
    licensePlate: '30A-006.66',
    batteryLevel: 100,
    rangeKm: 594,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0400, currentLong: 105.7900,
    issueImages: [
      'https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?w=800',
    ],
    carDetails: {
      capacity: 7, numDoors: 5,
      transmissionType: TransmissionType.AUTOMATIC, driveMode: DriveMode.FOUR_WHEEL,
      motorPowerKw: 300, batteryCapacityKwh: 123, maxSpeedKmh: 200, chargingTimeHour: 14,
      hasAirConditioning: true, hasSunroof: true, hasGPS: true, hasBackupCamera: true, hasBlindSpotMonitor: true,
      features: ['Ghế massage', 'Màn hình 15.6"', 'Tủ lạnh tích hợp', 'Sạc nhanh 200kW'],
    },
  },
  {
    vehicleCode: 'TES-M3-001',
    brand: 'Tesla',
    model: 'Model 3',
    color: 'Trắng',
    year: 2023,
    licensePlate: '51A-100.01',
    batteryLevel: 92,
    rangeKm: 507,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0270, currentLong: 105.8350,
    issueImages: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    ],
    carDetails: {
      capacity: 5, numDoors: 4,
      transmissionType: TransmissionType.AUTOMATIC, driveMode: DriveMode.TWO_WHEEL,
      motorPowerKw: 239, batteryCapacityKwh: 57.5, maxSpeedKmh: 225, chargingTimeHour: 8,
      hasAirConditioning: true, hasSunroof: true, hasGPS: true, hasBackupCamera: true, hasBlindSpotMonitor: true,
      features: ['Autopilot', 'Màn hình 15.4"', 'Siêu sạc V3'],
    },
  },
  {
    vehicleCode: 'TES-MY-001',
    brand: 'Tesla',
    model: 'Model Y',
    color: 'Đỏ Đa Lớp',
    year: 2024,
    licensePlate: '51A-200.02',
    batteryLevel: 85,
    rangeKm: 533,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0155, currentLong: 105.8150,
    issueImages: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    ],
    carDetails: {
      capacity: 5, numDoors: 5,
      transmissionType: TransmissionType.AUTOMATIC, driveMode: DriveMode.FOUR_WHEEL,
      motorPowerKw: 384, batteryCapacityKwh: 75, maxSpeedKmh: 250, chargingTimeHour: 10,
      hasAirConditioning: true, hasSunroof: true, hasGPS: true, hasBackupCamera: true, hasBlindSpotMonitor: true,
      features: ['Full Self-Driving', 'Hàng ghế thứ 3 tùy chọn', 'Siêu sạc V3 250kW'],
    },
  },
  {
    vehicleCode: 'BYD-ATT-001',
    brand: 'BYD',
    model: 'Atto 3',
    color: 'Xanh Lam',
    year: 2023,
    licensePlate: '51A-300.03',
    batteryLevel: 70,
    rangeKm: 420,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0220, currentLong: 105.8100,
    issueImages: [
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800',
    ],
    carDetails: {
      capacity: 5, numDoors: 5,
      transmissionType: TransmissionType.AUTOMATIC, driveMode: DriveMode.TWO_WHEEL,
      motorPowerKw: 150, batteryCapacityKwh: 60.48, maxSpeedKmh: 160, chargingTimeHour: 9,
      hasAirConditioning: true, hasSunroof: true, hasGPS: true, hasBackupCamera: true, hasBlindSpotMonitor: false,
      features: ['Hệ thống Blade Battery', 'Màn hình xoay 15.6"', 'Sạc nhanh DC 88kW'],
    },
  },
  {
    vehicleCode: 'BYD-SEAL-001',
    brand: 'BYD',
    model: 'Seal',
    color: 'Xám Đậm',
    year: 2024,
    licensePlate: '51A-400.04',
    batteryLevel: 95,
    rangeKm: 570,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0125, currentLong: 105.8300,
    issueImages: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    ],
    carDetails: {
      capacity: 5, numDoors: 4,
      transmissionType: TransmissionType.AUTOMATIC, driveMode: DriveMode.FOUR_WHEEL,
      motorPowerKw: 390, batteryCapacityKwh: 82.56, maxSpeedKmh: 180, chargingTimeHour: 10,
      hasAirConditioning: true, hasSunroof: true, hasGPS: true, hasBackupCamera: true, hasBlindSpotMonitor: true,
      features: ['Hệ thống âm thanh Dynaudio', 'NFC mở cửa', 'Sạc nhanh 150kW'],
    },
  },
  {
    vehicleCode: 'HON-ENS1-001',
    brand: 'Honda',
    model: 'ENS1',
    color: 'Bạc',
    year: 2023,
    licensePlate: '43A-111.11',
    batteryLevel: 50,
    rangeKm: 420,
    status: VehicleStatus.MAINTENANCE,
    currentLat: 21.0050, currentLong: 105.8400,
    issueImages: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800',
    ],
    carDetails: {
      capacity: 5, numDoors: 5,
      transmissionType: TransmissionType.AUTOMATIC, driveMode: DriveMode.TWO_WHEEL,
      motorPowerKw: 134, batteryCapacityKwh: 68.8, maxSpeedKmh: 150, chargingTimeHour: 11,
      hasAirConditioning: true, hasSunroof: false, hasGPS: true, hasBackupCamera: true, hasBlindSpotMonitor: false,
      features: ['Honda Sensing', 'Màn hình 15.1"', 'Sạc nhanh DC 78kW'],
    },
  },
  {
    vehicleCode: 'VF-VF6-002',
    brand: 'VinFast',
    model: 'VF6',
    color: 'Xanh Rêu',
    year: 2024,
    licensePlate: '29B-555.55',
    batteryLevel: 45,
    rangeKm: 381,
    status: VehicleStatus.LOW_BATTERY,
    currentLat: 21.0480, currentLong: 105.8050,
    issueImages: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    ],
    carDetails: {
      capacity: 5, numDoors: 5,
      transmissionType: TransmissionType.AUTOMATIC, driveMode: DriveMode.TWO_WHEEL,
      motorPowerKw: 125, batteryCapacityKwh: 59.6, maxSpeedKmh: 178, chargingTimeHour: 10,
      hasAirConditioning: true, hasSunroof: false, hasGPS: true, hasBackupCamera: true, hasBlindSpotMonitor: false,
      features: ['Đèn LED toàn phần', 'Cảm biến đỗ xe'],
    },
  },
];

const motorbikeData = [
  {
    vehicleCode: 'DB-W200-001',
    brand: 'Dat Bike',
    model: 'Weaver++ 200',
    color: 'Đen Mờ',
    year: 2022,
    licensePlate: '29B1-111.11',
    batteryLevel: 95,
    rangeKm: 200,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0290, currentLong: 105.8020,
    issueImages: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    ],
    motorbikeDetails: {
      motorbikeType: MotorbikeType.SCOOTER,
      motorPowerW: 6000, batteryCapacityKwh: 4.46, maxSpeedKmh: 90,
      chargingTimeHour: 3, weightKg: 120, maxLoadKg: 150,
      hasHelmetStorage: true, hasUSBCharger: true, hasAntiLockBrakes: false, hasGPS: true,
      features: ['Màn hình TFT', 'Ứng dụng Dat Bike App'],
    },
  },
  {
    vehicleCode: 'DB-W200-002',
    brand: 'Dat Bike',
    model: 'Weaver++ 200',
    color: 'Xanh Navy',
    year: 2023,
    licensePlate: '29B1-222.22',
    batteryLevel: 80,
    rangeKm: 200,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0300, currentLong: 105.8010,
    issueImages: [
      'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800',
    ],
    motorbikeDetails: {
      motorbikeType: MotorbikeType.SCOOTER,
      motorPowerW: 6000, batteryCapacityKwh: 4.46, maxSpeedKmh: 90,
      chargingTimeHour: 3, weightKg: 120, maxLoadKg: 150,
      hasHelmetStorage: true, hasUSBCharger: true, hasAntiLockBrakes: false, hasGPS: true,
      features: ['Màn hình TFT', 'Ứng dụng Dat Bike App'],
    },
  },
  {
    vehicleCode: 'PEGA-AS-001',
    brand: 'Pega',
    model: 'AS',
    color: 'Trắng',
    year: 2022,
    licensePlate: '30F-100.01',
    batteryLevel: 60,
    rangeKm: 80,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0340, currentLong: 105.7980,
    issueImages: [
      'https://images.unsplash.com/photo-1568772585407-9f6e7b42e8d6?w=800',
    ],
    motorbikeDetails: {
      motorbikeType: MotorbikeType.SCOOTER,
      motorPowerW: 1800, batteryCapacityKwh: 1.56, maxSpeedKmh: 50,
      chargingTimeHour: 4, weightKg: 90, maxLoadKg: 120,
      hasHelmetStorage: true, hasUSBCharger: true, hasAntiLockBrakes: false, hasGPS: false,
      features: ['Cốp xe rộng', 'Chống trộm điện tử'],
    },
  },
  {
    vehicleCode: 'PEGA-AIRACER-001',
    brand: 'Pega',
    model: 'AI Racer',
    color: 'Đỏ Đen',
    year: 2023,
    licensePlate: '30F-200.02',
    batteryLevel: 100,
    rangeKm: 120,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0350, currentLong: 105.7970,
    issueImages: [
      'https://images.unsplash.com/photo-1568772585407-9f6e7b42e8d6?w=800',
    ],
    motorbikeDetails: {
      motorbikeType: MotorbikeType.SPORT,
      motorPowerW: 3000, batteryCapacityKwh: 2.4, maxSpeedKmh: 65,
      chargingTimeHour: 3.5, weightKg: 95, maxLoadKg: 130,
      hasHelmetStorage: false, hasUSBCharger: true, hasAntiLockBrakes: true, hasGPS: false,
      features: ['Màn hình LCD', 'Chống trộm GPS', 'Hệ thống giảm chấn nâng cao'],
    },
  },
  {
    vehicleCode: 'VIN-KLB-001',
    brand: 'VinFast',
    model: 'Klara S',
    color: 'Hồng Phấn',
    year: 2022,
    licensePlate: '30E-001.01',
    batteryLevel: 72,
    rangeKm: 90,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0195, currentLong: 105.8350,
    issueImages: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800',
    ],
    motorbikeDetails: {
      motorbikeType: MotorbikeType.SCOOTER,
      motorPowerW: 4000, batteryCapacityKwh: 2.4, maxSpeedKmh: 70,
      chargingTimeHour: 4, weightKg: 110, maxLoadKg: 140,
      hasHelmetStorage: true, hasUSBCharger: true, hasAntiLockBrakes: false, hasGPS: false,
      features: ['Cốp xe tiêu chuẩn', 'Đèn LED'],
    },
  },
  {
    vehicleCode: 'VIN-KLB-002',
    brand: 'VinFast',
    model: 'Klara E',
    color: 'Xanh Ngọc',
    year: 2023,
    licensePlate: '30E-002.02',
    batteryLevel: 88,
    rangeKm: 130,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0210, currentLong: 105.8360,
    issueImages: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800',
    ],
    motorbikeDetails: {
      motorbikeType: MotorbikeType.SCOOTER,
      motorPowerW: 4500, batteryCapacityKwh: 3.2, maxSpeedKmh: 80,
      chargingTimeHour: 4, weightKg: 112, maxLoadKg: 145,
      hasHelmetStorage: true, hasUSBCharger: true, hasAntiLockBrakes: true, hasGPS: true,
      features: ['Định vị GPS', 'Ứng dụng VinFast', 'Chống trộm thông minh'],
    },
  },
  {
    vehicleCode: 'VIN-VE-001',
    brand: 'VinFast',
    model: 'Vento',
    color: 'Bạc',
    year: 2023,
    licensePlate: '30E-003.03',
    batteryLevel: 55,
    rangeKm: 120,
    status: VehicleStatus.LOW_BATTERY,
    currentLat: 21.0450, currentLong: 105.7850,
    issueImages: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800',
    ],
    motorbikeDetails: {
      motorbikeType: MotorbikeType.SCOOTER,
      motorPowerW: 4800, batteryCapacityKwh: 3.37, maxSpeedKmh: 79,
      chargingTimeHour: 4, weightKg: 114, maxLoadKg: 140,
      hasHelmetStorage: true, hasUSBCharger: true, hasAntiLockBrakes: false, hasGPS: true,
      features: ['Màn hình LCD trung tâm', 'Chế độ tiết kiệm năng lượng'],
    },
  },
  {
    vehicleCode: 'SELEX-VB-001',
    brand: 'Selex',
    model: 'Camel-E',
    color: 'Đen',
    year: 2024,
    licensePlate: '30H-100.01',
    batteryLevel: 100,
    rangeKm: 105,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0090, currentLong: 105.8500,
    issueImages: [
      'https://images.unsplash.com/photo-1568772585407-9f6e7b42e8d6?w=800',
    ],
    motorbikeDetails: {
      motorbikeType: MotorbikeType.MANUAL,
      motorPowerW: 5000, batteryCapacityKwh: 3.6, maxSpeedKmh: 80,
      chargingTimeHour: 2.5, weightKg: 105, maxLoadKg: 160,
      hasHelmetStorage: false, hasUSBCharger: true, hasAntiLockBrakes: true, hasGPS: false,
      features: ['Pin thay thế nhanh 3 phút', 'Khung thép gia cường', 'Bảo hành pin 3 năm'],
    },
  },
  {
    vehicleCode: 'YADEA-G5-001',
    brand: 'Yadea',
    model: 'G5',
    color: 'Trắng Bạc',
    year: 2023,
    licensePlate: '30G-100.01',
    batteryLevel: 90,
    rangeKm: 150,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0370, currentLong: 105.7920,
    issueImages: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800',
    ],
    motorbikeDetails: {
      motorbikeType: MotorbikeType.SCOOTER,
      motorPowerW: 5000, batteryCapacityKwh: 3.2, maxSpeedKmh: 75,
      chargingTimeHour: 5, weightKg: 108, maxLoadKg: 150,
      hasHelmetStorage: true, hasUSBCharger: true, hasAntiLockBrakes: false, hasGPS: false,
      features: ['Màn hình TFT full HD', 'Cảm biến cân bằng', 'Pin graphene'],
    },
  },
  {
    vehicleCode: 'YADEA-EGALE-001',
    brand: 'Yadea',
    model: 'E8-S Eagle',
    color: 'Xanh Thể Thao',
    year: 2024,
    licensePlate: '30G-200.02',
    batteryLevel: 76,
    rangeKm: 200,
    status: VehicleStatus.AVAILABLE,
    currentLat: 21.0380, currentLong: 105.7910,
    issueImages: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    ],
    motorbikeDetails: {
      motorbikeType: MotorbikeType.SPORT,
      motorPowerW: 8000, batteryCapacityKwh: 5.0, maxSpeedKmh: 110,
      chargingTimeHour: 4, weightKg: 140, maxLoadKg: 170,
      hasHelmetStorage: false, hasUSBCharger: true, hasAntiLockBrakes: true, hasGPS: true,
      features: ['ABS kép', 'Chế độ Sport/Eco', 'Sạc nhanh 25A', 'App kết nối xe'],
    },
  },
];

// ─── Seeder ───────────────────────────────────────────────────────────────────

const seedVehicles = async () => {
  try {
    await AppDataSource.initialize();
    Logger.info('📦 Database connected for seeding vehicles...');

    let created = 0;
    let skipped = 0;

    const stations = await Station.find();
    if (stations.length === 0) {
      Logger.warn('⚠️ Không có trạm nào trong DB! Các xe sẽ không được gắn vào trạm. Hãy chạy "npm run seed:station" trước nếu muốn xe có trạm.');
    }

    // Hàm random trạm
    const getRandomStation = () => stations.length > 0 ? stations[Math.floor(Math.random() * stations.length)] : null;

    // ─── Seed Cars ───────────────────────────────────────────────────────────
    for (const data of carData) {
      const { carDetails: carDetailsData, ...vehicleData } = data;
      const existing = await Vehicle.findOneBy({ vehicleCode: vehicleData.vehicleCode });
      if (existing) {
        Logger.info(`⚠️ Vehicle ${vehicleData.vehicleCode} already exists. Skipping.`);
        skipped++;
        continue;
      }

      const randomStation = getRandomStation();
      const carDetails = AppDataSource.getRepository(CarDetails).create(carDetailsData);
      const vehicle = Vehicle.create({
        ...vehicleData,
        vehicleType: VehicleType.CAR,
        stationId: randomStation?.id,
        currentLat: randomStation ? randomStation.latitude : vehicleData.currentLat,
        currentLong: randomStation ? randomStation.longitude : vehicleData.currentLong,
        carDetails,
      }) as Vehicle;
      await Vehicle.save(vehicle);
      Logger.info(`✅ Created car: ${vehicleData.vehicleCode} (${vehicleData.brand} ${vehicleData.model}) ${randomStation ? `at Station: ${randomStation.stationName}` : ''}`);
      created++;
    }

    // ─── Seed Motorbikes ─────────────────────────────────────────────────────
    for (const data of motorbikeData) {
      const { motorbikeDetails: motorbikeDetailsData, ...vehicleData } = data;
      const existing = await Vehicle.findOneBy({ vehicleCode: vehicleData.vehicleCode });
      if (existing) {
        Logger.info(`⚠️ Vehicle ${vehicleData.vehicleCode} already exists. Skipping.`);
        skipped++;
        continue;
      }

      const randomStation = getRandomStation();
      const motorbikeDetails = AppDataSource.getRepository(MotorbikeDetails).create(motorbikeDetailsData);
      const vehicle = Vehicle.create({
        ...vehicleData,
        vehicleType: VehicleType.MOTORBIKE,
        stationId: randomStation?.id,
        currentLat: randomStation ? randomStation.latitude : vehicleData.currentLat,
        currentLong: randomStation ? randomStation.longitude : vehicleData.currentLong,
        motorbikeDetails,
      }) as Vehicle;
      await Vehicle.save(vehicle);
      Logger.info(`✅ Created motorbike: ${vehicleData.vehicleCode} (${vehicleData.brand} ${vehicleData.model}) ${randomStation ? `at Station: ${randomStation.stationName}` : ''}`);
      created++;
    }

    Logger.info(`\n🎉 Vehicle seeding complete! Created: ${created} | Skipped: ${skipped}`);
  } catch (error) {
    Logger.error('❌ Vehicle seeding failed:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
  }
};

seedVehicles();
