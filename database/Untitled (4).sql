DROP DATABASE IF EXISTS testPureWeb;
CREATE DATABASE `testPureWeb`; 
USE `testPureWeb`;

CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `colomns` (
  `id` integer PRIMARY KEY,
  `title` varchar(255),
  `body` text COMMENT 'Content of the post',
  `user_id` integer NOT NULL,
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `cards` (
  `id` integer PRIMARY KEY,
  `title` varchar(255),
  `body` text COMMENT 'Content of the post',
  `colomns_id` integer NOT NULL,
  `status` varchar(255),
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `access_cards` (
  `id` integer,
  `cards_id` integer,
  `user_guest_id` integer
);

CREATE TABLE `comments` (
  `id` integer PRIMARY KEY,
  `title` varchar(255),
  `body` text COMMENT 'Content of the post',
  `cards_id` integer NOT NULL,
  `status` varchar(255),
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `access_cards_users` (
  `access_cards_user_guest_id` integer,
  `users_id` integer,
  PRIMARY KEY (`access_cards_user_guest_id`, `users_id`)
);

ALTER TABLE `access_cards_users` ADD FOREIGN KEY (`access_cards_user_guest_id`) REFERENCES `access_cards` (`user_guest_id`);

ALTER TABLE `access_cards_users` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);


CREATE TABLE `access_cards_cards` (
  `access_cards_cards_id` integer,
  `cards_id` integer,
  PRIMARY KEY (`access_cards_cards_id`, `cards_id`)
);

ALTER TABLE `access_cards_cards` ADD FOREIGN KEY (`access_cards_cards_id`) REFERENCES `access_cards` (`cards_id`);

ALTER TABLE `access_cards_cards` ADD FOREIGN KEY (`cards_id`) REFERENCES `cards` (`id`);


ALTER TABLE `colomns` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `cards` ADD FOREIGN KEY (`colomns_id`) REFERENCES `colomns` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`cards_id`) REFERENCES `cards` (`id`);
