/*
  Warnings:

  - You are about to drop the column `reciever` on the `Requests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Requests" DROP COLUMN "reciever",
ADD COLUMN     "receiver" JSONB[];
