import {MigrationInterface, QueryRunner} from "typeorm";

export class object1642950731413 implements MigrationInterface {
    name = 'object1642950731413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`inventory_Object\` DROP FOREIGN KEY \`FK_27bc489b7e9e0097b88895cf106\``);
        await queryRunner.query(`ALTER TABLE \`loot_dungeon_session\` DROP FOREIGN KEY \`FK_b89a696db81b2395ee236303e26\``);
        await queryRunner.query(`ALTER TABLE \`monster_loot\` DROP FOREIGN KEY \`FK_c9a469425b174823c97e1b9ef1c\``);
        await queryRunner.query(`ALTER TABLE \`Object_type\` DROP FOREIGN KEY \`FK_f5e3a3ff08db9a1b36677469c96\``);
        await queryRunner.query(`DROP INDEX \`fk_inventory_Object_Object1_idx\` ON \`inventory_Object\``);
        await queryRunner.query(`DROP INDEX \`fk_loot_dungeon_session_Object1_idx\` ON \`loot_dungeon_session\``);
        await queryRunner.query(`DROP INDEX \`fk_monster_loot_Object1_idx\` ON \`monster_loot\``);
        await queryRunner.query(`DROP INDEX \`fk_Object_type_Object1_idx\` ON \`Object_type\``);
        await queryRunner.query(`DROP INDEX \`IDX_22e032f7eee5cd2977601dda03\` ON \`monster\``);
        await queryRunner.query(`ALTER TABLE \`inventory_Object\` CHANGE \`id_Object\` \`id_object\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`loot_dungeon_session\` CHANGE \`id_Object\` \`id_object\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`monster_loot\` CHANGE \`id_Object\` \`id_object\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Object_type\` CHANGE \`id_Object\` \`id_object\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Object\` CHANGE \`id_Object\` \`id_object\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`CREATE INDEX \`fk_inventory_Object_Object1_idx\` ON \`inventory_Object\` (\`id_object\`)`);
        await queryRunner.query(`CREATE INDEX \`fk_loot_dungeon_session_Object1_idx\` ON \`loot_dungeon_session\` (\`id_object\`)`);
        await queryRunner.query(`CREATE INDEX \`fk_monster_loot_Object1_idx\` ON \`monster_loot\` (\`id_object\`)`);
        await queryRunner.query(`CREATE INDEX \`fk_Object_type_Object1_idx\` ON \`Object_type\` (\`id_object\`)`);
        await queryRunner.query(`ALTER TABLE \`inventory_Object\` ADD CONSTRAINT \`FK_1a33c7f26535cbcd1f0cddc1b18\` FOREIGN KEY (\`id_object\`) REFERENCES \`Object\`(\`id_object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`loot_dungeon_session\` ADD CONSTRAINT \`FK_6851b2787a596476401cea61fc6\` FOREIGN KEY (\`id_object\`) REFERENCES \`Object\`(\`id_object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`monster_loot\` ADD CONSTRAINT \`FK_2083021fbc07e585febf4793354\` FOREIGN KEY (\`id_object\`) REFERENCES \`Object\`(\`id_object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Object_type\` ADD CONSTRAINT \`FK_0e69177835cb910eecebbc2abe1\` FOREIGN KEY (\`id_object\`) REFERENCES \`Object\`(\`id_object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Object_type\` DROP FOREIGN KEY \`FK_0e69177835cb910eecebbc2abe1\``);
        await queryRunner.query(`ALTER TABLE \`monster_loot\` DROP FOREIGN KEY \`FK_2083021fbc07e585febf4793354\``);
        await queryRunner.query(`ALTER TABLE \`loot_dungeon_session\` DROP FOREIGN KEY \`FK_6851b2787a596476401cea61fc6\``);
        await queryRunner.query(`ALTER TABLE \`inventory_Object\` DROP FOREIGN KEY \`FK_1a33c7f26535cbcd1f0cddc1b18\``);
        await queryRunner.query(`DROP INDEX \`fk_Object_type_Object1_idx\` ON \`Object_type\``);
        await queryRunner.query(`DROP INDEX \`fk_monster_loot_Object1_idx\` ON \`monster_loot\``);
        await queryRunner.query(`DROP INDEX \`fk_loot_dungeon_session_Object1_idx\` ON \`loot_dungeon_session\``);
        await queryRunner.query(`DROP INDEX \`fk_inventory_Object_Object1_idx\` ON \`inventory_Object\``);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Object\` CHANGE \`id_object\` \`id_Object\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`Object_type\` CHANGE \`id_object\` \`id_Object\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`monster_loot\` CHANGE \`id_object\` \`id_Object\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`loot_dungeon_session\` CHANGE \`id_object\` \`id_Object\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`inventory_Object\` CHANGE \`id_object\` \`id_Object\` int NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_22e032f7eee5cd2977601dda03\` ON \`monster\` (\`id_base_feature\`)`);
        await queryRunner.query(`CREATE INDEX \`fk_Object_type_Object1_idx\` ON \`Object_type\` (\`id_Object\`)`);
        await queryRunner.query(`CREATE INDEX \`fk_monster_loot_Object1_idx\` ON \`monster_loot\` (\`id_Object\`)`);
        await queryRunner.query(`CREATE INDEX \`fk_loot_dungeon_session_Object1_idx\` ON \`loot_dungeon_session\` (\`id_Object\`)`);
        await queryRunner.query(`CREATE INDEX \`fk_inventory_Object_Object1_idx\` ON \`inventory_Object\` (\`id_Object\`)`);
        await queryRunner.query(`ALTER TABLE \`Object_type\` ADD CONSTRAINT \`FK_f5e3a3ff08db9a1b36677469c96\` FOREIGN KEY (\`id_Object\`) REFERENCES \`Object\`(\`id_Object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`monster_loot\` ADD CONSTRAINT \`FK_c9a469425b174823c97e1b9ef1c\` FOREIGN KEY (\`id_Object\`) REFERENCES \`Object\`(\`id_Object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`loot_dungeon_session\` ADD CONSTRAINT \`FK_b89a696db81b2395ee236303e26\` FOREIGN KEY (\`id_Object\`) REFERENCES \`Object\`(\`id_Object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`inventory_Object\` ADD CONSTRAINT \`FK_27bc489b7e9e0097b88895cf106\` FOREIGN KEY (\`id_Object\`) REFERENCES \`Object\`(\`id_Object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
