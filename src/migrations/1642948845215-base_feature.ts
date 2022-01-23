import {MigrationInterface, QueryRunner} from "typeorm";

export class baseFeature1642948845215 implements MigrationInterface {
    name = 'baseFeature1642948845215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`base_feature\` (\`id_base_feature\` int NOT NULL AUTO_INCREMENT, \`health\` int NOT NULL, \`mana\` int NOT NULL, \`armor\` int NOT NULL, \`attack\` int NOT NULL, \`attack_speed\` double NOT NULL DEFAULT '0.00', \`critical\` double NOT NULL DEFAULT '0.00', \`wisdom\` double NOT NULL DEFAULT '0.00', PRIMARY KEY (\`id_base_feature\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vocation\` ADD UNIQUE INDEX \`IDX_a20bf2c528cfb4712a13cd4996\` (\`id_base_feature\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a20bf2c528cfb4712a13cd4996\` ON \`vocation\` (\`id_base_feature\`)`);
        await queryRunner.query(`ALTER TABLE \`vocation\` ADD CONSTRAINT \`FK_a20bf2c528cfb4712a13cd49962\` FOREIGN KEY (\`id_base_feature\`) REFERENCES \`base_feature\`(\`id_base_feature\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vocation\` DROP FOREIGN KEY \`FK_a20bf2c528cfb4712a13cd49962\``);
        await queryRunner.query(`DROP INDEX \`REL_a20bf2c528cfb4712a13cd4996\` ON \`vocation\``);
        await queryRunner.query(`ALTER TABLE \`vocation\` DROP INDEX \`IDX_a20bf2c528cfb4712a13cd4996\``);
        await queryRunner.query(`DROP TABLE \`base_feature\``);
    }

}
