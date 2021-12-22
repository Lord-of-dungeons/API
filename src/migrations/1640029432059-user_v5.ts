import { MigrationInterface, QueryRunner } from "typeorm";

export class userV51640029432059 implements MigrationInterface {
  name = "userV41640029432059";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE `user` CHANGE `newsletter` `newsletter` tinyint NOT NULL DEFAULT '1'", undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE `user` CHANGE `newsletter` `newsletter` tinyint NULL DEFAULT '1'", undefined);
  }
}
