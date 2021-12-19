import {MigrationInterface, QueryRunner} from "typeorm";

export class userV31639940701778 implements MigrationInterface {
    name = 'userV31639940701778'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_addde50949464eeaefe11ad769` ON `user`", undefined);
        await queryRunner.query("DROP INDEX `fk_user_token_idx` ON `user`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `token`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `token` varchar(1000) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_a854e557b1b14814750c7c7b0c` (`token`)", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `fk_user_token_idx` ON `user` (`token`)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `fk_user_token_idx` ON `user`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_a854e557b1b14814750c7c7b0c`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `token`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `token` varchar(500) NULL", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `fk_user_token_idx` ON `user` (`token`)", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_addde50949464eeaefe11ad769` ON `user` (`id_address`)", undefined);
    }

}
