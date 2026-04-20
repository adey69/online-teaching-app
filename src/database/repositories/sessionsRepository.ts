import { supabase } from '../../services/supabase';
import type { SessionRow, SessionStatus } from '../schema';

// ─── Sessions Repository ──────────────────────────────────────────────────────
// All Supabase queries for the `sessions` table live here.
// Screens and hooks never query directly — they call these functions.

const RETENTION_MS = 14 * 24 * 60 * 60 * 1000;

function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function createSession(
  params: Pick<SessionRow, 'title' | 'subject' | 'teacher_name' | 'whiteboard_room_uuid'>,
): Promise<SessionRow> {
  const session: SessionRow = {
    id: generateId(),
    channel_id: `ch_${Date.now()}`,
    whiteboard_room_uuid: params.whiteboard_room_uuid,
    title: params.title,
    subject: params.subject,
    teacher_name: params.teacher_name,
    status: 'live',
    created_at: Date.now(),
    ended_at: null,
  };

  const { data, error } = await supabase
    .from('sessions')
    .insert(session as never)
    .select()
    .single();

  if (error) { throw error; }
  return data as SessionRow;
}

export async function getLiveSessions(): Promise<SessionRow[]> {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('status', 'live')
    .order('created_at', { ascending: false });

  if (error) { throw error; }
  return data ?? [];
}

export async function getSessionHistory(): Promise<SessionRow[]> {
  const cutoff = Date.now() - RETENTION_MS;
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('status', 'completed')
    .gt('created_at', cutoff)
    .order('created_at', { ascending: false });

  if (error) { throw error; }
  return data ?? [];
}

export async function endSession(id: string): Promise<void> {
  const { error } = await supabase
    .from('sessions')
    .update({ status: 'completed' as SessionStatus, ended_at: Date.now() } as never)
    .eq('id', id);

  if (error) { throw error; }
}

export async function deleteAllSessions(): Promise<void> {
  const { error } = await supabase
    .from('sessions')
    .delete()
    .neq('id', '');

  if (error) { throw error; }
}
