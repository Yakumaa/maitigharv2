import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  assigned_province: string;

  @Column()
  assigned_district: string;

  @Column({ nullable: true })
  assigned_ward: number;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @Column({ default: 0 })
  upvotes: number;

  @Column()
  status: string;

  @Column()
  type: string;

  @Column('text', { array: true, nullable: true })
  imagePaths: string[];

  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('text', { array: true, nullable: true })
  comments: string[];

  @Column({ nullable: true })
  resolvedAt: Date;

  @Column({ nullable: true })
  previousStatus: string;

  @UpdateDateColumn()
  modifiedDate: Date;

  @Column({ nullable: true })
  deletedDate: Date;

  @Column({ nullable: true })
  modifiedUser: string;

  @Column({ nullable: true })
  reporter: string;

  @Column()
  reported_province: string;

  @Column()
  reported_district: string;

  @Column({ nullable: true })
  reported_ward: number;
}
