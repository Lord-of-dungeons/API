import {MigrationInterface, QueryRunner} from "typeorm";

export class restrict1643972807659 implements MigrationInterface {
    name = 'restrict1643972807659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ultimate\` DROP FOREIGN KEY \`FK_d9c535f6fb439b973fe2d9a7d04\``);
        await queryRunner.query(`ALTER TABLE \`vocation_appearance\` DROP FOREIGN KEY \`FK_387d9274894f4c6d235f534dc8f\``);
        await queryRunner.query(`ALTER TABLE \`vocation\` DROP FOREIGN KEY \`FK_a20bf2c528cfb4712a13cd49962\``);
        await queryRunner.query(`ALTER TABLE \`vocation\` DROP FOREIGN KEY \`FK_bb3c94df0e4f4f3bdce6329dc3b\``);
        await queryRunner.query(`ALTER TABLE \`vocation\` DROP FOREIGN KEY \`FK_cf2726e85fe94b72ddf75be305f\``);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`ultimate\` ADD CONSTRAINT \`FK_d9c535f6fb439b973fe2d9a7d04\` FOREIGN KEY (\`id_game_animation\`) REFERENCES \`game_animation\`(\`id_game_animation\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`vocation_appearance\` ADD CONSTRAINT \`FK_387d9274894f4c6d235f534dc8f\` FOREIGN KEY (\`id_game_animation\`) REFERENCES \`game_animation\`(\`id_game_animation\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`vocation\` ADD CONSTRAINT \`FK_cf2726e85fe94b72ddf75be305f\` FOREIGN KEY (\`id_ultimate\`) REFERENCES \`ultimate\`(\`id_ultimate\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`vocation\` ADD CONSTRAINT \`FK_bb3c94df0e4f4f3bdce6329dc3b\` FOREIGN KEY (\`id_vocation_appearance\`) REFERENCES \`vocation_appearance\`(\`id_vocation_appearance\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`vocation\` ADD CONSTRAINT \`FK_a20bf2c528cfb4712a13cd49962\` FOREIGN KEY (\`id_base_feature\`) REFERENCES \`base_feature\`(\`id_base_feature\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vocation\` DROP FOREIGN KEY \`FK_a20bf2c528cfb4712a13cd49962\``);
        await queryRunner.query(`ALTER TABLE \`vocation\` DROP FOREIGN KEY \`FK_bb3c94df0e4f4f3bdce6329dc3b\``);
        await queryRunner.query(`ALTER TABLE \`vocation\` DROP FOREIGN KEY \`FK_cf2726e85fe94b72ddf75be305f\``);
        await queryRunner.query(`ALTER TABLE \`vocation_appearance\` DROP FOREIGN KEY \`FK_387d9274894f4c6d235f534dc8f\``);
        await queryRunner.query(`ALTER TABLE \`ultimate\` DROP FOREIGN KEY \`FK_d9c535f6fb439b973fe2d9a7d04\``);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`vocation\` ADD CONSTRAINT \`FK_cf2726e85fe94b72ddf75be305f\` FOREIGN KEY (\`id_ultimate\`) REFERENCES \`ultimate\`(\`id_ultimate\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`vocation\` ADD CONSTRAINT \`FK_bb3c94df0e4f4f3bdce6329dc3b\` FOREIGN KEY (\`id_vocation_appearance\`) REFERENCES \`vocation_appearance\`(\`id_vocation_appearance\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`vocation\` ADD CONSTRAINT \`FK_a20bf2c528cfb4712a13cd49962\` FOREIGN KEY (\`id_base_feature\`) REFERENCES \`base_feature\`(\`id_base_feature\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`vocation_appearance\` ADD CONSTRAINT \`FK_387d9274894f4c6d235f534dc8f\` FOREIGN KEY (\`id_game_animation\`) REFERENCES \`game_animation\`(\`id_game_animation\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ultimate\` ADD CONSTRAINT \`FK_d9c535f6fb439b973fe2d9a7d04\` FOREIGN KEY (\`id_game_animation\`) REFERENCES \`game_animation\`(\`id_game_animation\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
