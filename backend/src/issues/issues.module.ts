import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './issues.entity';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';

@Module({
  imports: [TypeOrmModule.forFeature([Issue])],
  providers: [IssuesService],
  controllers: [IssuesController],
})
export class IssueModule {}
