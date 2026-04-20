// ─── Database Row Types ───────────────────────────────────────────────────────
// Each type maps 1:1 to a table row. Column names use snake_case to match SQL.

export type SessionStatus = 'live' | 'completed';

export type SessionRow = {
  id: string;                    // UUID, primary key
  channel_id: string;            // Agora channel name (used to join the video call)
  whiteboard_room_uuid: string;  // Fastboard room UUID (used to join the whiteboard)
  title: string;                 // e.g. "Algebra Fundamentals"
  subject: string;               // e.g. "Mathematics"
  teacher_name: string;
  status: SessionStatus;
  created_at: number;            // Unix timestamp (ms)
  ended_at: number | null;       // null while live
};
