import {MigrationInterface, QueryRunner} from "typeorm";

export class userV61640199861754 implements MigrationInterface {
    name = 'userV61640199861754'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `number_pseudo_changed` int NOT NULL DEFAULT '1'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `number_pseudo_changed`", undefined);
    }

}
