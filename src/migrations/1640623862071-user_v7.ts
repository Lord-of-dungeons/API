import {MigrationInterface, QueryRunner} from "typeorm";

export class userV71640623862071 implements MigrationInterface {
    name = 'userV71640623862071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('USER', 'ADMIN', 'EMPLOYEE') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('USER', 'ADMIN') NOT NULL`);
    }

}
