/*
  Warnings:

  - Added the required column `profit` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "profit" DOUBLE PRECISION NOT NULL;
