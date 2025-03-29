import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743220034421 implements MigrationInterface {
    name = 'Migration1743220034421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "issue" ADD "reported_province" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "issue" ADD "reported_district" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "issue" ADD "reported_ward" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "issue" DROP COLUMN "reported_ward"`);
        await queryRunner.query(`ALTER TABLE "issue" DROP COLUMN "reported_district"`);
        await queryRunner.query(`ALTER TABLE "issue" DROP COLUMN "reported_province"`);
    }

}
