/*
  Warnings:

  - You are about to drop the column `reciever` on the `Requests` table. All the data in the column will be lost.
  - Added the required column `receiver` to the `Requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Requests" DROP COLUMN "reciever",
ADD COLUMN     "receiver" TEXT NOT NULL;
