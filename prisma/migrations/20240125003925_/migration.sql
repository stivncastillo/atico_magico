/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `products` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idReference" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "outOfStock" BOOLEAN NOT NULL DEFAULT false,
    "newProduct" BOOLEAN NOT NULL DEFAULT false,
    "updatedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_products" ("categoryId", "createdAt", "description", "featured", "id", "idReference", "name", "newProduct", "outOfStock", "price", "slug") SELECT "categoryId", "createdAt", "description", "featured", "id", "idReference", "name", "newProduct", "outOfStock", "price", "slug" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE UNIQUE INDEX "products_idReference_key" ON "products"("idReference");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
