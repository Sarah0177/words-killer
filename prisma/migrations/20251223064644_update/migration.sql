/*
  Warnings:

  - A unique constraint covering the columns `[content]` on the table `Words` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Words_content_key" ON "Words"("content");
