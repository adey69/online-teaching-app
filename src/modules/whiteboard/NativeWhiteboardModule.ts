// ─── TurboModule Spec ─────────────────────────────────────────────────────────
// This file is the CONTRACT between JS and native.
// Codegen reads this file and generates the C++/Swift/Kotlin glue automatically.
//
// Rules:
//  - Only use types supported by codegen (string, number, boolean, Promise, etc.)
//  - Do NOT import your own types here — codegen cannot resolve them.
//    Use plain primitives and inline object shapes only.

import { TurboModuleRegistry } from 'react-native';
import type { TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  /**
   * Connect to a Whiteboard room.
   * Call this after rendering <WhiteboardView />.
   */
  joinRoom(
    appIdentifier: string,
    roomUUID: string,
    roomToken: string,
    uid: string,
    writable: boolean,
    region: string,
  ): Promise<void>;

  /** Disconnect and clean up the room connection. */
  leaveRoom(): Promise<void>;

  /**
   * Switch the active drawing tool.
   * Accepted values: 'pencil' | 'eraser' | 'text' | 'rectangle' | 'ellipse' | 'selector'
   */
  setTool(tool: string): void;

  /** Set stroke colour as a hex string, e.g. '#FF0000'. */
  setStrokeColor(hex: string): void;

  /** Set stroke width in points (1–20 recommended). */
  setStrokeWidth(width: number): void;

  /** Undo the last action. */
  undo(): void;

  /** Redo the last undone action. */
  redo(): void;

  /** Clear all content on the current page. */
  clearPage(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('WhiteboardModule');
