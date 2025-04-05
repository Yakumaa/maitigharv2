import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { IssueModule } from './issues/issues.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '**/*.entity{.ts,.js}'],
      synchronize: false,
      migrationsRun: true,
      migrationsTableName: 'migrations_maitighar',
      migrations: ['src/database/migrations/*-migration.{.ts,.js}'],
    }),
    IssueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
