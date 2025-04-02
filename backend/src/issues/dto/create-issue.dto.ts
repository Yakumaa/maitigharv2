import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateIssueDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  assigned_province: string;

  @IsNotEmpty()
  @IsString()
  assigned_district: string;

  @IsOptional()
  @IsNumber()
  assigned_ward?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  @IsArray()
  imagePaths?: string[];

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsOptional()
  @IsString()
  reporter?: string;

  @IsNotEmpty()
  @IsString()
  reported_province: string;

  @IsNotEmpty()
  @IsString()
  reported_district: string;

  @IsOptional()
  @IsNumber()
  reported_ward?: number;
}
