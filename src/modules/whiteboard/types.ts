// ─── Whiteboard Shared Types ──────────────────────────────────────────────────
// Used by both the TurboModule spec and the React hook layer.

export type WhiteboardTool =
  | 'pencil'
  | 'eraser'
  | 'text'
  | 'rectangle'
  | 'ellipse'
  | 'selector';

export type WhiteboardConnectionState =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'error';

export type WhiteboardConfig = {
  /** Agora Whiteboard app identifier */
  appIdentifier: string;
  /** Room UUID from Whiteboard REST API */
  roomUUID: string;
  /** Room token from Whiteboard REST API */
  roomToken: string;
  /** Unique ID for this user in the whiteboard room */
  uid: string;
  /** Whether this user can write (false for observers) */
  writable: boolean;
  /** Data centre region where the room was created (e.g. "us-sv", "cn-hz", "eu") */
  region: string;
};
