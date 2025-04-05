import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: ['**/*.entity.ts'],
  synchronize: false,
  migrationsRun: true,
  migrationsTableName: 'migrations_maitighar',
  migrations: ['src/database/migrations/*-migration.ts'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
