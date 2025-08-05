/*
  Warnings:

  - You are about to drop the column `description` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `MediaContent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Episode" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "public"."MediaContent" DROP COLUMN "releaseDate",
ALTER COLUMN "isPublished" DROP DEFAULT;
