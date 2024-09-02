/*
  Warnings:

  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `AccessCards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accesscards` ADD COLUMN `ownerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `password`,
    ADD COLUMN `hash` VARCHAR(191) NOT NULL,
    ADD COLUMN `salt` VARCHAR(191) NOT NULL;
