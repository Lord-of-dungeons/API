import {MigrationInterface, QueryRunner} from "typeorm";

export class debug31643983326197 implements MigrationInterface {
    name = 'debug31643983326197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vocation_appearance\` DROP FOREIGN KEY \`FK_387d9274894f4c6d235f534dc8f\``);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`vocation_appearance\` ADD CONSTRAINT \`FK_387d9274894f4c6d235f534dc8f\` FOREIGN KEY (\`id_game_animation\`) REFERENCES \`game_animation\`(\`id_game_animation\`) ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vocation_appearance\` DROP FOREIGN KEY \`FK_387d9274894f4c6d235f534dc8f\``);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`vocation_appearance\` ADD CONSTRAINT \`FK_387d9274894f4c6d235f534dc8f\` FOREIGN KEY (\`id_game_animation\`) REFERENCES \`game_animation\`(\`id_game_animation\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

}
