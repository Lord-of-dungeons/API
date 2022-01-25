import {MigrationInterface, QueryRunner} from "typeorm";

export class objectRefactorisation1643148002696 implements MigrationInterface {
    name = 'objectRefactorisation1643148002696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`inventory_Object\` DROP FOREIGN KEY \`FK_1a33c7f26535cbcd1f0cddc1b18\``);
        await queryRunner.query(`ALTER TABLE \`loot_dungeon_session\` DROP FOREIGN KEY \`FK_6851b2787a596476401cea61fc6\``);
        await queryRunner.query(`ALTER TABLE \`monster_loot\` DROP FOREIGN KEY \`FK_2083021fbc07e585febf4793354\``);
        await queryRunner.query(`CREATE TABLE \`object_type\` (\`base\` int NOT NULL, \`id_object\` int NOT NULL, \`id_type\` int NOT NULL, INDEX \`fk_Object_type_type1_idx\` (\`id_type\`), INDEX \`fk_Object_type_Object1_idx\` (\`id_object\`), PRIMARY KEY (\`id_object\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`object\` (\`id_object\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`img_path\` varchar(255) NOT NULL, \`id_type\` int NOT NULL, \`price\` int NOT NULL DEFAULT '1', INDEX \`fk_Object_type1_idx\` (\`id_type\`), PRIMARY KEY (\`id_object\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`inventory_Object\` ADD CONSTRAINT \`FK_1a33c7f26535cbcd1f0cddc1b18\` FOREIGN KEY (\`id_object\`) REFERENCES \`object\`(\`id_object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`loot_dungeon_session\` ADD CONSTRAINT \`FK_6851b2787a596476401cea61fc6\` FOREIGN KEY (\`id_object\`) REFERENCES \`object\`(\`id_object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`monster_loot\` ADD CONSTRAINT \`FK_2083021fbc07e585febf4793354\` FOREIGN KEY (\`id_object\`) REFERENCES \`object\`(\`id_object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`object_type\` ADD CONSTRAINT \`FK_9f35ddf438f7821259dc870843f\` FOREIGN KEY (\`id_object\`) REFERENCES \`object\`(\`id_object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`object_type\` ADD CONSTRAINT \`FK_514cfce2017357419ed7519042d\` FOREIGN KEY (\`id_type\`) REFERENCES \`type\`(\`id_type\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`object\` ADD CONSTRAINT \`FK_df30d18c6c83f6472d308b79a25\` FOREIGN KEY (\`id_type\`) REFERENCES \`type\`(\`id_type\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`object\` DROP FOREIGN KEY \`FK_df30d18c6c83f6472d308b79a25\``);
        await queryRunner.query(`ALTER TABLE \`object_type\` DROP FOREIGN KEY \`FK_514cfce2017357419ed7519042d\``);
        await queryRunner.query(`ALTER TABLE \`object_type\` DROP FOREIGN KEY \`FK_9f35ddf438f7821259dc870843f\``);
        await queryRunner.query(`ALTER TABLE \`monster_loot\` DROP FOREIGN KEY \`FK_2083021fbc07e585febf4793354\``);
        await queryRunner.query(`ALTER TABLE \`loot_dungeon_session\` DROP FOREIGN KEY \`FK_6851b2787a596476401cea61fc6\``);
        await queryRunner.query(`ALTER TABLE \`inventory_Object\` DROP FOREIGN KEY \`FK_1a33c7f26535cbcd1f0cddc1b18\``);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP INDEX \`fk_Object_type1_idx\` ON \`object\``);
        await queryRunner.query(`DROP TABLE \`object\``);
        await queryRunner.query(`DROP INDEX \`fk_Object_type_Object1_idx\` ON \`object_type\``);
        await queryRunner.query(`DROP INDEX \`fk_Object_type_type1_idx\` ON \`object_type\``);
        await queryRunner.query(`DROP TABLE \`object_type\``);
        await queryRunner.query(`ALTER TABLE \`monster_loot\` ADD CONSTRAINT \`FK_2083021fbc07e585febf4793354\` FOREIGN KEY (\`id_object\`) REFERENCES \`Object\`(\`id_object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`loot_dungeon_session\` ADD CONSTRAINT \`FK_6851b2787a596476401cea61fc6\` FOREIGN KEY (\`id_object\`) REFERENCES \`Object\`(\`id_object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`inventory_Object\` ADD CONSTRAINT \`FK_1a33c7f26535cbcd1f0cddc1b18\` FOREIGN KEY (\`id_object\`) REFERENCES \`Object\`(\`id_object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
