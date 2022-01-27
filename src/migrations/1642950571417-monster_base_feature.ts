import {MigrationInterface, QueryRunner} from "typeorm";

export class monsterBaseFeature1642950571417 implements MigrationInterface {
    name = 'monsterBaseFeature1642950571417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`monster\` DROP COLUMN \`base\``);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`monster\` ADD UNIQUE INDEX \`IDX_22e032f7eee5cd2977601dda03\` (\`id_base_feature\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_22e032f7eee5cd2977601dda03\` ON \`monster\` (\`id_base_feature\`)`);
        await queryRunner.query(`ALTER TABLE \`monster\` ADD CONSTRAINT \`FK_22e032f7eee5cd2977601dda032\` FOREIGN KEY (\`id_base_feature\`) REFERENCES \`base_feature\`(\`id_base_feature\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`monster\` DROP FOREIGN KEY \`FK_22e032f7eee5cd2977601dda032\``);
        await queryRunner.query(`DROP INDEX \`REL_22e032f7eee5cd2977601dda03\` ON \`monster\``);
        await queryRunner.query(`ALTER TABLE \`monster\` DROP INDEX \`IDX_22e032f7eee5cd2977601dda03\``);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`monster\` ADD \`base\` double NOT NULL DEFAULT '1'`);
    }

}
