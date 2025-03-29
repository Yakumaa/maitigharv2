import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743178773984 implements MigrationInterface {
    name = 'Migration1743178773984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "issue" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "assigned_province" character varying NOT NULL, "assigned_district" character varying NOT NULL, "assigned_ward" integer, "category" character varying, "location" character varying, "latitude" double precision, "longitude" double precision, "upvotes" integer NOT NULL DEFAULT '0', "status" character varying NOT NULL, "type" character varying NOT NULL, "imagePaths" text array, "createdBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "comments" text array, "resolvedAt" TIMESTAMP, "previousStatus" character varying, "modifiedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "modifiedUser" character varying, "reporter" character varying, CONSTRAINT "PK_f80e086c249b9f3f3ff2fd321b7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "issue"`);
    }

}
