import {MigrationInterface, QueryRunner} from "typeorm";

export class debug1643982583447 implements MigrationInterface {
    name = 'debug1643982583447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`vocation\` DROP FOREIGN KEY \`FK_bb3c94df0e4f4f3bdce6329dc3b\``);
        await queryRunner.query(`ALTER TABLE \`vocation\` ADD UNIQUE INDEX \`IDX_bb3c94df0e4f4f3bdce6329dc3\` (\`id_vocation_appearance\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_bb3c94df0e4f4f3bdce6329dc3\` ON \`vocation\` (\`id_vocation_appearance\`)`);
        await queryRunner.query(`ALTER TABLE \`vocation\` ADD CONSTRAINT \`FK_bb3c94df0e4f4f3bdce6329dc3b\` FOREIGN KEY (\`id_vocation_appearance\`) REFERENCES \`vocation_appearance\`(\`id_vocation_appearance\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vocation\` DROP FOREIGN KEY \`FK_bb3c94df0e4f4f3bdce6329dc3b\``);
        await queryRunner.query(`DROP INDEX \`REL_bb3c94df0e4f4f3bdce6329dc3\` ON \`vocation\``);
        await queryRunner.query(`ALTER TABLE \`vocation\` DROP INDEX \`IDX_bb3c94df0e4f4f3bdce6329dc3\``);
        await queryRunner.query(`ALTER TABLE \`vocation\` ADD CONSTRAINT \`FK_bb3c94df0e4f4f3bdce6329dc3b\` FOREIGN KEY (\`id_vocation_appearance\`) REFERENCES \`vocation_appearance\`(\`id_vocation_appearance\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0'`);
    }

}
