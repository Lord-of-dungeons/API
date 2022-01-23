import {MigrationInterface, QueryRunner} from "typeorm";

export class baseFeatureIndex1642948914765 implements MigrationInterface {
    name = 'baseFeatureIndex1642948914765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a20bf2c528cfb4712a13cd4996\` ON \`vocation\``);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`CREATE INDEX \`fk_vocation_base_feature1_idx\` ON \`vocation\` (\`id_base_feature\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`fk_vocation_base_feature1_idx\` ON \`vocation\``);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a20bf2c528cfb4712a13cd4996\` ON \`vocation\` (\`id_base_feature\`)`);
    }

}
