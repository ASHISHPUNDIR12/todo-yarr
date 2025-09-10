/*
  Warnings:

  - You are about to drop the column `description` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `completed` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Todo" DROP COLUMN "description",
ADD COLUMN     "completed" BOOLEAN NOT NULL;
