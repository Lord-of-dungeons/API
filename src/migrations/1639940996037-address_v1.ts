import {MigrationInterface, QueryRunner} from "typeorm";

export class addressV11639940996037 implements MigrationInterface {
    name = 'addressV11639940996037'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_a854e557b1b14814750c7c7b0c` ON `user`", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_a854e557b1b14814750c7c7b0c` ON `user` (`token`)", undefined);
    }

}
