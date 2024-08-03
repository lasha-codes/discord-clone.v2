/*
  Warnings:

  - Added the required column `server_role` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "invite_code" TEXT,
ADD COLUMN     "server_role" TEXT NOT NULL;
