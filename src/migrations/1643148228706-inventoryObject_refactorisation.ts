import {MigrationInterface, QueryRunner} from "typeorm";

export class inventoryObjectRefactorisation1643148228706 implements MigrationInterface {
    name = 'inventoryObjectRefactorisation1643148228706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`inventory_object\` (\`id_inventory\` int NOT NULL, \`id_object\` int NOT NULL, INDEX \`fk_inventory_Object_Object1_idx\` (\`id_object\`), INDEX \`fk_inventory_Object_inventory1_idx\` (\`id_inventory\`), PRIMARY KEY (\`id_inventory\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`inventory_object\` ADD CONSTRAINT \`FK_069ea2dce877893cda2d4619272\` FOREIGN KEY (\`id_inventory\`) REFERENCES \`inventory\`(\`id_inventory\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`inventory_object\` ADD CONSTRAINT \`FK_ee052f0d786dacb0f4f836d3fad\` FOREIGN KEY (\`id_object\`) REFERENCES \`object\`(\`id_object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`inventory_object\` DROP FOREIGN KEY \`FK_ee052f0d786dacb0f4f836d3fad\``);
        await queryRunner.query(`ALTER TABLE \`inventory_object\` DROP FOREIGN KEY \`FK_069ea2dce877893cda2d4619272\``);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP INDEX \`fk_inventory_Object_inventory1_idx\` ON \`inventory_object\``);
        await queryRunner.query(`DROP INDEX \`fk_inventory_Object_Object1_idx\` ON \`inventory_object\``);
        await queryRunner.query(`DROP TABLE \`inventory_object\``);
    }

}
