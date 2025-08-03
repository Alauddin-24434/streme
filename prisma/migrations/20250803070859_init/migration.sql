/*
  Warnings:

  - The values [SERIES,DOCUMENTARY,SHORTFILM] on the enum `MediaType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `ageLimit` on the `MediaContent` table. All the data in the column will be lost.
  - You are about to drop the column `cast` on the `MediaContent` table. All the data in the column will be lost.
  - You are about to drop the column `director` on the `MediaContent` table. All the data in the column will be lost.
  - You are about to drop the column `dislikeCount` on the `MediaContent` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `MediaContent` table. All the data in the column will be lost.
  - You are about to drop the column `likeCount` on the `MediaContent` table. All the data in the column will be lost.
  - You are about to drop the column `production` on the `MediaContent` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `MediaContent` table. All the data in the column will be lost.
  - You are about to drop the column `trailerUrl` on the `MediaContent` table. All the data in the column will be lost.
  - You are about to drop the `Reaction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `MediaContent` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ConetentStatus" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."MediaType_new" AS ENUM ('ANIME', 'MOVIE', 'TV_SHOW');
ALTER TABLE "public"."MediaContent" ALTER COLUMN "type" TYPE "public"."MediaType_new" USING ("type"::text::"public"."MediaType_new");
ALTER TYPE "public"."MediaType" RENAME TO "MediaType_old";
ALTER TYPE "public"."MediaType_new" RENAME TO "MediaType";
DROP TYPE "public"."MediaType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Reaction" DROP CONSTRAINT "Reaction_episodeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reaction" DROP CONSTRAINT "Reaction_mediaContentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reaction" DROP CONSTRAINT "Reaction_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Episode" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."MediaContent" DROP COLUMN "ageLimit",
DROP COLUMN "cast",
DROP COLUMN "director",
DROP COLUMN "dislikeCount",
DROP COLUMN "language",
DROP COLUMN "likeCount",
DROP COLUMN "production",
DROP COLUMN "rating",
DROP COLUMN "trailerUrl",
ADD COLUMN     "status" "public"."ConetentStatus" NOT NULL;

-- DropTable
DROP TABLE "public"."Reaction";

-- DropEnum
DROP TYPE "public"."ReactionType";
