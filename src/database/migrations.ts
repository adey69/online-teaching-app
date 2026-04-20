import type { DB } from '@op-engineering/op-sqlite';

// ─── Migrations ───────────────────────────────────────────────────────────────
// Each migration runs exactly once, in order, tracked by a user_version pragma.
// To add a new migration: append to the array and bump the version number.
//
// Rules:
//  - Never edit an existing migration — only add new ones.
//  - Keep each migration idempotent (use IF NOT EXISTS, IF NOT EXISTS columns).

type Migration = {
  version: number;
  up: (db: DB) => void;
};

const migrations: Migration[] = [
  {
    version: 1,
    up: db => {
      db.executeSync(`
        CREATE TABLE IF NOT EXISTS sessions (
          id           TEXT PRIMARY KEY NOT NULL,
          channel_id   TEXT NOT NULL,
          title        TEXT NOT NULL,
          subject      TEXT NOT NULL,
          teacher_name TEXT NOT NULL,
          status       TEXT NOT NULL DEFAULT 'live',
          created_at   INTEGER NOT NULL,
          ended_at     INTEGER
        )
      `);

      db.executeSync(`
        CREATE INDEX IF NOT EXISTS idx_sessions_status
        ON sessions (status)
      `);

      db.executeSync(`
        CREATE INDEX IF NOT EXISTS idx_sessions_created_at
        ON sessions (created_at DESC)
      `);
    },
  },
  {
    // Adds whiteboard_room_uuid for databases created before v1 had the column.
    // Safe to run even if the column already exists (ALTER TABLE IF NOT EXISTS column).
    version: 2,
    up: db => {
      db.executeSync(`
        ALTER TABLE sessions
        ADD COLUMN whiteboard_room_uuid TEXT NOT NULL DEFAULT ''
      `);
    },
  },
];

export function runMigrations(db: DB): void {
  // user_version is a built-in SQLite pragma that stores an integer.
  // We use it to track which migrations have already run.
  const versionResult = db.executeSync('PRAGMA user_version');
  const currentVersion =
    (versionResult.rows?.[0]?.user_version as number | undefined) ?? 0;

  const pending = migrations.filter(m => m.version > currentVersion);

  for (const migration of pending) {
    migration.up(db);
    // Update the version after each successful migration
    db.executeSync(`PRAGMA user_version = ${migration.version}`);
    console.log(`[DB] Migration ${migration.version} applied`);
  }
}
