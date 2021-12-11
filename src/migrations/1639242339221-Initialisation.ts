import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialisation1639242339221 implements MigrationInterface {
  name = "Initialisation1639242339221";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("SET FOREIGN_KEY_CHECKS = 0");
    await queryRunner.query(
      `CREATE TABLE \`event\` (\`id_event\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`id_map\` int NOT NULL, INDEX \`fk_event_map1_idx\` (\`id_map\`), PRIMARY KEY (\`id_event\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`map\` (\`id_map\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`map_path\` varchar(255) NOT NULL, PRIMARY KEY (\`id_map\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`position\` (\`id_position\` int NOT NULL AUTO_INCREMENT, \`x\` int NOT NULL, \`y\` int NOT NULL, \`id_map\` int NOT NULL, INDEX \`fk_position_map1_idx\` (\`id_map\`), PRIMARY KEY (\`id_position\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`backup\` (\`id_backup\` int NOT NULL AUTO_INCREMENT, \`date_create\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`date_update\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`id_position\` int NOT NULL, \`character_id_character\` int NOT NULL, INDEX \`fk_backup_character1_idx\` (\`character_id_character\`), INDEX \`fk_backup_position1_idx\` (\`id_position\`), PRIMARY KEY (\`id_backup\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`equipment_category\` (\`id_equipment_category\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, PRIMARY KEY (\`id_equipment_category\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`combat_phase_character\` (\`health\` int NOT NULL, \`mana\` int NOT NULL, \`latest_use_ulti\` int NOT NULL DEFAULT '0', \`id_character\` int NOT NULL, \`id_combat_phase\` int NOT NULL, INDEX \`fk_combat_phase_character_combat_phase1_idx\` (\`id_combat_phase\`), INDEX \`fk_combat_phase_character_character1_idx\` (\`id_character\`), PRIMARY KEY (\`id_combat_phase\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`monster_power\` (\`img_path\` varchar(255) NOT NULL, \`coeff\` double NOT NULL DEFAULT '1', \`id_monster\` int NOT NULL, \`id_power\` int NOT NULL, INDEX \`fk_monster_power_power1_idx\` (\`id_power\`), INDEX \`fk_monster_power_monster1_idx\` (\`id_monster\`), PRIMARY KEY (\`id_monster\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`ultimate\` (\`id_ultimate\` int NOT NULL AUTO_INCREMENT, \`mana\` int NOT NULL DEFAULT '0', \`base\` double NOT NULL DEFAULT '1', \`version\` int NOT NULL DEFAULT '1', \`img_path\` varchar(255) NOT NULL, \`id_game_animation\` int NULL, \`name\` varchar(45) NOT NULL, INDEX \`fk_ultimate_game_animation1_idx\` (\`id_game_animation\`), PRIMARY KEY (\`id_ultimate\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`vocation_appearance\` (\`id_vocation_appearance\` int NOT NULL AUTO_INCREMENT, \`img_path\` varchar(255) NOT NULL, \`version\` int NOT NULL DEFAULT '1', \`date_create\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`date_update\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`id_game_animation\` int NULL, INDEX \`fk_vocation_appearance_game_animation1_idx\` (\`id_game_animation\`), PRIMARY KEY (\`id_vocation_appearance\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`equipment_type\` (\`id_equipment\` int NOT NULL, \`id_type\` int NOT NULL, INDEX \`fk_equipment_type_type1_idx\` (\`id_type\`), INDEX \`fk_equipment_type_equipment1_idx\` (\`id_equipment\`), PRIMARY KEY (\`id_equipment\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`monster_type\` (\`up_per_level\` int NOT NULL DEFAULT '1', \`id_monster\` int NOT NULL, \`id_type\` int NOT NULL, \`base\` int NOT NULL, INDEX \`fk_monster_type_type1_idx\` (\`id_type\`), INDEX \`fk_monster_type_monster1_idx\` (\`id_monster\`), PRIMARY KEY (\`id_monster\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`inventory_level\` (\`id_inventory_level\` int NOT NULL AUTO_INCREMENT, \`level\` int NOT NULL DEFAULT '1', \`item_max\` int NOT NULL DEFAULT '1', PRIMARY KEY (\`id_inventory_level\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`inventory_equipment\` (\`id_inventory\` int NOT NULL, \`id_equipment\` int NOT NULL, INDEX \`fk_inventory_equipment_equipment1_idx\` (\`id_equipment\`), INDEX \`fk_inventory_equipment_inventory1_idx\` (\`id_inventory\`), PRIMARY KEY (\`id_inventory\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`inventory\` (\`id_inventory\` int NOT NULL AUTO_INCREMENT, \`id_inventory_level\` int NOT NULL, \`id_character\` int NOT NULL, INDEX \`fk_inventory_character1_idx\` (\`id_character\`), INDEX \`fk_inventory_inventory_level1_idx\` (\`id_inventory_level\`), PRIMARY KEY (\`id_inventory\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`inventory_Object\` (\`id_inventory\` int NOT NULL, \`id_Object\` int NOT NULL, INDEX \`fk_inventory_Object_Object1_idx\` (\`id_Object\`), INDEX \`fk_inventory_Object_inventory1_idx\` (\`id_inventory\`), PRIMARY KEY (\`id_inventory\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`dungeon_character\` (\`id_dungeon_session\` int NOT NULL, \`id_character\` int NOT NULL, INDEX \`fk_dungeon_character_character1_idx\` (\`id_character\`), INDEX \`fk_dungeon_character_dungeon_session1_idx\` (\`id_dungeon_session\`), PRIMARY KEY (\`id_dungeon_session\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`dungeon\` (\`id_dungeon\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`map_path\` varchar(255) NOT NULL, \`date_create\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`date_update\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`version\` int NOT NULL DEFAULT '1', PRIMARY KEY (\`id_dungeon\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`season\` (\`id_season\` int NOT NULL AUTO_INCREMENT, \`year\` varchar(45) NULL, PRIMARY KEY (\`id_season\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`statistics\` (\`id_statistics\` int NOT NULL AUTO_INCREMENT, \`kill\` int NOT NULL DEFAULT '0', \`death\` int NOT NULL DEFAULT '0', \`level_start\` int NOT NULL DEFAULT '1', \`level_end\` int NOT NULL DEFAULT '1', \`playing_time\` bigint NOT NULL DEFAULT '0', \`id_season\` int NOT NULL, INDEX \`fk_statistics_season1_idx\` (\`id_season\`), PRIMARY KEY (\`id_statistics\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`dungeon_session_statistics\` (\`id_dungeon_session\` int NOT NULL, \`id_character\` int NOT NULL, \`id_statistics\` int NOT NULL, INDEX \`fk_dungeon_session_statistics_statistics1_idx\` (\`id_statistics\`), INDEX \`fk_dungeon_session_statistics_character1_idx\` (\`id_character\`), INDEX \`fk_dungeon_session_statistics_dungeon_session1_idx\` (\`id_dungeon_session\`), PRIMARY KEY (\`id_dungeon_session\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`dungeon_session\` (\`id_dungeon_session\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(45) NOT NULL, \`date_create\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`date_update\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`id_dungeon\` int NOT NULL, \`code\` varchar(6) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT '1', \`lobby_phase\` tinyint NOT NULL DEFAULT '1', INDEX \`fk_dungeon_session_uuid_idx\` (\`uuid\`), INDEX \`fk_dungeon_session_code1_idx\` (\`code\`), INDEX \`fk_dungeon_session_dungeon1_idx\` (\`id_dungeon\`), PRIMARY KEY (\`id_dungeon_session\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`loot_dungeon_session\` (\`id_dungeon_session\` int NOT NULL, \`id_character\` int NOT NULL, \`id_Object\` int NOT NULL, INDEX \`fk_loot_dungeon_session_Object1_idx\` (\`id_Object\`), INDEX \`fk_loot_dungeon_session_character1_idx\` (\`id_character\`), INDEX \`fk_loot_dungeon_session_dungeon_session1_idx\` (\`id_dungeon_session\`), PRIMARY KEY (\`id_dungeon_session\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`monster_loot\` (\`probability\` double NOT NULL DEFAULT '0', \`id_monster\` int NOT NULL, \`id_Object\` int NOT NULL, INDEX \`fk_monster_loot_Object1_idx\` (\`id_Object\`), INDEX \`fk_monster_loot_monster1_idx\` (\`id_monster\`), PRIMARY KEY (\`id_monster\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`Object_type\` (\`base\` int NOT NULL, \`id_Object\` int NOT NULL, \`id_type\` int NOT NULL, INDEX \`fk_Object_type_type1_idx\` (\`id_type\`), INDEX \`fk_Object_type_Object1_idx\` (\`id_Object\`), PRIMARY KEY (\`id_Object\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`Object\` (\`id_Object\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`img_path\` varchar(255) NOT NULL, \`id_type\` int NOT NULL, \`price\` int NOT NULL DEFAULT '1', INDEX \`fk_Object_type1_idx\` (\`id_type\`), PRIMARY KEY (\`id_Object\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`type\` (\`id_type\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, PRIMARY KEY (\`id_type\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`vocation_type\` (\`up_per_level\` int NOT NULL DEFAULT '1', \`id_vocation\` int NOT NULL, \`id_type\` int NOT NULL, \`base\` int NOT NULL, INDEX \`fk_vocation_type_type1_idx\` (\`id_type\`), INDEX \`fk_vocation_type_vocation1_idx\` (\`id_vocation\`), PRIMARY KEY (\`id_vocation\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`vocation\` (\`id_vocation\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`version\` int NOT NULL DEFAULT '1', \`id_vocation_appearance\` int NOT NULL, \`id_base_feature\` int NOT NULL, \`id_ultimate\` int NULL, INDEX \`fk_vocation_ultimate1_idx\` (\`id_ultimate\`), INDEX \`fk_vocation_vocation_appearance1_idx\` (\`id_vocation_appearance\`), PRIMARY KEY (\`id_vocation\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`vocation_power\` (\`img_path\` varchar(255) NOT NULL, \`coeff\` double NOT NULL DEFAULT '0', \`id_vocation\` int NOT NULL, \`id_power\` int NOT NULL, INDEX \`fk_vocation_power_power1_idx\` (\`id_power\`), INDEX \`fk_vocation_power_vocation1_idx\` (\`id_vocation\`), PRIMARY KEY (\`id_vocation\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`power\` (\`id_power\` int NOT NULL AUTO_INCREMENT, \`mana\` int NOT NULL DEFAULT '0', \`base\` double NOT NULL DEFAULT '1', \`version\` int NOT NULL DEFAULT '1', \`id_special_feature\` int NULL, \`id_game_animation\` int NOT NULL, \`name\` varchar(45) NOT NULL, INDEX \`fk_power_game_animation1_idx\` (\`id_game_animation\`), INDEX \`fk_power_special_feature1_idx\` (\`id_special_feature\`), PRIMARY KEY (\`id_power\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`game_animation\` (\`id_game_animation\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`path\` varchar(255) NOT NULL, PRIMARY KEY (\`id_game_animation\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`monster_appearence\` (\`id_monster_appearence\` int NOT NULL AUTO_INCREMENT, \`img_path\` varchar(255) NOT NULL, \`version\` int NOT NULL DEFAULT '1', \`date_create\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`date_update\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`id_game_animation\` int NULL, INDEX \`fk_monster_appearence_game_animation1_idx\` (\`id_game_animation\`), PRIMARY KEY (\`id_monster_appearence\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`monster\` (\`id_monster\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`base\` double NOT NULL DEFAULT '1', \`version\` int NOT NULL DEFAULT '1', \`max_loot_item\` int NOT NULL DEFAULT '1', \`xp\` int NOT NULL DEFAULT '1', \`ultimate_ratio\` double NOT NULL DEFAULT '0', \`id_monster_appearence\` int NOT NULL, \`id_base_feature\` int NOT NULL, \`id_ultimate\` int NULL, INDEX \`fk_monster_ultimate1_idx\` (\`id_ultimate\`), INDEX \`fk_monster_monster_appearence1_idx\` (\`id_monster_appearence\`), PRIMARY KEY (\`id_monster\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`combat_phase_monster\` (\`health\` int NOT NULL, \`mana\` int NOT NULL, \`latest_use_ulti\` int NOT NULL DEFAULT '0', \`id_monster\` int NOT NULL, \`id_combat_phase\` int NOT NULL, INDEX \`fk_combat_phase_monster_combat_phase1_idx\` (\`id_combat_phase\`), INDEX \`fk_combat_phase_monster_monster1_idx\` (\`id_monster\`), PRIMARY KEY (\`id_combat_phase\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`combat_phase\` (\`id_combat_phase\` int NOT NULL AUTO_INCREMENT, \`date_create\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`date_update\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id_combat_phase\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`combat_phase_special_feature\` (\`duration_remaining\` int NOT NULL DEFAULT '1', \`id_special_feature\` int NOT NULL, \`id_combat_phase\` int NOT NULL, \`id_character\` int NULL, \`id_monster\` int NULL, INDEX \`fk_combat_phase_special_feature_monster1_idx\` (\`id_monster\`), INDEX \`fk_combat_phase_special_feature_character1_idx\` (\`id_character\`), INDEX \`fk_combat_phase_special_feature_combat_phase1_idx\` (\`id_combat_phase\`), INDEX \`fk_combat_phase_special_feature_special_feature1_idx\` (\`id_special_feature\`), PRIMARY KEY (\`id_combat_phase\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`special_feature\` (\`id_special_feature\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`version\` int NOT NULL DEFAULT '1', \`probability\` double NOT NULL DEFAULT '0', \`date_create\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`date_update\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`base\` double NOT NULL DEFAULT '1', \`duration\` int NOT NULL DEFAULT '0', \`coeff\` double NOT NULL DEFAULT '1', PRIMARY KEY (\`id_special_feature\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`equipment\` (\`id_equipment\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`is_legendary\` tinyint NOT NULL DEFAULT '0', \`img_path\` varchar(255) NOT NULL, \`id_equipment_category\` int NOT NULL, \`id_special_feature\` int NULL, \`id_base_feature\` int NOT NULL, \`price\` int NOT NULL DEFAULT '1', INDEX \`fk_equipment_special_feature1_idx\` (\`id_special_feature\`), INDEX \`fk_equipment_equipment_category1_idx\` (\`id_equipment_category\`), PRIMARY KEY (\`id_equipment\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`character_equipment\` (\`id_character\` int NOT NULL, \`id_equipment\` int NOT NULL, INDEX \`fk_character_equipment_equipment1_idx\` (\`id_equipment\`), INDEX \`fk_character_equipment_character1_idx\` (\`id_character\`), PRIMARY KEY (\`id_character\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user_character\` (\`id_user\` int NOT NULL, \`id_character\` int NOT NULL, INDEX \`fk_user_character_character1_idx\` (\`id_character\`), INDEX \`fk_user_character_user1_idx\` (\`id_user\`), PRIMARY KEY (\`id_user\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`character\` (\`id_character\` int NOT NULL AUTO_INCREMENT, \`date_create\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`date_update\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`xp\` bigint NOT NULL DEFAULT '0', \`fluz\` bigint NOT NULL DEFAULT '0', \`id_user\` int NOT NULL, \`is_dead\` tinyint NOT NULL DEFAULT '0', \`date_of_death\` datetime NULL, \`name\` varchar(45) NOT NULL, INDEX \`fk_character_user1_idx\` (\`id_user\`), PRIMARY KEY (\`id_character\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user_friends\` (\`friend_pseudo\` varchar(45) NOT NULL, \`date_create\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`id_user\` int NOT NULL, INDEX \`fk_user_friends_user1_idx\` (\`id_user\`), PRIMARY KEY (\`id_user\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id_user\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(45) NOT NULL, \`lastname\` varchar(45) NOT NULL, \`pseudo\` varchar(45) NOT NULL, \`email\` varchar(45) NOT NULL, \`password\` varchar(255) NOT NULL, \`facebook_id\` varchar(45) NULL, \`google_id\` varchar(45) NULL, \`github_id\` varchar(45) NULL, \`token\` text NULL, \`refresh_token\` varchar(255) NULL, \`newsletter\` tinyint NULL DEFAULT '1', \`date_create\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`date_update\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`id_address\` int NOT NULL, \`birthday\` date NOT NULL, \`profile_picture_path\` varchar(255) NOT NULL, INDEX \`fk_user_address_idx\` (\`id_address\`), UNIQUE INDEX \`pseudo_UNIQUE\` (\`pseudo\`), UNIQUE INDEX \`email_UNIQUE\` (\`email\`), UNIQUE INDEX \`IDX_be726a825c7254f55be1540601\` (\`pseudo\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id_user\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`address\` (\`id_address\` int NOT NULL AUTO_INCREMENT, \`city\` varchar(100) NOT NULL, \`zip_code\` varchar(5) NOT NULL, \`num_address\` int NOT NULL, \`street\` varchar(255) NOT NULL, \`country\` varchar(45) NULL DEFAULT 'France', INDEX \`city_idx\` (\`city\`), INDEX \`zip_code_idx\` (\`zip_code\`), PRIMARY KEY (\`id_address\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`shop\` (\`id_shop\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`price\` double NOT NULL DEFAULT '0', \`date_create\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`date_update\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`version\` int NOT NULL DEFAULT '1', \`img_path\` varchar(255) NOT NULL, \`description\` text NULL, \`promo\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id_shop\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`special_shop\` (\`id_special_shop\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`price\` double NOT NULL DEFAULT '0', \`date_create\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`date_update\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`version\` int NOT NULL DEFAULT '1', \`img_path\` varchar(255) NOT NULL, \`description\` text NULL, \`promo\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id_special_shop\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_2f149605e7faf616fbc5ac6d6fc\` FOREIGN KEY (\`id_map\`) REFERENCES \`map\`(\`id_map\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`position\` ADD CONSTRAINT \`FK_5f7f58a7991be3f063547a23e58\` FOREIGN KEY (\`id_map\`) REFERENCES \`map\`(\`id_map\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`backup\` ADD CONSTRAINT \`FK_e2dd0872274eebdeae0947e579c\` FOREIGN KEY (\`character_id_character\`) REFERENCES \`character\`(\`id_character\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`backup\` ADD CONSTRAINT \`FK_de866040ef312a9a3261329bf93\` FOREIGN KEY (\`id_position\`) REFERENCES \`position\`(\`id_position\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`combat_phase_character\` ADD CONSTRAINT \`FK_4fcec9105cb71fb770753465bf2\` FOREIGN KEY (\`id_character\`) REFERENCES \`character\`(\`id_character\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`combat_phase_character\` ADD CONSTRAINT \`FK_edca797265770dfc8964ff515b8\` FOREIGN KEY (\`id_combat_phase\`) REFERENCES \`combat_phase\`(\`id_combat_phase\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`monster_power\` ADD CONSTRAINT \`FK_4b2309759eaa55b35bbeb3796a0\` FOREIGN KEY (\`id_monster\`) REFERENCES \`monster\`(\`id_monster\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`monster_power\` ADD CONSTRAINT \`FK_2df418b7146e2270781db06bc8c\` FOREIGN KEY (\`id_power\`) REFERENCES \`power\`(\`id_power\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`ultimate\` ADD CONSTRAINT \`FK_d9c535f6fb439b973fe2d9a7d04\` FOREIGN KEY (\`id_game_animation\`) REFERENCES \`game_animation\`(\`id_game_animation\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`vocation_appearance\` ADD CONSTRAINT \`FK_387d9274894f4c6d235f534dc8f\` FOREIGN KEY (\`id_game_animation\`) REFERENCES \`game_animation\`(\`id_game_animation\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`equipment_type\` ADD CONSTRAINT \`FK_ee3dc0c3df6c7c691bfb1f49998\` FOREIGN KEY (\`id_equipment\`) REFERENCES \`equipment\`(\`id_equipment\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`equipment_type\` ADD CONSTRAINT \`FK_f7f9c483840f1756a5551b85cac\` FOREIGN KEY (\`id_type\`) REFERENCES \`type\`(\`id_type\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`monster_type\` ADD CONSTRAINT \`FK_dc95a34eb5a0ac73b533fe08ca2\` FOREIGN KEY (\`id_monster\`) REFERENCES \`monster\`(\`id_monster\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`monster_type\` ADD CONSTRAINT \`FK_6ef00a0bfc7e7a910f25cc3fa25\` FOREIGN KEY (\`id_type\`) REFERENCES \`type\`(\`id_type\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory_equipment\` ADD CONSTRAINT \`FK_b95c7a7bcc4b756b1b000c18260\` FOREIGN KEY (\`id_equipment\`) REFERENCES \`equipment\`(\`id_equipment\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory_equipment\` ADD CONSTRAINT \`FK_1bf3aa55a1a8168e51876ff3185\` FOREIGN KEY (\`id_inventory\`) REFERENCES \`inventory\`(\`id_inventory\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory\` ADD CONSTRAINT \`FK_594b893185c13dcae8867da2f96\` FOREIGN KEY (\`id_character\`) REFERENCES \`character\`(\`id_character\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory\` ADD CONSTRAINT \`FK_756b2a00ffb5f8dfc71208e0cac\` FOREIGN KEY (\`id_inventory_level\`) REFERENCES \`inventory_level\`(\`id_inventory_level\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory_Object\` ADD CONSTRAINT \`FK_b71f3a11cd39030fbed92682883\` FOREIGN KEY (\`id_inventory\`) REFERENCES \`inventory\`(\`id_inventory\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory_Object\` ADD CONSTRAINT \`FK_27bc489b7e9e0097b88895cf106\` FOREIGN KEY (\`id_Object\`) REFERENCES \`Object\`(\`id_Object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`dungeon_character\` ADD CONSTRAINT \`FK_3247193a248cbe577bf57131fba\` FOREIGN KEY (\`id_character\`) REFERENCES \`character\`(\`id_character\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`dungeon_character\` ADD CONSTRAINT \`FK_67ffda531648550c01fbc59b140\` FOREIGN KEY (\`id_dungeon_session\`) REFERENCES \`dungeon_session\`(\`id_dungeon_session\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`statistics\` ADD CONSTRAINT \`FK_68662e3ced74d8d8afdb30058f8\` FOREIGN KEY (\`id_season\`) REFERENCES \`season\`(\`id_season\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`dungeon_session_statistics\` ADD CONSTRAINT \`FK_d4bec797886e5e756bee6070c85\` FOREIGN KEY (\`id_character\`) REFERENCES \`character\`(\`id_character\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`dungeon_session_statistics\` ADD CONSTRAINT \`FK_c13e79b88db0180c87c85381a11\` FOREIGN KEY (\`id_dungeon_session\`) REFERENCES \`dungeon_session\`(\`id_dungeon_session\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`dungeon_session_statistics\` ADD CONSTRAINT \`FK_9a8e04694b025b9c5128d3b09db\` FOREIGN KEY (\`id_statistics\`) REFERENCES \`statistics\`(\`id_statistics\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`dungeon_session\` ADD CONSTRAINT \`FK_d0b16ca081d2d24175fce88a162\` FOREIGN KEY (\`id_dungeon\`) REFERENCES \`dungeon\`(\`id_dungeon\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`loot_dungeon_session\` ADD CONSTRAINT \`FK_ab8d4c0a58cb9e4730aba78f9f6\` FOREIGN KEY (\`id_character\`) REFERENCES \`character\`(\`id_character\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`loot_dungeon_session\` ADD CONSTRAINT \`FK_f06a8e4b4dc995967f0d6755b05\` FOREIGN KEY (\`id_dungeon_session\`) REFERENCES \`dungeon_session\`(\`id_dungeon_session\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`loot_dungeon_session\` ADD CONSTRAINT \`FK_b89a696db81b2395ee236303e26\` FOREIGN KEY (\`id_Object\`) REFERENCES \`Object\`(\`id_Object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`monster_loot\` ADD CONSTRAINT \`FK_7cf0155a9d8f8626783f1b3a428\` FOREIGN KEY (\`id_monster\`) REFERENCES \`monster\`(\`id_monster\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`monster_loot\` ADD CONSTRAINT \`FK_c9a469425b174823c97e1b9ef1c\` FOREIGN KEY (\`id_Object\`) REFERENCES \`Object\`(\`id_Object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`Object_type\` ADD CONSTRAINT \`FK_f5e3a3ff08db9a1b36677469c96\` FOREIGN KEY (\`id_Object\`) REFERENCES \`Object\`(\`id_Object\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`Object_type\` ADD CONSTRAINT \`FK_97373002a99803afea43cbab9f5\` FOREIGN KEY (\`id_type\`) REFERENCES \`type\`(\`id_type\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`Object\` ADD CONSTRAINT \`FK_9708414e24c29e7cf2c6967cfa9\` FOREIGN KEY (\`id_type\`) REFERENCES \`type\`(\`id_type\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`vocation_type\` ADD CONSTRAINT \`FK_1ec661df0c97d3356cc5314fb64\` FOREIGN KEY (\`id_type\`) REFERENCES \`type\`(\`id_type\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`vocation_type\` ADD CONSTRAINT \`FK_6a8cd7b84fe331469c770cb2fe3\` FOREIGN KEY (\`id_vocation\`) REFERENCES \`vocation\`(\`id_vocation\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`vocation\` ADD CONSTRAINT \`FK_cf2726e85fe94b72ddf75be305f\` FOREIGN KEY (\`id_ultimate\`) REFERENCES \`ultimate\`(\`id_ultimate\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`vocation\` ADD CONSTRAINT \`FK_bb3c94df0e4f4f3bdce6329dc3b\` FOREIGN KEY (\`id_vocation_appearance\`) REFERENCES \`vocation_appearance\`(\`id_vocation_appearance\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`vocation_power\` ADD CONSTRAINT \`FK_f4b12ea5f4355e599c12c0f2bd1\` FOREIGN KEY (\`id_power\`) REFERENCES \`power\`(\`id_power\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`vocation_power\` ADD CONSTRAINT \`FK_6f103a76711b6139b185b5bed26\` FOREIGN KEY (\`id_vocation\`) REFERENCES \`vocation\`(\`id_vocation\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`power\` ADD CONSTRAINT \`FK_4d338e7e002de518795607e6c59\` FOREIGN KEY (\`id_game_animation\`) REFERENCES \`game_animation\`(\`id_game_animation\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`power\` ADD CONSTRAINT \`FK_ea5095f55259fac745bf37466d6\` FOREIGN KEY (\`id_special_feature\`) REFERENCES \`special_feature\`(\`id_special_feature\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`monster_appearence\` ADD CONSTRAINT \`FK_c375f03913512e7a5f770c1d869\` FOREIGN KEY (\`id_game_animation\`) REFERENCES \`game_animation\`(\`id_game_animation\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`monster\` ADD CONSTRAINT \`FK_d2fa6cdbeaf5017c720658c1549\` FOREIGN KEY (\`id_monster_appearence\`) REFERENCES \`monster_appearence\`(\`id_monster_appearence\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`monster\` ADD CONSTRAINT \`FK_f4ce6d024b5c7d16f3b6f3aa9f6\` FOREIGN KEY (\`id_ultimate\`) REFERENCES \`ultimate\`(\`id_ultimate\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`combat_phase_monster\` ADD CONSTRAINT \`FK_f745c895acd6f27dadfce4c44e3\` FOREIGN KEY (\`id_combat_phase\`) REFERENCES \`combat_phase\`(\`id_combat_phase\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`combat_phase_monster\` ADD CONSTRAINT \`FK_d91c628baf509e26626b941c806\` FOREIGN KEY (\`id_monster\`) REFERENCES \`monster\`(\`id_monster\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`combat_phase_special_feature\` ADD CONSTRAINT \`FK_9ce20631c5bbff5557f03d49638\` FOREIGN KEY (\`id_character\`) REFERENCES \`character\`(\`id_character\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`combat_phase_special_feature\` ADD CONSTRAINT \`FK_9cb08062c34f97fd6a3b89ce4ae\` FOREIGN KEY (\`id_combat_phase\`) REFERENCES \`combat_phase\`(\`id_combat_phase\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`combat_phase_special_feature\` ADD CONSTRAINT \`FK_62ae0a904cc307c18af416028dc\` FOREIGN KEY (\`id_monster\`) REFERENCES \`monster\`(\`id_monster\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`combat_phase_special_feature\` ADD CONSTRAINT \`FK_df56af6b406e872f73f3e826d37\` FOREIGN KEY (\`id_special_feature\`) REFERENCES \`special_feature\`(\`id_special_feature\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`equipment\` ADD CONSTRAINT \`FK_4b627e976f1b372ab5e72b05b13\` FOREIGN KEY (\`id_equipment_category\`) REFERENCES \`equipment_category\`(\`id_equipment_category\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`equipment\` ADD CONSTRAINT \`FK_6b573f64b831274635be33ce456\` FOREIGN KEY (\`id_special_feature\`) REFERENCES \`special_feature\`(\`id_special_feature\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`character_equipment\` ADD CONSTRAINT \`FK_ad64bba849ec9892ad3215f28d2\` FOREIGN KEY (\`id_character\`) REFERENCES \`character\`(\`id_character\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`character_equipment\` ADD CONSTRAINT \`FK_00c245ef9fea34cfb41549ee15c\` FOREIGN KEY (\`id_equipment\`) REFERENCES \`equipment\`(\`id_equipment\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_character\` ADD CONSTRAINT \`FK_667862a4c2ce1c463f4e79cce4c\` FOREIGN KEY (\`id_character\`) REFERENCES \`character\`(\`id_character\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_character\` ADD CONSTRAINT \`FK_390434874d6605c7cc9a828a6f1\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`character\` ADD CONSTRAINT \`FK_2825420c8093e83e73c2c2e1556\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_friends\` ADD CONSTRAINT \`FK_0c3f2514a70a2ae99fce875500e\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_addde50949464eeaefe11ad7690\` FOREIGN KEY (\`id_address\`) REFERENCES \`address\`(\`id_address\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query("SET FOREIGN_KEY_CHECKS = 1");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_addde50949464eeaefe11ad7690\``);
    await queryRunner.query(`ALTER TABLE \`user_friends\` DROP FOREIGN KEY \`FK_0c3f2514a70a2ae99fce875500e\``);
    await queryRunner.query(`ALTER TABLE \`character\` DROP FOREIGN KEY \`FK_2825420c8093e83e73c2c2e1556\``);
    await queryRunner.query(`ALTER TABLE \`user_character\` DROP FOREIGN KEY \`FK_390434874d6605c7cc9a828a6f1\``);
    await queryRunner.query(`ALTER TABLE \`user_character\` DROP FOREIGN KEY \`FK_667862a4c2ce1c463f4e79cce4c\``);
    await queryRunner.query(`ALTER TABLE \`character_equipment\` DROP FOREIGN KEY \`FK_00c245ef9fea34cfb41549ee15c\``);
    await queryRunner.query(`ALTER TABLE \`character_equipment\` DROP FOREIGN KEY \`FK_ad64bba849ec9892ad3215f28d2\``);
    await queryRunner.query(`ALTER TABLE \`equipment\` DROP FOREIGN KEY \`FK_6b573f64b831274635be33ce456\``);
    await queryRunner.query(`ALTER TABLE \`equipment\` DROP FOREIGN KEY \`FK_4b627e976f1b372ab5e72b05b13\``);
    await queryRunner.query(`ALTER TABLE \`combat_phase_special_feature\` DROP FOREIGN KEY \`FK_df56af6b406e872f73f3e826d37\``);
    await queryRunner.query(`ALTER TABLE \`combat_phase_special_feature\` DROP FOREIGN KEY \`FK_62ae0a904cc307c18af416028dc\``);
    await queryRunner.query(`ALTER TABLE \`combat_phase_special_feature\` DROP FOREIGN KEY \`FK_9cb08062c34f97fd6a3b89ce4ae\``);
    await queryRunner.query(`ALTER TABLE \`combat_phase_special_feature\` DROP FOREIGN KEY \`FK_9ce20631c5bbff5557f03d49638\``);
    await queryRunner.query(`ALTER TABLE \`combat_phase_monster\` DROP FOREIGN KEY \`FK_d91c628baf509e26626b941c806\``);
    await queryRunner.query(`ALTER TABLE \`combat_phase_monster\` DROP FOREIGN KEY \`FK_f745c895acd6f27dadfce4c44e3\``);
    await queryRunner.query(`ALTER TABLE \`monster\` DROP FOREIGN KEY \`FK_f4ce6d024b5c7d16f3b6f3aa9f6\``);
    await queryRunner.query(`ALTER TABLE \`monster\` DROP FOREIGN KEY \`FK_d2fa6cdbeaf5017c720658c1549\``);
    await queryRunner.query(`ALTER TABLE \`monster_appearence\` DROP FOREIGN KEY \`FK_c375f03913512e7a5f770c1d869\``);
    await queryRunner.query(`ALTER TABLE \`power\` DROP FOREIGN KEY \`FK_ea5095f55259fac745bf37466d6\``);
    await queryRunner.query(`ALTER TABLE \`power\` DROP FOREIGN KEY \`FK_4d338e7e002de518795607e6c59\``);
    await queryRunner.query(`ALTER TABLE \`vocation_power\` DROP FOREIGN KEY \`FK_6f103a76711b6139b185b5bed26\``);
    await queryRunner.query(`ALTER TABLE \`vocation_power\` DROP FOREIGN KEY \`FK_f4b12ea5f4355e599c12c0f2bd1\``);
    await queryRunner.query(`ALTER TABLE \`vocation\` DROP FOREIGN KEY \`FK_bb3c94df0e4f4f3bdce6329dc3b\``);
    await queryRunner.query(`ALTER TABLE \`vocation\` DROP FOREIGN KEY \`FK_cf2726e85fe94b72ddf75be305f\``);
    await queryRunner.query(`ALTER TABLE \`vocation_type\` DROP FOREIGN KEY \`FK_6a8cd7b84fe331469c770cb2fe3\``);
    await queryRunner.query(`ALTER TABLE \`vocation_type\` DROP FOREIGN KEY \`FK_1ec661df0c97d3356cc5314fb64\``);
    await queryRunner.query(`ALTER TABLE \`Object\` DROP FOREIGN KEY \`FK_9708414e24c29e7cf2c6967cfa9\``);
    await queryRunner.query(`ALTER TABLE \`Object_type\` DROP FOREIGN KEY \`FK_97373002a99803afea43cbab9f5\``);
    await queryRunner.query(`ALTER TABLE \`Object_type\` DROP FOREIGN KEY \`FK_f5e3a3ff08db9a1b36677469c96\``);
    await queryRunner.query(`ALTER TABLE \`monster_loot\` DROP FOREIGN KEY \`FK_c9a469425b174823c97e1b9ef1c\``);
    await queryRunner.query(`ALTER TABLE \`monster_loot\` DROP FOREIGN KEY \`FK_7cf0155a9d8f8626783f1b3a428\``);
    await queryRunner.query(`ALTER TABLE \`loot_dungeon_session\` DROP FOREIGN KEY \`FK_b89a696db81b2395ee236303e26\``);
    await queryRunner.query(`ALTER TABLE \`loot_dungeon_session\` DROP FOREIGN KEY \`FK_f06a8e4b4dc995967f0d6755b05\``);
    await queryRunner.query(`ALTER TABLE \`loot_dungeon_session\` DROP FOREIGN KEY \`FK_ab8d4c0a58cb9e4730aba78f9f6\``);
    await queryRunner.query(`ALTER TABLE \`dungeon_session\` DROP FOREIGN KEY \`FK_d0b16ca081d2d24175fce88a162\``);
    await queryRunner.query(`ALTER TABLE \`dungeon_session_statistics\` DROP FOREIGN KEY \`FK_9a8e04694b025b9c5128d3b09db\``);
    await queryRunner.query(`ALTER TABLE \`dungeon_session_statistics\` DROP FOREIGN KEY \`FK_c13e79b88db0180c87c85381a11\``);
    await queryRunner.query(`ALTER TABLE \`dungeon_session_statistics\` DROP FOREIGN KEY \`FK_d4bec797886e5e756bee6070c85\``);
    await queryRunner.query(`ALTER TABLE \`statistics\` DROP FOREIGN KEY \`FK_68662e3ced74d8d8afdb30058f8\``);
    await queryRunner.query(`ALTER TABLE \`dungeon_character\` DROP FOREIGN KEY \`FK_67ffda531648550c01fbc59b140\``);
    await queryRunner.query(`ALTER TABLE \`dungeon_character\` DROP FOREIGN KEY \`FK_3247193a248cbe577bf57131fba\``);
    await queryRunner.query(`ALTER TABLE \`inventory_Object\` DROP FOREIGN KEY \`FK_27bc489b7e9e0097b88895cf106\``);
    await queryRunner.query(`ALTER TABLE \`inventory_Object\` DROP FOREIGN KEY \`FK_b71f3a11cd39030fbed92682883\``);
    await queryRunner.query(`ALTER TABLE \`inventory\` DROP FOREIGN KEY \`FK_756b2a00ffb5f8dfc71208e0cac\``);
    await queryRunner.query(`ALTER TABLE \`inventory\` DROP FOREIGN KEY \`FK_594b893185c13dcae8867da2f96\``);
    await queryRunner.query(`ALTER TABLE \`inventory_equipment\` DROP FOREIGN KEY \`FK_1bf3aa55a1a8168e51876ff3185\``);
    await queryRunner.query(`ALTER TABLE \`inventory_equipment\` DROP FOREIGN KEY \`FK_b95c7a7bcc4b756b1b000c18260\``);
    await queryRunner.query(`ALTER TABLE \`monster_type\` DROP FOREIGN KEY \`FK_6ef00a0bfc7e7a910f25cc3fa25\``);
    await queryRunner.query(`ALTER TABLE \`monster_type\` DROP FOREIGN KEY \`FK_dc95a34eb5a0ac73b533fe08ca2\``);
    await queryRunner.query(`ALTER TABLE \`equipment_type\` DROP FOREIGN KEY \`FK_f7f9c483840f1756a5551b85cac\``);
    await queryRunner.query(`ALTER TABLE \`equipment_type\` DROP FOREIGN KEY \`FK_ee3dc0c3df6c7c691bfb1f49998\``);
    await queryRunner.query(`ALTER TABLE \`vocation_appearance\` DROP FOREIGN KEY \`FK_387d9274894f4c6d235f534dc8f\``);
    await queryRunner.query(`ALTER TABLE \`ultimate\` DROP FOREIGN KEY \`FK_d9c535f6fb439b973fe2d9a7d04\``);
    await queryRunner.query(`ALTER TABLE \`monster_power\` DROP FOREIGN KEY \`FK_2df418b7146e2270781db06bc8c\``);
    await queryRunner.query(`ALTER TABLE \`monster_power\` DROP FOREIGN KEY \`FK_4b2309759eaa55b35bbeb3796a0\``);
    await queryRunner.query(`ALTER TABLE \`combat_phase_character\` DROP FOREIGN KEY \`FK_edca797265770dfc8964ff515b8\``);
    await queryRunner.query(`ALTER TABLE \`combat_phase_character\` DROP FOREIGN KEY \`FK_4fcec9105cb71fb770753465bf2\``);
    await queryRunner.query(`ALTER TABLE \`backup\` DROP FOREIGN KEY \`FK_de866040ef312a9a3261329bf93\``);
    await queryRunner.query(`ALTER TABLE \`backup\` DROP FOREIGN KEY \`FK_e2dd0872274eebdeae0947e579c\``);
    await queryRunner.query(`ALTER TABLE \`position\` DROP FOREIGN KEY \`FK_5f7f58a7991be3f063547a23e58\``);
    await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_2f149605e7faf616fbc5ac6d6fc\``);
    await queryRunner.query(`DROP TABLE \`special_shop\``);
    await queryRunner.query(`DROP TABLE \`shop\``);
    await queryRunner.query(`DROP INDEX \`zip_code_idx\` ON \`address\``);
    await queryRunner.query(`DROP INDEX \`city_idx\` ON \`address\``);
    await queryRunner.query(`DROP TABLE \`address\``);
    await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
    await queryRunner.query(`DROP INDEX \`IDX_be726a825c7254f55be1540601\` ON \`user\``);
    await queryRunner.query(`DROP INDEX \`email_UNIQUE\` ON \`user\``);
    await queryRunner.query(`DROP INDEX \`pseudo_UNIQUE\` ON \`user\``);
    await queryRunner.query(`DROP INDEX \`fk_user_address_idx\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP INDEX \`fk_user_friends_user1_idx\` ON \`user_friends\``);
    await queryRunner.query(`DROP TABLE \`user_friends\``);
    await queryRunner.query(`DROP INDEX \`fk_character_user1_idx\` ON \`character\``);
    await queryRunner.query(`DROP TABLE \`character\``);
    await queryRunner.query(`DROP INDEX \`fk_user_character_user1_idx\` ON \`user_character\``);
    await queryRunner.query(`DROP INDEX \`fk_user_character_character1_idx\` ON \`user_character\``);
    await queryRunner.query(`DROP TABLE \`user_character\``);
    await queryRunner.query(`DROP INDEX \`fk_character_equipment_character1_idx\` ON \`character_equipment\``);
    await queryRunner.query(`DROP INDEX \`fk_character_equipment_equipment1_idx\` ON \`character_equipment\``);
    await queryRunner.query(`DROP TABLE \`character_equipment\``);
    await queryRunner.query(`DROP INDEX \`fk_equipment_equipment_category1_idx\` ON \`equipment\``);
    await queryRunner.query(`DROP INDEX \`fk_equipment_special_feature1_idx\` ON \`equipment\``);
    await queryRunner.query(`DROP TABLE \`equipment\``);
    await queryRunner.query(`DROP TABLE \`special_feature\``);
    await queryRunner.query(`DROP INDEX \`fk_combat_phase_special_feature_special_feature1_idx\` ON \`combat_phase_special_feature\``);
    await queryRunner.query(`DROP INDEX \`fk_combat_phase_special_feature_combat_phase1_idx\` ON \`combat_phase_special_feature\``);
    await queryRunner.query(`DROP INDEX \`fk_combat_phase_special_feature_character1_idx\` ON \`combat_phase_special_feature\``);
    await queryRunner.query(`DROP INDEX \`fk_combat_phase_special_feature_monster1_idx\` ON \`combat_phase_special_feature\``);
    await queryRunner.query(`DROP TABLE \`combat_phase_special_feature\``);
    await queryRunner.query(`DROP TABLE \`combat_phase\``);
    await queryRunner.query(`DROP INDEX \`fk_combat_phase_monster_monster1_idx\` ON \`combat_phase_monster\``);
    await queryRunner.query(`DROP INDEX \`fk_combat_phase_monster_combat_phase1_idx\` ON \`combat_phase_monster\``);
    await queryRunner.query(`DROP TABLE \`combat_phase_monster\``);
    await queryRunner.query(`DROP INDEX \`fk_monster_monster_appearence1_idx\` ON \`monster\``);
    await queryRunner.query(`DROP INDEX \`fk_monster_ultimate1_idx\` ON \`monster\``);
    await queryRunner.query(`DROP TABLE \`monster\``);
    await queryRunner.query(`DROP INDEX \`fk_monster_appearence_game_animation1_idx\` ON \`monster_appearence\``);
    await queryRunner.query(`DROP TABLE \`monster_appearence\``);
    await queryRunner.query(`DROP TABLE \`game_animation\``);
    await queryRunner.query(`DROP INDEX \`fk_power_special_feature1_idx\` ON \`power\``);
    await queryRunner.query(`DROP INDEX \`fk_power_game_animation1_idx\` ON \`power\``);
    await queryRunner.query(`DROP TABLE \`power\``);
    await queryRunner.query(`DROP INDEX \`fk_vocation_power_vocation1_idx\` ON \`vocation_power\``);
    await queryRunner.query(`DROP INDEX \`fk_vocation_power_power1_idx\` ON \`vocation_power\``);
    await queryRunner.query(`DROP TABLE \`vocation_power\``);
    await queryRunner.query(`DROP INDEX \`fk_vocation_vocation_appearance1_idx\` ON \`vocation\``);
    await queryRunner.query(`DROP INDEX \`fk_vocation_ultimate1_idx\` ON \`vocation\``);
    await queryRunner.query(`DROP TABLE \`vocation\``);
    await queryRunner.query(`DROP INDEX \`fk_vocation_type_vocation1_idx\` ON \`vocation_type\``);
    await queryRunner.query(`DROP INDEX \`fk_vocation_type_type1_idx\` ON \`vocation_type\``);
    await queryRunner.query(`DROP TABLE \`vocation_type\``);
    await queryRunner.query(`DROP TABLE \`type\``);
    await queryRunner.query(`DROP INDEX \`fk_Object_type1_idx\` ON \`Object\``);
    await queryRunner.query(`DROP TABLE \`Object\``);
    await queryRunner.query(`DROP INDEX \`fk_Object_type_Object1_idx\` ON \`Object_type\``);
    await queryRunner.query(`DROP INDEX \`fk_Object_type_type1_idx\` ON \`Object_type\``);
    await queryRunner.query(`DROP TABLE \`Object_type\``);
    await queryRunner.query(`DROP INDEX \`fk_monster_loot_monster1_idx\` ON \`monster_loot\``);
    await queryRunner.query(`DROP INDEX \`fk_monster_loot_Object1_idx\` ON \`monster_loot\``);
    await queryRunner.query(`DROP TABLE \`monster_loot\``);
    await queryRunner.query(`DROP INDEX \`fk_loot_dungeon_session_dungeon_session1_idx\` ON \`loot_dungeon_session\``);
    await queryRunner.query(`DROP INDEX \`fk_loot_dungeon_session_character1_idx\` ON \`loot_dungeon_session\``);
    await queryRunner.query(`DROP INDEX \`fk_loot_dungeon_session_Object1_idx\` ON \`loot_dungeon_session\``);
    await queryRunner.query(`DROP TABLE \`loot_dungeon_session\``);
    await queryRunner.query(`DROP INDEX \`fk_dungeon_session_dungeon1_idx\` ON \`dungeon_session\``);
    await queryRunner.query(`DROP INDEX \`fk_dungeon_session_code1_idx\` ON \`dungeon_session\``);
    await queryRunner.query(`DROP INDEX \`fk_dungeon_session_uuid_idx\` ON \`dungeon_session\``);
    await queryRunner.query(`DROP TABLE \`dungeon_session\``);
    await queryRunner.query(`DROP INDEX \`fk_dungeon_session_statistics_dungeon_session1_idx\` ON \`dungeon_session_statistics\``);
    await queryRunner.query(`DROP INDEX \`fk_dungeon_session_statistics_character1_idx\` ON \`dungeon_session_statistics\``);
    await queryRunner.query(`DROP INDEX \`fk_dungeon_session_statistics_statistics1_idx\` ON \`dungeon_session_statistics\``);
    await queryRunner.query(`DROP TABLE \`dungeon_session_statistics\``);
    await queryRunner.query(`DROP INDEX \`fk_statistics_season1_idx\` ON \`statistics\``);
    await queryRunner.query(`DROP TABLE \`statistics\``);
    await queryRunner.query(`DROP TABLE \`season\``);
    await queryRunner.query(`DROP TABLE \`dungeon\``);
    await queryRunner.query(`DROP INDEX \`fk_dungeon_character_dungeon_session1_idx\` ON \`dungeon_character\``);
    await queryRunner.query(`DROP INDEX \`fk_dungeon_character_character1_idx\` ON \`dungeon_character\``);
    await queryRunner.query(`DROP TABLE \`dungeon_character\``);
    await queryRunner.query(`DROP INDEX \`fk_inventory_Object_inventory1_idx\` ON \`inventory_Object\``);
    await queryRunner.query(`DROP INDEX \`fk_inventory_Object_Object1_idx\` ON \`inventory_Object\``);
    await queryRunner.query(`DROP TABLE \`inventory_Object\``);
    await queryRunner.query(`DROP INDEX \`fk_inventory_inventory_level1_idx\` ON \`inventory\``);
    await queryRunner.query(`DROP INDEX \`fk_inventory_character1_idx\` ON \`inventory\``);
    await queryRunner.query(`DROP TABLE \`inventory\``);
    await queryRunner.query(`DROP INDEX \`fk_inventory_equipment_inventory1_idx\` ON \`inventory_equipment\``);
    await queryRunner.query(`DROP INDEX \`fk_inventory_equipment_equipment1_idx\` ON \`inventory_equipment\``);
    await queryRunner.query(`DROP TABLE \`inventory_equipment\``);
    await queryRunner.query(`DROP TABLE \`inventory_level\``);
    await queryRunner.query(`DROP INDEX \`fk_monster_type_monster1_idx\` ON \`monster_type\``);
    await queryRunner.query(`DROP INDEX \`fk_monster_type_type1_idx\` ON \`monster_type\``);
    await queryRunner.query(`DROP TABLE \`monster_type\``);
    await queryRunner.query(`DROP INDEX \`fk_equipment_type_equipment1_idx\` ON \`equipment_type\``);
    await queryRunner.query(`DROP INDEX \`fk_equipment_type_type1_idx\` ON \`equipment_type\``);
    await queryRunner.query(`DROP TABLE \`equipment_type\``);
    await queryRunner.query(`DROP INDEX \`fk_vocation_appearance_game_animation1_idx\` ON \`vocation_appearance\``);
    await queryRunner.query(`DROP TABLE \`vocation_appearance\``);
    await queryRunner.query(`DROP INDEX \`fk_ultimate_game_animation1_idx\` ON \`ultimate\``);
    await queryRunner.query(`DROP TABLE \`ultimate\``);
    await queryRunner.query(`DROP INDEX \`fk_monster_power_monster1_idx\` ON \`monster_power\``);
    await queryRunner.query(`DROP INDEX \`fk_monster_power_power1_idx\` ON \`monster_power\``);
    await queryRunner.query(`DROP TABLE \`monster_power\``);
    await queryRunner.query(`DROP INDEX \`fk_combat_phase_character_character1_idx\` ON \`combat_phase_character\``);
    await queryRunner.query(`DROP INDEX \`fk_combat_phase_character_combat_phase1_idx\` ON \`combat_phase_character\``);
    await queryRunner.query(`DROP TABLE \`combat_phase_character\``);
    await queryRunner.query(`DROP TABLE \`equipment_category\``);
    await queryRunner.query(`DROP INDEX \`fk_backup_position1_idx\` ON \`backup\``);
    await queryRunner.query(`DROP INDEX \`fk_backup_character1_idx\` ON \`backup\``);
    await queryRunner.query(`DROP TABLE \`backup\``);
    await queryRunner.query(`DROP INDEX \`fk_position_map1_idx\` ON \`position\``);
    await queryRunner.query(`DROP TABLE \`position\``);
    await queryRunner.query(`DROP TABLE \`map\``);
    await queryRunner.query(`DROP INDEX \`fk_event_map1_idx\` ON \`event\``);
    await queryRunner.query(`DROP TABLE \`event\``);
  }
}
