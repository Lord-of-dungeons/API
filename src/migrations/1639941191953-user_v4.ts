import {MigrationInterface, QueryRunner} from "typeorm";

export class userV41639941191953 implements MigrationInterface {
    name = 'userV41639941191953'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_addde50949464eeaefe11ad7690`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_addde50949464eeaefe11ad7690` FOREIGN KEY (`id_address`) REFERENCES `address`(`id_address`) ON DELETE SET NULL ON UPDATE CASCADE", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_addde50949464eeaefe11ad7690`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_addde50949464eeaefe11ad7690` FOREIGN KEY (`id_address`) REFERENCES `address`(`id_address`) ON DELETE CASCADE ON UPDATE CASCADE", undefined);
    }

}
