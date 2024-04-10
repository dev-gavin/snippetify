import sqlite3 from "sqlite3";
import fs from "node:fs";

var dbDirFiles = fs.readdirSync("./src/db");
if (!dbDirFiles.includes("database.db")) {
  fs.writeFileSync("./src/db/database.db", "");
}

// connect to database
var dbConnection = new sqlite3.Database(
  "./src/db/database.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  },
);

export default dbConnection;
