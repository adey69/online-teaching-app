import { open } from '@op-engineering/op-sqlite';
import type { DB } from '@op-engineering/op-sqlite';
import { runMigrations } from './migrations';

// ─── Singleton Connection ─────────────────────────────────────────────────────
// There should be exactly one database connection for the lifetime of the app.
// All repositories import `getDb()` — they never call `open()` themselves.

let connection: DB | null = null;

export function getDb(): DB {
  if (!connection) {
    throw new Error('[DB] Database not initialised. Call initDb() first.');
  }
  return connection;
}

export function initDb(): void {
  if (connection) {
    return; // Already open — safe to call initDb() more than once
  }

  connection = open({ name: 'teaching.db' });
  runMigrations(connection);
  console.log('[DB] Ready');
}

export function closeDb(): void {
  if (connection) {
    connection.close();
    connection = null;
  }
}
