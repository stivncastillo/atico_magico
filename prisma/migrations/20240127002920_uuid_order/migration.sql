/*
  Warnings:

  - The primary key for the `cartDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cartDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
