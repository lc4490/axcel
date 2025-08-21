import Database, { Database as DBType } from "better-sqlite3";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, "app.db");

declare global {
  // Prevent multiple connections during dev hot-reload
  // eslint-disable-next-line no-var
  var __axcelDb__: DBType | undefined;
}

function init(): DBType {
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
  `);
  return db;
}

export const db: DBType = global.__axcelDb__ ?? init();
if (!global.__axcelDb__) global.__axcelDb__ = db;
