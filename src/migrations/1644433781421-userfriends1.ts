import {MigrationInterface, QueryRunner} from "typeorm";

export class userfriends11644433781421 implements MigrationInterface {
    name = 'userfriends11644433781421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_friends\` DROP FOREIGN KEY \`FK_0c3f2514a70a2ae99fce875500e\``);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`user_friends\` ADD CONSTRAINT \`FK_0c3f2514a70a2ae99fce875500e\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id_user\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_friends\` DROP FOREIGN KEY \`FK_0c3f2514a70a2ae99fce875500e\``);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`wisdom\` \`wisdom\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`critical\` \`critical\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`base_feature\` CHANGE \`attack_speed\` \`attack_speed\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user_friends\` ADD CONSTRAINT \`FK_0c3f2514a70a2ae99fce875500e\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
