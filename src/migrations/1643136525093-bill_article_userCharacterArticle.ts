import {MigrationInterface, QueryRunner} from "typeorm";

export class billArticleUserCharacterArticle1643136525093 implements MigrationInterface {
    name = 'billArticleUserCharacterArticle1643136525093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bill\` (\`id_bill\` int NOT NULL AUTO_INCREMENT, \`stripe_id\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`total_ttc\` double NOT NULL, \`promo\` double NOT NULL DEFAULT '0', \`date_create\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`date_update\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`id_user\` int NOT NULL, INDEX \`fk_bill_code_idx\` (\`code\`), INDEX \`fk_bill_user_idx\` (\`id_user\`), INDEX \`fk_bill_stripe_id_idx\` (\`stripe_id\`), PRIMARY KEY (\`id_bill\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`article\` (\`id_article\` int NOT NULL AUTO_INCREMENT, \`id_shop\` int NOT NULL, \`id_bill\` int NOT NULL, INDEX \`fk_article_shop_idx\` (\`id_shop\`), INDEX \`fk_article_bill_idx\` (\`id_bill\`), PRIMARY KEY (\`id_article\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_character_article\` (\`id_user\` int NOT NULL, \`id_article\` int NOT NULL, \`id_character\` int NULL, INDEX \`fk_user_character_article_user_idx\` (\`id_user\`), INDEX \`fk_user_character_article_character_idx\` (\`id_character\`), INDEX \`fk_user_character_article_article_idx\` (\`id_article\`), PRIMARY KEY (\`id_user\`, \`id_article\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`diamz\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`bill\` ADD CONSTRAINT \`FK_6498532ac094ed754c680d064e1\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id_user\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_6c723f4d2c80aa2af93f990ff93\` FOREIGN KEY (\`id_shop\`) REFERENCES \`shop\`(\`id_shop\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_0d62ea63b797b14b246157fc0a2\` FOREIGN KEY (\`id_bill\`) REFERENCES \`bill\`(\`id_bill\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`user_character_article\` ADD CONSTRAINT \`FK_8760ae75a42b12511aa33301025\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id_user\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`user_character_article\` ADD CONSTRAINT \`FK_e554e4b570461218853b6a06512\` FOREIGN KEY (\`id_article\`) REFERENCES \`article\`(\`id_article\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`user_character_article\` ADD CONSTRAINT \`FK_688ead63a177f8cd1000bb6e906\` FOREIGN KEY (\`id_character\`) REFERENCES \`character\`(\`id_character\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_character_article\` DROP FOREIGN KEY \`FK_688ead63a177f8cd1000bb6e906\``);
        await queryRunner.query(`ALTER TABLE \`user_character_article\` DROP FOREIGN KEY \`FK_e554e4b570461218853b6a06512\``);
        await queryRunner.query(`ALTER TABLE \`user_character_article\` DROP FOREIGN KEY \`FK_8760ae75a42b12511aa33301025\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_0d62ea63b797b14b246157fc0a2\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_6c723f4d2c80aa2af93f990ff93\``);
        await queryRunner.query(`ALTER TABLE \`bill\` DROP FOREIGN KEY \`FK_6498532ac094ed754c680d064e1\``);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`diamz\``);
        await queryRunner.query(`DROP INDEX \`fk_user_character_article_article_idx\` ON \`user_character_article\``);
        await queryRunner.query(`DROP INDEX \`fk_user_character_article_character_idx\` ON \`user_character_article\``);
        await queryRunner.query(`DROP INDEX \`fk_user_character_article_user_idx\` ON \`user_character_article\``);
        await queryRunner.query(`DROP TABLE \`user_character_article\``);
        await queryRunner.query(`DROP INDEX \`fk_article_bill_idx\` ON \`article\``);
        await queryRunner.query(`DROP INDEX \`fk_article_shop_idx\` ON \`article\``);
        await queryRunner.query(`DROP TABLE \`article\``);
        await queryRunner.query(`DROP INDEX \`fk_bill_stripe_id_idx\` ON \`bill\``);
        await queryRunner.query(`DROP INDEX \`fk_bill_user_idx\` ON \`bill\``);
        await queryRunner.query(`DROP INDEX \`fk_bill_code_idx\` ON \`bill\``);
        await queryRunner.query(`DROP TABLE \`bill\``);
    }

}
