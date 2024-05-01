-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_snippets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "created_by" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "snippets_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_snippets" ("content", "created_by", "id", "title") SELECT "content", "created_by", "id", "title" FROM "snippets";
DROP TABLE "snippets";
ALTER TABLE "new_snippets" RENAME TO "snippets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
