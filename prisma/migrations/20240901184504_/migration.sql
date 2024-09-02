/*
  Warnings:

  - Added the required column `userId` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` ADD COLUMN `userId` INTEGER NOT NULL,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL;
