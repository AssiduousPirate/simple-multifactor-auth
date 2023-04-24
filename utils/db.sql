CREATE DATABASE `okta_node_mfa`;

USE 'okta_node_mfa';

CREATE TABLE `okta_node_mfa`.`temp_users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(45) NULL,
    `lastName` VARCHAR(45) NULL,
    `email` VARCHAR(75) NULL,
    `username` VARCHAR(45) NULL,
    `password` VARCHAR(95) NULL,
    `given_name` VARCHAR(45) NULL,
    `otp` VARCHAR(45) NULL,
    `verified_at` VARCHAR(45) NULL,
    `email_verified_at` VARCHAR(45) NULL,
    `lat` INT NULL,
    `lng` INT NULL,
    `phone` VARCHAR(45) NULL,
    `city` VARCHAR(45) NULL,
    `is_active` VARCHAR(45) NULL,
    `is_deleted` VARCHAR(45) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`));

CREATE TABLE `okta_node_mfa`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(45) NULL,
    `lastName` VARCHAR(45) NULL,
    `email` VARCHAR(75) NULL,
    `username` VARCHAR(45) NULL,
    `password` VARCHAR(95) NULL,
    `given_name` VARCHAR(45) NULL,
    `otp` VARCHAR(45) NULL,
    `verified_at` VARCHAR(45) NULL,
    `email_verified_at` VARCHAR(45) NULL,
    `lat` INT NULL,
    `lng` INT NULL,
    `phone` VARCHAR(45) NULL,
    `city` VARCHAR(45) NULL,
    `is_active` VARCHAR(45) NULL,
    `is_deleted` VARCHAR(45) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`));

CREATE TABLE `okta_node_mfa`.`exceptions` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `exception` VARCHAR(200) NULL DEFAULT 'null',
    `function` VARCHAR(200) NULL DEFAULT 'null',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);