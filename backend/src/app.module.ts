import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IssueModule } from './issues/issues.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Add this to make config available everywhere
      envFilePath: '.env', // Explicitly specify the .env file path
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Fixed path
        synchronize: false,
        migrationsRun: true,
        migrationsTableName: 'migrations_maitighar',
        migrations: ['src/database/migrations/*-migration.ts'],
      }),
      inject: [ConfigService],

      // type: 'postgres',
      // host: 'localhost',
      // port: Number(process.env.DB_PORT),
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,
      // entities: [__dirname + '**/*.entity{.ts,.js}'],
      // synchronize: false,
      // migrationsRun: true,
      // migrationsTableName: 'migrations_maitighar',
      // migrations: ['src/database/migrations/*-migration.ts'],
    }),
    IssueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
