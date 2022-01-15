import { MigrationInterface, QueryRunner } from "typeorm";

export class userV11639940186650 implements MigrationInterface {
  name = "userV11639940186650";

  public async up(queryRunner: QueryRunner): Promise<any> {
    // await queryRunner.query("DROP INDEX `IDX_a2deb244eda661a007db72f0db` ON `user`", undefined);
    await queryRunner.query("ALTER TABLE `user` DROP COLUMN `token`", undefined);
    await queryRunner.query("ALTER TABLE `user` ADD `token` varchar(500) NULL", undefined);
    await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_a854e557b1b14814750c7c7b0c` (`token`)", undefined);
    await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_a2deb244eda661a007db72f0db` (`refresh_token`)", undefined);
    await queryRunner.query("CREATE UNIQUE INDEX `fk_user_token_idx` ON `user` (`token`)", undefined);
    await queryRunner.query("CREATE UNIQUE INDEX `fk_user_refresh_token_idx` ON `user` (`refresh_token`)", undefined);
    await queryRunner.query(
      "ALTER TABLE `user` ADD CONSTRAINT `FK_addde50949464eeaefe11ad7690` FOREIGN KEY (`id_address`) REFERENCES `address`(`id_address`) ON DELETE CASCADE ON UPDATE CASCADE",
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_addde50949464eeaefe11ad7690`", undefined);
    await queryRunner.query("DROP INDEX `fk_user_refresh_token_idx` ON `user`", undefined);
    await queryRunner.query("DROP INDEX `fk_user_token_idx` ON `user`", undefined);
    // await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_a2deb244eda661a007db72f0db`", undefined);
    await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_a854e557b1b14814750c7c7b0c`", undefined);
    await queryRunner.query("ALTER TABLE `user` DROP COLUMN `token`", undefined);
    await queryRunner.query("ALTER TABLE `user` ADD `token` text NULL", undefined);
    await queryRunner.query("CREATE UNIQUE INDEX `IDX_a2deb244eda661a007db72f0db` ON `user` (`refresh_token`)", undefined);
  }
}
