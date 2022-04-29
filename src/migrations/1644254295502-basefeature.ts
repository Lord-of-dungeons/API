import {MigrationInterface, QueryRunner} from "typeorm";

export class basefeature1644254295502 implements MigrationInterface {
    name = 'basefeature1644254295502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vocation\` DROP FOREIGN KEY \`FK_a20bf2c528cfb4712a13cd49962\``);
        await queryRunner.query(`ALTER TABLE \`vocation\` DROP FOREIGN KEY \`FK_cf2726e85fe94b72ddf75be305f\``);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`equipment\` ADD UNIQUE INDEX \`IDX_1e691247de73d345b4c48f3ad3\` (\`id_base_feature\`)`);
        await queryRunner.query(`CREATE INDEX \`fk_equipment_base_feature1_idx\` ON \`equipment\` (\`id_base_feature\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_1e691247de73d345b4c48f3ad3\` ON \`equipment\` (\`id_base_feature\`)`);
        await queryRunner.query(`ALTER TABLE \`vocation\` ADD CONSTRAINT \`FK_cf2726e85fe94b72ddf75be305f\` FOREIGN KEY (\`id_ultimate\`) REFERENCES \`ultimate\`(\`id_ultimate\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`vocation\` ADD CONSTRAINT \`FK_a20bf2c528cfb4712a13cd49962\` FOREIGN KEY (\`id_base_feature\`) REFERENCES \`base_feature\`(\`id_base_feature\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`equipment\` ADD CONSTRAINT \`FK_1e691247de73d345b4c48f3ad36\` FOREIGN KEY (\`id_base_feature\`) REFERENCES \`base_feature\`(\`id_base_feature\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`equipment\` DROP FOREIGN KEY \`FK_1e691247de73d345b4c48f3ad36\``);
        await queryRunner.query(`ALTER TABLE \`vocation\` DROP FOREIGN KEY \`FK_a20bf2c528cfb4712a13cd49962\``);
        await queryRunner.query(`ALTER TABLE \`vocation\` DROP FOREIGN KEY \`FK_cf2726e85fe94b72ddf75be305f\``);
        await queryRunner.query(`DROP INDEX \`REL_1e691247de73d345b4c48f3ad3\` ON \`equipment\``);
        await queryRunner.query(`DROP INDEX \`fk_equipment_base_feature1_idx\` ON \`equipment\``);
        await queryRunner.query(`ALTER TABLE \`equipment\` DROP INDEX \`IDX_1e691247de73d345b4c48f3ad3\``);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`vocation\` ADD CONSTRAINT \`FK_cf2726e85fe94b72ddf75be305f\` FOREIGN KEY (\`id_ultimate\`) REFERENCES \`ultimate\`(\`id_ultimate\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`vocation\` ADD CONSTRAINT \`FK_a20bf2c528cfb4712a13cd49962\` FOREIGN KEY (\`id_base_feature\`) REFERENCES \`base_feature\`(\`id_base_feature\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

}
