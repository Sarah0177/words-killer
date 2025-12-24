/*
  Warnings:

  - Made the column `content` on table `Words` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Words" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "degree" DROP NOT NULL;
