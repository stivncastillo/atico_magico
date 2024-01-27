/*
  Warnings:

  - The primary key for the `cartDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `cartDetails` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The required column `orderIdentifier` was added to the `order` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cartDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cartId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cartDetails_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart" ("cartIdentifier") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cartDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_cartDetails" ("cartId", "createdAt", "id", "productId", "quantity") SELECT "cartId", "createdAt", "id", "productId", "quantity" FROM "cartDetails";
DROP TABLE "cartDetails";
ALTER TABLE "new_cartDetails" RENAME TO "cartDetails";
CREATE TABLE "new_order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderIdentifier" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "complement" TEXT,
    "notes" TEXT,
    "dni" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "order_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart" ("cartIdentifier") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_order" ("address", "cartId", "city", "complement", "createdAt", "department", "dni", "email", "id", "name", "notes", "orderNumber", "phone", "total", "updatedAt") SELECT "address", "cartId", "city", "complement", "createdAt", "department", "dni", "email", "id", "name", "notes", "orderNumber", "phone", "total", "updatedAt" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
CREATE UNIQUE INDEX "order_orderIdentifier_key" ON "order"("orderIdentifier");
CREATE UNIQUE INDEX "order_orderNumber_key" ON "order"("orderNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
