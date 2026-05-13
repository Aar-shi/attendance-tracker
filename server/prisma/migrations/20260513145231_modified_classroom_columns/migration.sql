/*
  Warnings:

  - You are about to drop the column `name` on the `Classroom` table. All the data in the column will be lost.
  - Added the required column `subjectName` to the `Classroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classroom" DROP COLUMN "name",
ADD COLUMN     "subjectName" TEXT NOT NULL;
