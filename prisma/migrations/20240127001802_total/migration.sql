/*
  Warnings:

  - Added the required column `total` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
INSERT INTO "new_order" ("address", "cartId", "city", "complement", "createdAt", "department", "dni", "email", "id", "name", "notes", "orderNumber", "phone", "updatedAt") SELECT "address", "cartId", "city", "complement", "createdAt", "department", "dni", "email", "id", "name", "notes", "orderNumber", "phone", "updatedAt" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
CREATE UNIQUE INDEX "order_orderNumber_key" ON "order"("orderNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
