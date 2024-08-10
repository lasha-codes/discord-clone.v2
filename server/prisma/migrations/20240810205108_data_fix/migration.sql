/*
  Warnings:

  - Changed the type of `first_user` on the `Friends` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `second_user` on the `Friends` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sender` on the `Requests` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `receiver` on the `Requests` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Friends" DROP COLUMN "first_user",
ADD COLUMN     "first_user" JSONB NOT NULL,
DROP COLUMN "second_user",
ADD COLUMN     "second_user" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Requests" DROP COLUMN "sender",
ADD COLUMN     "sender" JSONB NOT NULL,
DROP COLUMN "receiver",
ADD COLUMN     "receiver" JSONB NOT NULL;
