import {MigrationInterface, QueryRunner} from "typeorm";

export class userV21639940450749 implements MigrationInterface {
    name = 'userV21639940450749'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_a854e557b1b14814750c7c7b0c` ON `user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_a2deb244eda661a007db72f0db` ON `user`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_addde50949464eeaefe11ad7690`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_addde50949464eeaefe11ad769` (`id_address`)", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `REL_addde50949464eeaefe11ad769` ON `user` (`id_address`)", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_addde50949464eeaefe11ad7690` FOREIGN KEY (`id_address`) REFERENCES `address`(`id_address`) ON DELETE CASCADE ON UPDATE CASCADE", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_addde50949464eeaefe11ad7690`", undefined);
        await queryRunner.query("DROP INDEX `REL_addde50949464eeaefe11ad769` ON `user`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_addde50949464eeaefe11ad769`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_addde50949464eeaefe11ad7690` FOREIGN KEY (`id_address`) REFERENCES `address`(`id_address`) ON DELETE CASCADE ON UPDATE CASCADE", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_a2deb244eda661a007db72f0db` ON `user` (`refresh_token`)", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_a854e557b1b14814750c7c7b0c` ON `user` (`token`)", undefined);
    }

}
