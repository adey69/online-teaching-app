// ─── Whiteboard REST API ───────────────────────────────────────────────────────
// Calls the Agora Interactive Whiteboard REST API directly from the app.
//
// ⚠️  DEVELOPMENT ONLY — the SDK token is embedded in the app bundle.
//     In production, these calls must be made from your backend server
//     so the SDK token is never exposed to the client.

import { Config } from '../config';

const BASE_URL = 'https://api.netless.link/v5';

const headers = {
  'Content-Type': 'application/json',
  token: Config.whiteboard.sdkToken,
  region: Config.whiteboard.region,
};

export type WhiteboardRoom = {
  uuid: string;
  teamUUID: string;
  appUUID: string;
  isBan: boolean;
  createdAt: string;
  limit: number;
};

export type RoomRole = 'admin' | 'writer' | 'reader';

export type WhiteboardRoomToken = string;

/**
 * Creates a new whiteboard room via the Agora REST API.
 * Call this when a Teacher starts a new class.
 * Returns the room UUID which you store in your sessions DB.
 */
export async function createWhiteboardRoom(): Promise<WhiteboardRoom> {
  const response = await fetch(`${BASE_URL}/rooms`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      isRecord: false, // set to true when you add recording
      limit: 0,        // 0 = unlimited participants
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`[Whiteboard] createRoom failed ${response.status}: ${body}`);
  }

  return response.json() as Promise<WhiteboardRoom>;
}

/**
 * Fetches a room token for a given room UUID and role.
 *
 * Roles:
 *   'admin'  — Teacher (can ban users, clear board)
 *   'writer' — Student (can draw)
 *   'reader' — Parent observer (view only, no drawing)
 *
 * lifespan: token validity in ms. 0 = never expires.
 * For a class session, 3 hours (10_800_000 ms) is reasonable.
 */
export async function getRoomToken(
  roomUUID: string,
  role: RoomRole = 'writer',
  lifespanMs: number = 10_800_000,
): Promise<WhiteboardRoomToken> {
  const response = await fetch(`${BASE_URL}/tokens/rooms/${roomUUID}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      lifespan: lifespanMs,
      role,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`[Whiteboard] getRoomToken failed ${response.status}: ${body}`);
  }

  // The API returns the token as a plain JSON string, not an object
  return response.json() as Promise<WhiteboardRoomToken>;
}
