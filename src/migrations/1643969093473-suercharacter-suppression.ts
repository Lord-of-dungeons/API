import {MigrationInterface, QueryRunner} from "typeorm";

export class suercharacterSuppression1643969093473 implements MigrationInterface {
    name = 'suercharacterSuppression1643969093473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0'`);
    }

}
