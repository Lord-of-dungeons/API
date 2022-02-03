-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 01 fév. 2022 à 08:47
-- Version du serveur :  8.0.27
-- Version de PHP : 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `lord_of_dungeons`
--

-- --------------------------------------------------------

--
-- Structure de la table `address`
--

CREATE TABLE `address` (
  `id_address` int NOT NULL,
  `city` varchar(100) NOT NULL,
  `zip_code` varchar(5) NOT NULL,
  `num_address` int NOT NULL,
  `street` varchar(255) NOT NULL,
  `country` varchar(45) DEFAULT 'France'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `address`
--

INSERT INTO `address` (`id_address`, `city`, `zip_code`, `num_address`, `street`, `country`) VALUES
(36, 'Rouen', '76001', 6, 'rue de la rue', 'France');

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

CREATE TABLE `article` (
  `id_article` int NOT NULL,
  `id_shop` int NOT NULL,
  `id_bill` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `backup`
--

CREATE TABLE `backup` (
  `id_backup` int NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_position` int NOT NULL,
  `character_id_character` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `base_feature`
--

CREATE TABLE `base_feature` (
  `id_base_feature` int NOT NULL,
  `health` int NOT NULL,
  `mana` int NOT NULL,
  `armor` int NOT NULL,
  `attack` int NOT NULL,
  `attack_speed` double NOT NULL DEFAULT '0',
  `critical` double NOT NULL DEFAULT '0',
  `wisdom` double NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `bill`
--

CREATE TABLE `bill` (
  `id_bill` int NOT NULL,
  `stripe_id` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `total_ttc` double NOT NULL,
  `promo` double NOT NULL DEFAULT '0',
  `date_create` datetime DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_user` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `character`
--

CREATE TABLE `character` (
  `id_character` int NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `xp` bigint NOT NULL DEFAULT '0',
  `fluz` bigint NOT NULL DEFAULT '0',
  `id_user` int NOT NULL,
  `is_dead` tinyint NOT NULL DEFAULT '0',
  `date_of_death` datetime DEFAULT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `character_equipment`
--

CREATE TABLE `character_equipment` (
  `id_character` int NOT NULL,
  `id_equipment` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `combat_phase`
--

CREATE TABLE `combat_phase` (
  `id_combat_phase` int NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `combat_phase_character`
--

CREATE TABLE `combat_phase_character` (
  `health` int NOT NULL,
  `mana` int NOT NULL,
  `latest_use_ulti` int NOT NULL DEFAULT '0',
  `id_character` int NOT NULL,
  `id_combat_phase` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `combat_phase_monster`
--

CREATE TABLE `combat_phase_monster` (
  `health` int NOT NULL,
  `mana` int NOT NULL,
  `latest_use_ulti` int NOT NULL DEFAULT '0',
  `id_monster` int NOT NULL,
  `id_combat_phase` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `combat_phase_special_feature`
--

CREATE TABLE `combat_phase_special_feature` (
  `duration_remaining` int NOT NULL DEFAULT '1',
  `id_special_feature` int NOT NULL,
  `id_combat_phase` int NOT NULL,
  `id_character` int DEFAULT NULL,
  `id_monster` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `dungeon`
--

CREATE TABLE `dungeon` (
  `id_dungeon` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `map_path` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `version` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `dungeon_character`
--

CREATE TABLE `dungeon_character` (
  `id_dungeon_session` int NOT NULL,
  `id_character` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `dungeon_session`
--

CREATE TABLE `dungeon_session` (
  `id_dungeon_session` int NOT NULL,
  `uuid` varchar(45) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_dungeon` int NOT NULL,
  `code` varchar(6) NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `lobby_phase` tinyint NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `dungeon_session_statistics`
--

CREATE TABLE `dungeon_session_statistics` (
  `id_dungeon_session` int NOT NULL,
  `id_character` int NOT NULL,
  `id_statistics` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `equipment`
--

CREATE TABLE `equipment` (
  `id_equipment` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_legendary` tinyint NOT NULL DEFAULT '0',
  `img_path` varchar(255) NOT NULL,
  `id_equipment_category` int NOT NULL,
  `id_special_feature` int DEFAULT NULL,
  `id_base_feature` int NOT NULL,
  `price` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `equipment_category`
--

CREATE TABLE `equipment_category` (
  `id_equipment_category` int NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `equipment_type`
--

CREATE TABLE `equipment_type` (
  `id_equipment` int NOT NULL,
  `id_type` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

CREATE TABLE `event` (
  `id_event` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `id_map` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `game_animation`
--

CREATE TABLE `game_animation` (
  `id_game_animation` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `inventory`
--

CREATE TABLE `inventory` (
  `id_inventory` int NOT NULL,
  `id_inventory_level` int NOT NULL,
  `id_character` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `inventory_equipment`
--

CREATE TABLE `inventory_equipment` (
  `id_inventory` int NOT NULL,
  `id_equipment` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `inventory_level`
--

CREATE TABLE `inventory_level` (
  `id_inventory_level` int NOT NULL,
  `level` int NOT NULL DEFAULT '1',
  `item_max` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `inventory_object`
--

CREATE TABLE `inventory_object` (
  `id_inventory` int NOT NULL,
  `id_object` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `loot_dungeon_session`
--

CREATE TABLE `loot_dungeon_session` (
  `id_dungeon_session` int NOT NULL,
  `id_character` int NOT NULL,
  `id_object` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `map`
--

CREATE TABLE `map` (
  `id_map` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `map_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int NOT NULL,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1, 1639242339221, 'Initialisation1639242339221'),
(2, 1639940186650, 'userV11639940186650'),
(3, 1639940450749, 'userV21639940450749'),
(4, 1639940701778, 'userV31639940701778'),
(5, 1639940996037, 'addressV11639940996037'),
(6, 1639941191953, 'userV41639941191953'),
(7, 1640029432059, 'userV51640029432059'),
(8, 1640029432059, 'userV41640029432059'),
(9, 1640199861754, 'userV61640199861754'),
(10, 1640623862071, 'userV71640623862071'),
(11, 1642948845215, 'baseFeature1642948845215'),
(12, 1642948914765, 'baseFeatureIndex1642948914765'),
(13, 1642950571417, 'monsterBaseFeature1642950571417'),
(14, 1642950731413, 'object1642950731413'),
(15, 1643136525093, 'billArticleUserCharacterArticle1643136525093'),
(16, 1643148002696, 'objectRefactorisation1643148002696'),
(17, 1643148228706, 'inventoryObjectRefactorisation1643148228706'),
(18, 1643705006253, 'appearance1643705006253');

-- --------------------------------------------------------

--
-- Structure de la table `monster`
--

CREATE TABLE `monster` (
  `id_monster` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `version` int NOT NULL,
  `max_loot_item` int NOT NULL DEFAULT '1',
  `xp` int NOT NULL DEFAULT '1',
  `ultimate_ratio` double NOT NULL DEFAULT '0',
  `id_monster_appearance` int NOT NULL,
  `id_base_feature` int NOT NULL,
  `id_ultimate` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `monster_appearance`
--

CREATE TABLE `monster_appearance` (
  `id_monster_appearance` int NOT NULL,
  `img_path` varchar(255) NOT NULL,
  `version` int NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_game_animation` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `monster_loot`
--

CREATE TABLE `monster_loot` (
  `probability` double NOT NULL DEFAULT '0',
  `id_monster` int NOT NULL,
  `id_object` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `monster_power`
--

CREATE TABLE `monster_power` (
  `img_path` varchar(255) NOT NULL,
  `coeff` double NOT NULL DEFAULT '1',
  `id_monster` int NOT NULL,
  `id_power` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `monster_type`
--

CREATE TABLE `monster_type` (
  `up_per_level` int NOT NULL DEFAULT '1',
  `id_monster` int NOT NULL,
  `id_type` int NOT NULL,
  `base` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `object`
--

CREATE TABLE `object` (
  `id_object` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `img_path` varchar(255) NOT NULL,
  `id_type` int NOT NULL,
  `price` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `object_type`
--

CREATE TABLE `object_type` (
  `base` int NOT NULL,
  `id_object` int NOT NULL,
  `id_type` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `position`
--

CREATE TABLE `position` (
  `id_position` int NOT NULL,
  `x` int NOT NULL,
  `y` int NOT NULL,
  `id_map` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `power`
--

CREATE TABLE `power` (
  `id_power` int NOT NULL,
  `mana` int NOT NULL DEFAULT '0',
  `base` double NOT NULL DEFAULT '1',
  `version` int NOT NULL,
  `id_special_feature` int DEFAULT NULL,
  `id_game_animation` int NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `season`
--

CREATE TABLE `season` (
  `id_season` int NOT NULL,
  `year` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `shop`
--

CREATE TABLE `shop` (
  `id_shop` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `price` double NOT NULL DEFAULT '0',
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `version` int NOT NULL,
  `img_path` varchar(255) NOT NULL,
  `description` text,
  `promo` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `special_feature`
--

CREATE TABLE `special_feature` (
  `id_special_feature` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `version` int NOT NULL,
  `probability` double NOT NULL DEFAULT '0',
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `base` double NOT NULL DEFAULT '1',
  `duration` int NOT NULL DEFAULT '0',
  `coeff` double NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `special_shop`
--

CREATE TABLE `special_shop` (
  `id_special_shop` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `price` double NOT NULL DEFAULT '0',
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `version` int NOT NULL,
  `img_path` varchar(255) NOT NULL,
  `description` text,
  `promo` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `statistics`
--

CREATE TABLE `statistics` (
  `id_statistics` int NOT NULL,
  `kill` int NOT NULL DEFAULT '0',
  `death` int NOT NULL DEFAULT '0',
  `level_start` int NOT NULL DEFAULT '1',
  `level_end` int NOT NULL DEFAULT '1',
  `playing_time` bigint NOT NULL DEFAULT '0',
  `id_season` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `type`
--

CREATE TABLE `type` (
  `id_type` int NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `ultimate`
--

CREATE TABLE `ultimate` (
  `id_ultimate` int NOT NULL,
  `mana` int NOT NULL DEFAULT '0',
  `base` double NOT NULL DEFAULT '1',
  `version` int NOT NULL,
  `img_path` varchar(255) NOT NULL,
  `id_game_animation` int DEFAULT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_user` int NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `pseudo` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `facebook_id` varchar(45) DEFAULT NULL,
  `google_id` varchar(45) DEFAULT NULL,
  `github_id` varchar(45) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `newsletter` tinyint NOT NULL DEFAULT '1',
  `date_create` datetime DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_address` int DEFAULT NULL,
  `birthday` date NOT NULL,
  `profile_picture_path` varchar(255) NOT NULL,
  `role` enum('USER','ADMIN','EMPLOYEE') NOT NULL,
  `token` varchar(1000) DEFAULT NULL,
  `number_pseudo_changed` int NOT NULL DEFAULT '1',
  `diamz` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `firstname`, `lastname`, `pseudo`, `email`, `password`, `facebook_id`, `google_id`, `github_id`, `refresh_token`, `newsletter`, `date_create`, `date_update`, `id_address`, `birthday`, `profile_picture_path`, `role`, `token`, `number_pseudo_changed`, `diamz`) VALUES
(4, 'Adrien', 'Maillardddd', 'adr', 'adri_000@hotmail.fr', '$argon2i$v=19$m=4096,t=3,p=1$hYTzv3zu/vhUvQ$XofNgIFyJeT+fVy4ehye715UL6kjLHU2Y1zKa6DZFU8', NULL, NULL, NULL, '3bbce5a4-7ef1-4296-8dc3-320b5245c772', 1, '2021-12-19 20:13:46', '2022-01-03 19:54:49', 36, '1997-05-23', '/api/public/avatars/1.png', 'USER', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NjUxOTIuMjUwMTQ3Mjg5NSIsImVtYWlsIjoiYWRyaV8wMDBAaG90bWFpbC5mciIsImZpcnN0bmFtZSI6IkFkcmllbiIsInBzZXVkbyI6ImFkciIsImlhdCI6MTY0MTIzNjA4OSwiZXhwIjoxNjQxMzIyNDg5LCJhdWQiOiJsb2NhbGhvc3QiLCJpc3MiOiJMb3JkIG9mIER1bmdlb25zIn0.F-vicsxinPHAyfFjFTNCje0elVPqYCjPfyR2k7bqh0-iHqpycQNwoUbzmVF7un_esQNr6p47vAblMww37s5jEb259cZHu8CDmxRv3zGjF1C7hoMJ1AXtUbDiA-VeMdV3FJulE9A0Go0LF0erjUJwC-_P5LYUO4C8aIbpvdQtHv9lkFJqwT0IAgRb9GG15_AtDfvS_-9z1hxL7oOKLur79VEJ6oM4PUKh_UZbaHGxqO1sRNt4-nsqp5QTWO8gz7iSFlLi5OdZKmb9ASjG8oO1Rcfsky3wYaJeK7YL2orRbo4S24sJ8uLrc2-YOnYO6o3hcYE9f0qDXFhQEbEEmVO-OQ', 1, 0),
(5, 'prenom', 'nom', 'test', 'adrien.mlld@laposte.net', '$argon2i$v=19$m=4096,t=3,p=1$8/ojgNcw9SX0MQ$rMyy3yuxMZQq+0CxkUcmv6AsUw8XCsG+d9jz92hyVow', NULL, NULL, NULL, 'dd7ca139-0e29-4909-8f11-4f680798a806', 1, '2022-01-01 17:36:17', '2022-01-01 17:36:17', NULL, '2015-01-08', '/api/public/avatars/1.png', 'USER', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NjUxOTIuMjUwMTQ3Mjg5NSIsImVtYWlsIjoiYWRyaWVuLm1sZEBsYXBvc3RlLm5ldCIsImZpcnN0bmFtZSI6InByZW5vbSIsInBzZXVkbyI6InRlc3QiLCJpYXQiOjE2NDEwNTQ5NzcsImV4cCI6MTY0MTE0MTM3NywiYXVkIjoiMTkyLjE2OC4wLjIxIiwiaXNzIjoiTG9yZCBvZiBEdW5nZW9ucyJ9.HhG1PeZPhzU-sTf8Kex188yDh3bTG73vH9ZbsV97bfpKjjY7oYQ1ugh7EsLcLtRyYAGUFEw23_18d9fvkM-Z0yaip5RH5HZ9p1eJ30L7BzQAutmr0Dq8w8bcUEUWHQcSVTNpUR3nlc_Pj4YpjWWd_VYGJUvWT7ondvEZYfTX0sWV93W9ieJBrwUBgn3WjkLNhUkunKd4UUsoopBVpAPENTFL2wkpEnZgJjDcIisRSZm6XG_BWLY6Kt1ynVy_p_H73T6TuTT-I4o83ws9w89ckCBxUKBGXdy8gzICG7sb633_uhuwNf3RcI5s2LFW-aJRWPM3qQTscBr0gYWdTadeHg', 1, 0),
(6, 'Adrien', 'Maillard', 'azertyuiop', 'adri_00@hotmail.fr', '$argon2i$v=19$m=4096,t=3,p=1$jpoljQLj7xkNWg$2vNjvKxUA+/Ac1ZENdgzj+M1j2KqTrqRVfKMQFa67BY', '5120820677962054', NULL, NULL, '2f0be173-8fe2-4ce7-bd17-8a5a36a39f65', 1, '2022-01-02 17:37:33', '2022-01-30 18:04:29', NULL, '2015-01-01', '/api/public/avatars/1.png', 'USER', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NjUxOTIuMjUwMTQ3Mjg5NSIsImVtYWlsIjoiYWRyaV8wMEBob3RtYWlsLmZyIiwiZmlyc3RuYW1lIjoiQWRyaWVuIiwicHNldWRvIjoiYXplcnR5dWlvcCIsImlhdCI6MTY0MzU2MjI2OCwiZXhwIjoxNjQzNjQ4NjY4LCJhdWQiOiIxOTIuMTY4LjAuMjEiLCJpc3MiOiJMb3JkIG9mIER1bmdlb25zIn0.VAWjT6G-ZUQjufCMxHY0tiMxiApFsiWRYsMitEYPWjDRY0JAvbpK8q4nGbfPvhbdWFgLGi2YLJiS7cZIkVYEZaXtmAHDLTWZNwM0xUjMt_L8BF28atM_2Kxbg7FDzT19R_fGUAQbcV2pPFdMbFkWnU7AZ74t7ZNRScSExBS26YrJEBQXsI0OWKYknakaNzDrccsLNAfrbndodTAVj61t3cLBXUrJTcKuUzYCjL6ZVvhqIORG_UsjyEDsxrtrODiGTAUPQ3oB4VrmPIffBfjKpyBNOp7otn8zbJWRtQM3EpsV5Umi6vllVlNGWLGlc0qEoEgoMG0tQUBAn3ebDQgTRw', 1, 0),
(7, 'Adrien', 'Maillard', 'jean-pseudo', 'adrien.maillard97@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$wDM8Cy2Y5jCsYg$wjflmqmIT/JHz4vChV5KQScyAyIet0kHK2WxDWZ2Mq0', NULL, '112054321568795207641', NULL, NULL, 1, '2022-01-04 20:10:25', '2022-01-30 16:21:21', NULL, '2015-01-01', '/api/public/avatars/1.png', 'USER', NULL, 1, 0),
(8, 'Adrien', 'M.', 'AdrienXIV', 'adrien.mld@laposte.net', '$argon2i$v=19$m=4096,t=3,p=1$pi0aIsiVwkZCUg$LKBWX93k/7foq0vLwwX1WPeLBZKitMRbyGVIhGILNGw', NULL, NULL, '46677907', 'bf558da4-b98c-45a2-be1d-7d09cd669273', 1, '2022-01-05 19:15:28', '2022-01-05 19:16:59', NULL, '2015-01-01', '/api/public/avatars/1.png', 'USER', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NjUxOTIuMjUwMTQ3Mjg5NSIsImVtYWlsIjoiYWRyaWVuLm1sZEBsYXBvc3RlLm5ldCIsImZpcnN0bmFtZSI6IkFkcmllbiIsInBzZXVkbyI6IkFkcmllblhJViIsImlhdCI6MTY0MTQwNjYxOCwiZXhwIjoxNjQxNDkzMDE4LCJhdWQiOiIxOTIuMTY4LjAuMjEiLCJpc3MiOiJMb3JkIG9mIER1bmdlb25zIn0.b4eTriD7R73G5Wz6kEu3k0WJi_wi0YyupkgQun6UfXxPdREw7HRTzLcTCg8rfqzWgHli1PBmmgschVZ3nKd3iwbYe-vo45vOAH91EdRvxnf8FgaK7dVdothu1j9J1QkuTwBD-DrDDJXdkb7-TGwVTV59CKKfphcywPzrfwZ-1igkj-AsSbJeQh8MHE7VNAMVHTy5vsMtVfo_vapeHV076o-qQzD12HHvRjwoAcZNKpuW2FVUDY31FMHxYoEMc0ck1WBtJKxb2wBjVspn0krhet3GJ_Q90ukC8JJHnJZtBqro4vqpkOVGe5QEWkmMKT3_rNcsWPPzQmo8xKGDzfSnew', 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `user_character`
--

CREATE TABLE `user_character` (
  `id_user` int NOT NULL,
  `id_character` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `user_character_article`
--

CREATE TABLE `user_character_article` (
  `id_user` int NOT NULL,
  `id_article` int NOT NULL,
  `id_character` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `user_friends`
--

CREATE TABLE `user_friends` (
  `friend_pseudo` varchar(45) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_user` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `vocation`
--

CREATE TABLE `vocation` (
  `id_vocation` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `version` int NOT NULL,
  `id_vocation_appearance` int NOT NULL,
  `id_base_feature` int NOT NULL,
  `id_ultimate` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `vocation_appearance`
--

CREATE TABLE `vocation_appearance` (
  `id_vocation_appearance` int NOT NULL,
  `img_path` varchar(255) NOT NULL,
  `version` int NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_game_animation` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `vocation_power`
--

CREATE TABLE `vocation_power` (
  `img_path` varchar(255) NOT NULL,
  `coeff` double NOT NULL DEFAULT '0',
  `id_vocation` int NOT NULL,
  `id_power` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `vocation_type`
--

CREATE TABLE `vocation_type` (
  `up_per_level` int NOT NULL DEFAULT '1',
  `id_vocation` int NOT NULL,
  `id_type` int NOT NULL,
  `base` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id_address`),
  ADD KEY `city_idx` (`city`),
  ADD KEY `zip_code_idx` (`zip_code`);

--
-- Index pour la table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id_article`),
  ADD KEY `fk_article_shop_idx` (`id_shop`),
  ADD KEY `fk_article_bill_idx` (`id_bill`);

--
-- Index pour la table `backup`
--
ALTER TABLE `backup`
  ADD PRIMARY KEY (`id_backup`),
  ADD KEY `fk_backup_character1_idx` (`character_id_character`),
  ADD KEY `fk_backup_position1_idx` (`id_position`);

--
-- Index pour la table `base_feature`
--
ALTER TABLE `base_feature`
  ADD PRIMARY KEY (`id_base_feature`);

--
-- Index pour la table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`id_bill`),
  ADD KEY `fk_bill_code_idx` (`code`),
  ADD KEY `fk_bill_user_idx` (`id_user`),
  ADD KEY `fk_bill_stripe_id_idx` (`stripe_id`);

--
-- Index pour la table `character`
--
ALTER TABLE `character`
  ADD PRIMARY KEY (`id_character`),
  ADD KEY `fk_character_user1_idx` (`id_user`);

--
-- Index pour la table `character_equipment`
--
ALTER TABLE `character_equipment`
  ADD PRIMARY KEY (`id_character`),
  ADD KEY `fk_character_equipment_equipment1_idx` (`id_equipment`),
  ADD KEY `fk_character_equipment_character1_idx` (`id_character`);

--
-- Index pour la table `combat_phase`
--
ALTER TABLE `combat_phase`
  ADD PRIMARY KEY (`id_combat_phase`);

--
-- Index pour la table `combat_phase_character`
--
ALTER TABLE `combat_phase_character`
  ADD PRIMARY KEY (`id_combat_phase`),
  ADD KEY `fk_combat_phase_character_combat_phase1_idx` (`id_combat_phase`),
  ADD KEY `fk_combat_phase_character_character1_idx` (`id_character`);

--
-- Index pour la table `combat_phase_monster`
--
ALTER TABLE `combat_phase_monster`
  ADD PRIMARY KEY (`id_combat_phase`),
  ADD KEY `fk_combat_phase_monster_combat_phase1_idx` (`id_combat_phase`),
  ADD KEY `fk_combat_phase_monster_monster1_idx` (`id_monster`);

--
-- Index pour la table `combat_phase_special_feature`
--
ALTER TABLE `combat_phase_special_feature`
  ADD PRIMARY KEY (`id_combat_phase`),
  ADD KEY `fk_combat_phase_special_feature_monster1_idx` (`id_monster`),
  ADD KEY `fk_combat_phase_special_feature_character1_idx` (`id_character`),
  ADD KEY `fk_combat_phase_special_feature_combat_phase1_idx` (`id_combat_phase`),
  ADD KEY `fk_combat_phase_special_feature_special_feature1_idx` (`id_special_feature`);

--
-- Index pour la table `dungeon`
--
ALTER TABLE `dungeon`
  ADD PRIMARY KEY (`id_dungeon`);

--
-- Index pour la table `dungeon_character`
--
ALTER TABLE `dungeon_character`
  ADD PRIMARY KEY (`id_dungeon_session`),
  ADD KEY `fk_dungeon_character_character1_idx` (`id_character`),
  ADD KEY `fk_dungeon_character_dungeon_session1_idx` (`id_dungeon_session`);

--
-- Index pour la table `dungeon_session`
--
ALTER TABLE `dungeon_session`
  ADD PRIMARY KEY (`id_dungeon_session`),
  ADD KEY `fk_dungeon_session_uuid_idx` (`uuid`),
  ADD KEY `fk_dungeon_session_code1_idx` (`code`),
  ADD KEY `fk_dungeon_session_dungeon1_idx` (`id_dungeon`);

--
-- Index pour la table `dungeon_session_statistics`
--
ALTER TABLE `dungeon_session_statistics`
  ADD PRIMARY KEY (`id_dungeon_session`),
  ADD KEY `fk_dungeon_session_statistics_statistics1_idx` (`id_statistics`),
  ADD KEY `fk_dungeon_session_statistics_character1_idx` (`id_character`),
  ADD KEY `fk_dungeon_session_statistics_dungeon_session1_idx` (`id_dungeon_session`);

--
-- Index pour la table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id_equipment`),
  ADD KEY `fk_equipment_special_feature1_idx` (`id_special_feature`),
  ADD KEY `fk_equipment_equipment_category1_idx` (`id_equipment_category`);

--
-- Index pour la table `equipment_category`
--
ALTER TABLE `equipment_category`
  ADD PRIMARY KEY (`id_equipment_category`);

--
-- Index pour la table `equipment_type`
--
ALTER TABLE `equipment_type`
  ADD PRIMARY KEY (`id_equipment`),
  ADD KEY `fk_equipment_type_type1_idx` (`id_type`),
  ADD KEY `fk_equipment_type_equipment1_idx` (`id_equipment`);

--
-- Index pour la table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id_event`),
  ADD KEY `fk_event_map1_idx` (`id_map`);

--
-- Index pour la table `game_animation`
--
ALTER TABLE `game_animation`
  ADD PRIMARY KEY (`id_game_animation`);

--
-- Index pour la table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id_inventory`),
  ADD KEY `fk_inventory_character1_idx` (`id_character`),
  ADD KEY `fk_inventory_inventory_level1_idx` (`id_inventory_level`);

--
-- Index pour la table `inventory_equipment`
--
ALTER TABLE `inventory_equipment`
  ADD PRIMARY KEY (`id_inventory`),
  ADD KEY `fk_inventory_equipment_equipment1_idx` (`id_equipment`),
  ADD KEY `fk_inventory_equipment_inventory1_idx` (`id_inventory`);

--
-- Index pour la table `inventory_level`
--
ALTER TABLE `inventory_level`
  ADD PRIMARY KEY (`id_inventory_level`);

--
-- Index pour la table `inventory_object`
--
ALTER TABLE `inventory_object`
  ADD PRIMARY KEY (`id_inventory`),
  ADD KEY `fk_inventory_Object_Object1_idx` (`id_object`),
  ADD KEY `fk_inventory_Object_inventory1_idx` (`id_inventory`);

--
-- Index pour la table `loot_dungeon_session`
--
ALTER TABLE `loot_dungeon_session`
  ADD PRIMARY KEY (`id_dungeon_session`),
  ADD KEY `fk_loot_dungeon_session_character1_idx` (`id_character`),
  ADD KEY `fk_loot_dungeon_session_dungeon_session1_idx` (`id_dungeon_session`),
  ADD KEY `fk_loot_dungeon_session_Object1_idx` (`id_object`);

--
-- Index pour la table `map`
--
ALTER TABLE `map`
  ADD PRIMARY KEY (`id_map`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `monster`
--
ALTER TABLE `monster`
  ADD PRIMARY KEY (`id_monster`),
  ADD UNIQUE KEY `REL_22e032f7eee5cd2977601dda03` (`id_base_feature`),
  ADD KEY `fk_monster_ultimate1_idx` (`id_ultimate`),
  ADD KEY `fk_monster_monster_appearance1_idx` (`id_monster_appearance`);

--
-- Index pour la table `monster_appearance`
--
ALTER TABLE `monster_appearance`
  ADD PRIMARY KEY (`id_monster_appearance`),
  ADD KEY `fk_monster_appearance_game_animation1_idx` (`id_game_animation`);

--
-- Index pour la table `monster_loot`
--
ALTER TABLE `monster_loot`
  ADD PRIMARY KEY (`id_monster`),
  ADD KEY `fk_monster_loot_monster1_idx` (`id_monster`),
  ADD KEY `fk_monster_loot_Object1_idx` (`id_object`);

--
-- Index pour la table `monster_power`
--
ALTER TABLE `monster_power`
  ADD PRIMARY KEY (`id_monster`),
  ADD KEY `fk_monster_power_power1_idx` (`id_power`),
  ADD KEY `fk_monster_power_monster1_idx` (`id_monster`);

--
-- Index pour la table `monster_type`
--
ALTER TABLE `monster_type`
  ADD PRIMARY KEY (`id_monster`),
  ADD KEY `fk_monster_type_type1_idx` (`id_type`),
  ADD KEY `fk_monster_type_monster1_idx` (`id_monster`);

--
-- Index pour la table `object`
--
ALTER TABLE `object`
  ADD PRIMARY KEY (`id_object`),
  ADD KEY `fk_Object_type1_idx` (`id_type`);

--
-- Index pour la table `object_type`
--
ALTER TABLE `object_type`
  ADD PRIMARY KEY (`id_object`),
  ADD KEY `fk_Object_type_type1_idx` (`id_type`),
  ADD KEY `fk_Object_type_Object1_idx` (`id_object`);

--
-- Index pour la table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`id_position`),
  ADD KEY `fk_position_map1_idx` (`id_map`);

--
-- Index pour la table `power`
--
ALTER TABLE `power`
  ADD PRIMARY KEY (`id_power`),
  ADD KEY `fk_power_game_animation1_idx` (`id_game_animation`),
  ADD KEY `fk_power_special_feature1_idx` (`id_special_feature`);

--
-- Index pour la table `season`
--
ALTER TABLE `season`
  ADD PRIMARY KEY (`id_season`);

--
-- Index pour la table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id_shop`);

--
-- Index pour la table `special_feature`
--
ALTER TABLE `special_feature`
  ADD PRIMARY KEY (`id_special_feature`);

--
-- Index pour la table `special_shop`
--
ALTER TABLE `special_shop`
  ADD PRIMARY KEY (`id_special_shop`);

--
-- Index pour la table `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`id_statistics`),
  ADD KEY `fk_statistics_season1_idx` (`id_season`);

--
-- Index pour la table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id_type`);

--
-- Index pour la table `ultimate`
--
ALTER TABLE `ultimate`
  ADD PRIMARY KEY (`id_ultimate`),
  ADD KEY `fk_ultimate_game_animation1_idx` (`id_game_animation`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `pseudo_UNIQUE` (`pseudo`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `IDX_be726a825c7254f55be1540601` (`pseudo`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  ADD UNIQUE KEY `fk_user_refresh_token_idx` (`refresh_token`),
  ADD UNIQUE KEY `REL_addde50949464eeaefe11ad769` (`id_address`),
  ADD UNIQUE KEY `fk_user_token_idx` (`token`),
  ADD KEY `fk_user_address_idx` (`id_address`);

--
-- Index pour la table `user_character`
--
ALTER TABLE `user_character`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `fk_user_character_character1_idx` (`id_character`),
  ADD KEY `fk_user_character_user1_idx` (`id_user`);

--
-- Index pour la table `user_character_article`
--
ALTER TABLE `user_character_article`
  ADD PRIMARY KEY (`id_user`,`id_article`),
  ADD KEY `fk_user_character_article_user_idx` (`id_user`),
  ADD KEY `fk_user_character_article_character_idx` (`id_character`),
  ADD KEY `fk_user_character_article_article_idx` (`id_article`);

--
-- Index pour la table `user_friends`
--
ALTER TABLE `user_friends`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `fk_user_friends_user1_idx` (`id_user`);

--
-- Index pour la table `vocation`
--
ALTER TABLE `vocation`
  ADD PRIMARY KEY (`id_vocation`),
  ADD UNIQUE KEY `REL_a20bf2c528cfb4712a13cd4996` (`id_base_feature`),
  ADD KEY `fk_vocation_ultimate1_idx` (`id_ultimate`),
  ADD KEY `fk_vocation_vocation_appearance1_idx` (`id_vocation_appearance`),
  ADD KEY `fk_vocation_base_feature1_idx` (`id_base_feature`);

--
-- Index pour la table `vocation_appearance`
--
ALTER TABLE `vocation_appearance`
  ADD PRIMARY KEY (`id_vocation_appearance`),
  ADD KEY `fk_vocation_appearance_game_animation1_idx` (`id_game_animation`);

--
-- Index pour la table `vocation_power`
--
ALTER TABLE `vocation_power`
  ADD PRIMARY KEY (`id_vocation`),
  ADD KEY `fk_vocation_power_power1_idx` (`id_power`),
  ADD KEY `fk_vocation_power_vocation1_idx` (`id_vocation`);

--
-- Index pour la table `vocation_type`
--
ALTER TABLE `vocation_type`
  ADD PRIMARY KEY (`id_vocation`),
  ADD KEY `fk_vocation_type_type1_idx` (`id_type`),
  ADD KEY `fk_vocation_type_vocation1_idx` (`id_vocation`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `address`
--
ALTER TABLE `address`
  MODIFY `id_address` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT pour la table `article`
--
ALTER TABLE `article`
  MODIFY `id_article` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `backup`
--
ALTER TABLE `backup`
  MODIFY `id_backup` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `base_feature`
--
ALTER TABLE `base_feature`
  MODIFY `id_base_feature` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `bill`
--
ALTER TABLE `bill`
  MODIFY `id_bill` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `character`
--
ALTER TABLE `character`
  MODIFY `id_character` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `combat_phase`
--
ALTER TABLE `combat_phase`
  MODIFY `id_combat_phase` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `dungeon`
--
ALTER TABLE `dungeon`
  MODIFY `id_dungeon` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `dungeon_session`
--
ALTER TABLE `dungeon_session`
  MODIFY `id_dungeon_session` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id_equipment` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `equipment_category`
--
ALTER TABLE `equipment_category`
  MODIFY `id_equipment_category` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `event`
--
ALTER TABLE `event`
  MODIFY `id_event` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `game_animation`
--
ALTER TABLE `game_animation`
  MODIFY `id_game_animation` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id_inventory` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `inventory_level`
--
ALTER TABLE `inventory_level`
  MODIFY `id_inventory_level` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `map`
--
ALTER TABLE `map`
  MODIFY `id_map` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `monster`
--
ALTER TABLE `monster`
  MODIFY `id_monster` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `monster_appearance`
--
ALTER TABLE `monster_appearance`
  MODIFY `id_monster_appearance` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `object`
--
ALTER TABLE `object`
  MODIFY `id_object` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `position`
--
ALTER TABLE `position`
  MODIFY `id_position` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `power`
--
ALTER TABLE `power`
  MODIFY `id_power` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `season`
--
ALTER TABLE `season`
  MODIFY `id_season` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `shop`
--
ALTER TABLE `shop`
  MODIFY `id_shop` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `special_feature`
--
ALTER TABLE `special_feature`
  MODIFY `id_special_feature` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `special_shop`
--
ALTER TABLE `special_shop`
  MODIFY `id_special_shop` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `statistics`
--
ALTER TABLE `statistics`
  MODIFY `id_statistics` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `type`
--
ALTER TABLE `type`
  MODIFY `id_type` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `ultimate`
--
ALTER TABLE `ultimate`
  MODIFY `id_ultimate` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `vocation`
--
ALTER TABLE `vocation`
  MODIFY `id_vocation` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `vocation_appearance`
--
ALTER TABLE `vocation_appearance`
  MODIFY `id_vocation_appearance` int NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `FK_0d62ea63b797b14b246157fc0a2` FOREIGN KEY (`id_bill`) REFERENCES `bill` (`id_bill`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `FK_6c723f4d2c80aa2af93f990ff93` FOREIGN KEY (`id_shop`) REFERENCES `shop` (`id_shop`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `backup`
--
ALTER TABLE `backup`
  ADD CONSTRAINT `FK_de866040ef312a9a3261329bf93` FOREIGN KEY (`id_position`) REFERENCES `position` (`id_position`),
  ADD CONSTRAINT `FK_e2dd0872274eebdeae0947e579c` FOREIGN KEY (`character_id_character`) REFERENCES `character` (`id_character`);

--
-- Contraintes pour la table `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `FK_6498532ac094ed754c680d064e1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `character`
--
ALTER TABLE `character`
  ADD CONSTRAINT `FK_2825420c8093e83e73c2c2e1556` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Contraintes pour la table `character_equipment`
--
ALTER TABLE `character_equipment`
  ADD CONSTRAINT `FK_00c245ef9fea34cfb41549ee15c` FOREIGN KEY (`id_equipment`) REFERENCES `equipment` (`id_equipment`),
  ADD CONSTRAINT `FK_ad64bba849ec9892ad3215f28d2` FOREIGN KEY (`id_character`) REFERENCES `character` (`id_character`);

--
-- Contraintes pour la table `combat_phase_character`
--
ALTER TABLE `combat_phase_character`
  ADD CONSTRAINT `FK_4fcec9105cb71fb770753465bf2` FOREIGN KEY (`id_character`) REFERENCES `character` (`id_character`),
  ADD CONSTRAINT `FK_edca797265770dfc8964ff515b8` FOREIGN KEY (`id_combat_phase`) REFERENCES `combat_phase` (`id_combat_phase`);

--
-- Contraintes pour la table `combat_phase_monster`
--
ALTER TABLE `combat_phase_monster`
  ADD CONSTRAINT `FK_d91c628baf509e26626b941c806` FOREIGN KEY (`id_monster`) REFERENCES `monster` (`id_monster`),
  ADD CONSTRAINT `FK_f745c895acd6f27dadfce4c44e3` FOREIGN KEY (`id_combat_phase`) REFERENCES `combat_phase` (`id_combat_phase`);

--
-- Contraintes pour la table `combat_phase_special_feature`
--
ALTER TABLE `combat_phase_special_feature`
  ADD CONSTRAINT `FK_62ae0a904cc307c18af416028dc` FOREIGN KEY (`id_monster`) REFERENCES `monster` (`id_monster`),
  ADD CONSTRAINT `FK_9cb08062c34f97fd6a3b89ce4ae` FOREIGN KEY (`id_combat_phase`) REFERENCES `combat_phase` (`id_combat_phase`),
  ADD CONSTRAINT `FK_9ce20631c5bbff5557f03d49638` FOREIGN KEY (`id_character`) REFERENCES `character` (`id_character`),
  ADD CONSTRAINT `FK_df56af6b406e872f73f3e826d37` FOREIGN KEY (`id_special_feature`) REFERENCES `special_feature` (`id_special_feature`);

--
-- Contraintes pour la table `dungeon_character`
--
ALTER TABLE `dungeon_character`
  ADD CONSTRAINT `FK_3247193a248cbe577bf57131fba` FOREIGN KEY (`id_character`) REFERENCES `character` (`id_character`),
  ADD CONSTRAINT `FK_67ffda531648550c01fbc59b140` FOREIGN KEY (`id_dungeon_session`) REFERENCES `dungeon_session` (`id_dungeon_session`);

--
-- Contraintes pour la table `dungeon_session`
--
ALTER TABLE `dungeon_session`
  ADD CONSTRAINT `FK_d0b16ca081d2d24175fce88a162` FOREIGN KEY (`id_dungeon`) REFERENCES `dungeon` (`id_dungeon`);

--
-- Contraintes pour la table `dungeon_session_statistics`
--
ALTER TABLE `dungeon_session_statistics`
  ADD CONSTRAINT `FK_9a8e04694b025b9c5128d3b09db` FOREIGN KEY (`id_statistics`) REFERENCES `statistics` (`id_statistics`),
  ADD CONSTRAINT `FK_c13e79b88db0180c87c85381a11` FOREIGN KEY (`id_dungeon_session`) REFERENCES `dungeon_session` (`id_dungeon_session`),
  ADD CONSTRAINT `FK_d4bec797886e5e756bee6070c85` FOREIGN KEY (`id_character`) REFERENCES `character` (`id_character`);

--
-- Contraintes pour la table `equipment`
--
ALTER TABLE `equipment`
  ADD CONSTRAINT `FK_4b627e976f1b372ab5e72b05b13` FOREIGN KEY (`id_equipment_category`) REFERENCES `equipment_category` (`id_equipment_category`),
  ADD CONSTRAINT `FK_6b573f64b831274635be33ce456` FOREIGN KEY (`id_special_feature`) REFERENCES `special_feature` (`id_special_feature`);

--
-- Contraintes pour la table `equipment_type`
--
ALTER TABLE `equipment_type`
  ADD CONSTRAINT `FK_ee3dc0c3df6c7c691bfb1f49998` FOREIGN KEY (`id_equipment`) REFERENCES `equipment` (`id_equipment`),
  ADD CONSTRAINT `FK_f7f9c483840f1756a5551b85cac` FOREIGN KEY (`id_type`) REFERENCES `type` (`id_type`);

--
-- Contraintes pour la table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `FK_2f149605e7faf616fbc5ac6d6fc` FOREIGN KEY (`id_map`) REFERENCES `map` (`id_map`);

--
-- Contraintes pour la table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `FK_594b893185c13dcae8867da2f96` FOREIGN KEY (`id_character`) REFERENCES `character` (`id_character`),
  ADD CONSTRAINT `FK_756b2a00ffb5f8dfc71208e0cac` FOREIGN KEY (`id_inventory_level`) REFERENCES `inventory_level` (`id_inventory_level`);

--
-- Contraintes pour la table `inventory_equipment`
--
ALTER TABLE `inventory_equipment`
  ADD CONSTRAINT `FK_1bf3aa55a1a8168e51876ff3185` FOREIGN KEY (`id_inventory`) REFERENCES `inventory` (`id_inventory`),
  ADD CONSTRAINT `FK_b95c7a7bcc4b756b1b000c18260` FOREIGN KEY (`id_equipment`) REFERENCES `equipment` (`id_equipment`);

--
-- Contraintes pour la table `inventory_object`
--
ALTER TABLE `inventory_object`
  ADD CONSTRAINT `FK_069ea2dce877893cda2d4619272` FOREIGN KEY (`id_inventory`) REFERENCES `inventory` (`id_inventory`),
  ADD CONSTRAINT `FK_ee052f0d786dacb0f4f836d3fad` FOREIGN KEY (`id_object`) REFERENCES `object` (`id_object`);

--
-- Contraintes pour la table `loot_dungeon_session`
--
ALTER TABLE `loot_dungeon_session`
  ADD CONSTRAINT `FK_6851b2787a596476401cea61fc6` FOREIGN KEY (`id_object`) REFERENCES `object` (`id_object`),
  ADD CONSTRAINT `FK_ab8d4c0a58cb9e4730aba78f9f6` FOREIGN KEY (`id_character`) REFERENCES `character` (`id_character`),
  ADD CONSTRAINT `FK_f06a8e4b4dc995967f0d6755b05` FOREIGN KEY (`id_dungeon_session`) REFERENCES `dungeon_session` (`id_dungeon_session`);

--
-- Contraintes pour la table `monster`
--
ALTER TABLE `monster`
  ADD CONSTRAINT `FK_22e032f7eee5cd2977601dda032` FOREIGN KEY (`id_base_feature`) REFERENCES `base_feature` (`id_base_feature`),
  ADD CONSTRAINT `FK_34058b3d446d372cc6e338ac303` FOREIGN KEY (`id_monster_appearance`) REFERENCES `monster_appearance` (`id_monster_appearance`),
  ADD CONSTRAINT `FK_f4ce6d024b5c7d16f3b6f3aa9f6` FOREIGN KEY (`id_ultimate`) REFERENCES `ultimate` (`id_ultimate`);

--
-- Contraintes pour la table `monster_appearance`
--
ALTER TABLE `monster_appearance`
  ADD CONSTRAINT `FK_4b1082040ce7956322dedce081d` FOREIGN KEY (`id_game_animation`) REFERENCES `game_animation` (`id_game_animation`);

--
-- Contraintes pour la table `monster_loot`
--
ALTER TABLE `monster_loot`
  ADD CONSTRAINT `FK_2083021fbc07e585febf4793354` FOREIGN KEY (`id_object`) REFERENCES `object` (`id_object`),
  ADD CONSTRAINT `FK_7cf0155a9d8f8626783f1b3a428` FOREIGN KEY (`id_monster`) REFERENCES `monster` (`id_monster`);

--
-- Contraintes pour la table `monster_power`
--
ALTER TABLE `monster_power`
  ADD CONSTRAINT `FK_2df418b7146e2270781db06bc8c` FOREIGN KEY (`id_power`) REFERENCES `power` (`id_power`),
  ADD CONSTRAINT `FK_4b2309759eaa55b35bbeb3796a0` FOREIGN KEY (`id_monster`) REFERENCES `monster` (`id_monster`);

--
-- Contraintes pour la table `monster_type`
--
ALTER TABLE `monster_type`
  ADD CONSTRAINT `FK_6ef00a0bfc7e7a910f25cc3fa25` FOREIGN KEY (`id_type`) REFERENCES `type` (`id_type`),
  ADD CONSTRAINT `FK_dc95a34eb5a0ac73b533fe08ca2` FOREIGN KEY (`id_monster`) REFERENCES `monster` (`id_monster`);

--
-- Contraintes pour la table `object`
--
ALTER TABLE `object`
  ADD CONSTRAINT `FK_df30d18c6c83f6472d308b79a25` FOREIGN KEY (`id_type`) REFERENCES `type` (`id_type`);

--
-- Contraintes pour la table `object_type`
--
ALTER TABLE `object_type`
  ADD CONSTRAINT `FK_514cfce2017357419ed7519042d` FOREIGN KEY (`id_type`) REFERENCES `type` (`id_type`),
  ADD CONSTRAINT `FK_9f35ddf438f7821259dc870843f` FOREIGN KEY (`id_object`) REFERENCES `object` (`id_object`);

--
-- Contraintes pour la table `position`
--
ALTER TABLE `position`
  ADD CONSTRAINT `FK_5f7f58a7991be3f063547a23e58` FOREIGN KEY (`id_map`) REFERENCES `map` (`id_map`);

--
-- Contraintes pour la table `power`
--
ALTER TABLE `power`
  ADD CONSTRAINT `FK_4d338e7e002de518795607e6c59` FOREIGN KEY (`id_game_animation`) REFERENCES `game_animation` (`id_game_animation`),
  ADD CONSTRAINT `FK_ea5095f55259fac745bf37466d6` FOREIGN KEY (`id_special_feature`) REFERENCES `special_feature` (`id_special_feature`);

--
-- Contraintes pour la table `statistics`
--
ALTER TABLE `statistics`
  ADD CONSTRAINT `FK_68662e3ced74d8d8afdb30058f8` FOREIGN KEY (`id_season`) REFERENCES `season` (`id_season`);

--
-- Contraintes pour la table `ultimate`
--
ALTER TABLE `ultimate`
  ADD CONSTRAINT `FK_d9c535f6fb439b973fe2d9a7d04` FOREIGN KEY (`id_game_animation`) REFERENCES `game_animation` (`id_game_animation`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_addde50949464eeaefe11ad7690` FOREIGN KEY (`id_address`) REFERENCES `address` (`id_address`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_character`
--
ALTER TABLE `user_character`
  ADD CONSTRAINT `FK_390434874d6605c7cc9a828a6f1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `FK_667862a4c2ce1c463f4e79cce4c` FOREIGN KEY (`id_character`) REFERENCES `character` (`id_character`);

--
-- Contraintes pour la table `user_character_article`
--
ALTER TABLE `user_character_article`
  ADD CONSTRAINT `FK_688ead63a177f8cd1000bb6e906` FOREIGN KEY (`id_character`) REFERENCES `character` (`id_character`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `FK_8760ae75a42b12511aa33301025` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `FK_e554e4b570461218853b6a06512` FOREIGN KEY (`id_article`) REFERENCES `article` (`id_article`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `user_friends`
--
ALTER TABLE `user_friends`
  ADD CONSTRAINT `FK_0c3f2514a70a2ae99fce875500e` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Contraintes pour la table `vocation`
--
ALTER TABLE `vocation`
  ADD CONSTRAINT `FK_a20bf2c528cfb4712a13cd49962` FOREIGN KEY (`id_base_feature`) REFERENCES `base_feature` (`id_base_feature`),
  ADD CONSTRAINT `FK_bb3c94df0e4f4f3bdce6329dc3b` FOREIGN KEY (`id_vocation_appearance`) REFERENCES `vocation_appearance` (`id_vocation_appearance`),
  ADD CONSTRAINT `FK_cf2726e85fe94b72ddf75be305f` FOREIGN KEY (`id_ultimate`) REFERENCES `ultimate` (`id_ultimate`);

--
-- Contraintes pour la table `vocation_appearance`
--
ALTER TABLE `vocation_appearance`
  ADD CONSTRAINT `FK_387d9274894f4c6d235f534dc8f` FOREIGN KEY (`id_game_animation`) REFERENCES `game_animation` (`id_game_animation`);

--
-- Contraintes pour la table `vocation_power`
--
ALTER TABLE `vocation_power`
  ADD CONSTRAINT `FK_6f103a76711b6139b185b5bed26` FOREIGN KEY (`id_vocation`) REFERENCES `vocation` (`id_vocation`),
  ADD CONSTRAINT `FK_f4b12ea5f4355e599c12c0f2bd1` FOREIGN KEY (`id_power`) REFERENCES `power` (`id_power`);

--
-- Contraintes pour la table `vocation_type`
--
ALTER TABLE `vocation_type`
  ADD CONSTRAINT `FK_1ec661df0c97d3356cc5314fb64` FOREIGN KEY (`id_type`) REFERENCES `type` (`id_type`),
  ADD CONSTRAINT `FK_6a8cd7b84fe331469c770cb2fe3` FOREIGN KEY (`id_vocation`) REFERENCES `vocation` (`id_vocation`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
