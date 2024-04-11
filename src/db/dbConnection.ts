import sqlite3 from "sqlite3";
import fs from "node:fs";

const dbName = "snippets";

const dbDirFiles = fs.readdirSync("./src/db");

if (!dbDirFiles.includes(`${dbName}.db`)) {
  fs.writeFileSync(`./src/db/${dbName}.db`, "");
}

// connect to database
const dbConnection = new sqlite3.Database(
  `./src/db/${dbName}.db`,
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  },
);

export default dbConnection;
