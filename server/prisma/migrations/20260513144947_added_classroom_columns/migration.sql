/*
  Warnings:

  - Added the required column `department` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectCode` to the `Classroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "department" "Department" NOT NULL,
ADD COLUMN     "section" "Section" NOT NULL,
ADD COLUMN     "subjectCode" TEXT NOT NULL;
