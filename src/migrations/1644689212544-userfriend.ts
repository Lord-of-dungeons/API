import {MigrationInterface, QueryRunner} from "typeorm";

export class userfriend1644689212544 implements MigrationInterface {
    name = 'userfriend1644689212544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_friends\` DROP FOREIGN KEY \`FK_d118e41e4a27e5dd25763179d33\``);
        await queryRunner.query(`ALTER TABLE \`user_friends\` DROP COLUMN \`pseudo\``);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user_friends\` ADD \`pseudo\` varchar(45) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_friends\` ADD CONSTRAINT \`FK_d118e41e4a27e5dd25763179d33\` FOREIGN KEY (\`pseudo\`) REFERENCES \`user\`(\`pseudo\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

}
