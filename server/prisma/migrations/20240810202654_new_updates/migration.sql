/*
  Warnings:

  - The `first_user` column on the `Friends` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `second_user` column on the `Friends` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `receiver` on the `Requests` table. All the data in the column will be lost.
  - The `sender` column on the `Requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `first_user_id` to the `Friends` table without a default value. This is not possible if the table is not empty.
  - Added the required column `second_user_id` to the `Friends` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiver_id` to the `Requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_id` to the `Requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Friends" ADD COLUMN     "first_user_id" TEXT NOT NULL,
ADD COLUMN     "second_user_id" TEXT NOT NULL,
DROP COLUMN "first_user",
ADD COLUMN     "first_user" JSONB[],
DROP COLUMN "second_user",
ADD COLUMN     "second_user" JSONB[];

-- AlterTable
ALTER TABLE "Requests" DROP COLUMN "receiver",
ADD COLUMN     "receiver_id" TEXT NOT NULL,
ADD COLUMN     "reciever" JSONB[],
ADD COLUMN     "sender_id" TEXT NOT NULL,
DROP COLUMN "sender",
ADD COLUMN     "sender" JSONB[];
