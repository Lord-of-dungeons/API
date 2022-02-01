import {MigrationInterface, QueryRunner} from "typeorm";

export class appearance1643705006253 implements MigrationInterface {
    name = 'appearance1643705006253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`monster\` DROP FOREIGN KEY \`FK_d2fa6cdbeaf5017c720658c1549\``);
        await queryRunner.query(`DROP INDEX \`fk_monster_monster_appearence1_idx\` ON \`monster\``);
        await queryRunner.query(`ALTER TABLE \`monster\` CHANGE \`id_monster_appearence\` \`id_monster_appearance\` int NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`monster_appearance\` (\`id_monster_appearance\` int NOT NULL AUTO_INCREMENT, \`img_path\` varchar(255) NOT NULL, \`version\` int NOT NULL, \`date_create\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`date_update\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`id_game_animation\` int NULL, INDEX \`fk_monster_appearance_game_animation1_idx\` (\`id_game_animation\`), PRIMARY KEY (\`id_monster_appearance\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`ultimate\` CHANGE \`version\` \`version\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vocation_appearance\` CHANGE \`version\` \`version\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dungeon\` CHANGE \`version\` \`version\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vocation\` CHANGE \`version\` \`version\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`power\` CHANGE \`version\` \`version\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`monster\` CHANGE \`version\` \`version\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`special_feature\` CHANGE \`version\` \`version\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`shop\` CHANGE \`version\` \`version\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`special_shop\` CHANGE \`version\` \`version\` int NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`fk_monster_monster_appearance1_idx\` ON \`monster\` (\`id_monster_appearance\`)`);
        await queryRunner.query(`ALTER TABLE \`monster_appearance\` ADD CONSTRAINT \`FK_4b1082040ce7956322dedce081d\` FOREIGN KEY (\`id_game_animation\`) REFERENCES \`game_animation\`(\`id_game_animation\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`monster\` ADD CONSTRAINT \`FK_34058b3d446d372cc6e338ac303\` FOREIGN KEY (\`id_monster_appearance\`) REFERENCES \`monster_appearance\`(\`id_monster_appearance\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`monster\` DROP FOREIGN KEY \`FK_34058b3d446d372cc6e338ac303\``);
        await queryRunner.query(`ALTER TABLE \`monster_appearance\` DROP FOREIGN KEY \`FK_4b1082040ce7956322dedce081d\``);
        await queryRunner.query(`DROP INDEX \`fk_monster_monster_appearance1_idx\` ON \`monster\``);
        await queryRunner.query(`ALTER TABLE \`special_shop\` CHANGE \`version\` \`version\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`shop\` CHANGE \`version\` \`version\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`special_feature\` CHANGE \`version\` \`version\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`monster\` CHANGE \`version\` \`version\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`power\` CHANGE \`version\` \`version\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`vocation\` CHANGE \`version\` \`version\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`dungeon\` CHANGE \`version\` \`version\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`vocation_appearance\` CHANGE \`version\` \`version\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`ultimate\` CHANGE \`version\` \`version\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP INDEX \`fk_monster_appearance_game_animation1_idx\` ON \`monster_appearance\``);
        await queryRunner.query(`DROP TABLE \`monster_appearance\``);
        await queryRunner.query(`ALTER TABLE \`monster\` CHANGE \`id_monster_appearance\` \`id_monster_appearence\` int NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`fk_monster_monster_appearence1_idx\` ON \`monster\` (\`id_monster_appearence\`)`);
        await queryRunner.query(`ALTER TABLE \`monster\` ADD CONSTRAINT \`FK_d2fa6cdbeaf5017c720658c1549\` FOREIGN KEY (\`id_monster_appearence\`) REFERENCES \`monster_appearence\`(\`id_monster_appearence\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
