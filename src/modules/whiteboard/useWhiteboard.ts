// ─── Whiteboard Hook ──────────────────────────────────────────────────────────
// The only way screens should interact with the whiteboard.
// Manages connection state and exposes controls.

import { useState, useCallback, useRef } from 'react';
import type { WhiteboardConfig, WhiteboardConnectionState, WhiteboardTool } from './types';

// Lazy-require so the app doesn't crash before the native module is linked.
function getNativeModule() {
  try {
    return require('./NativeWhiteboardModule').default;
  } catch {
    return null;
  }
}

export function useWhiteboard() {
  const [connectionState, setConnectionState] =
    useState<WhiteboardConnectionState>('disconnected');
  const [activeTool, setActiveTool] = useState<WhiteboardTool>('pencil');
  const isJoined = useRef(false);

  const handleConnectionChange = useCallback(
    (state: WhiteboardConnectionState) => {
      setConnectionState(state);
    },
    [],
  );

  const joinRoom = useCallback(async (config: WhiteboardConfig) => {
    const mod = getNativeModule();
    if (!mod) {
      console.warn('[Whiteboard] Native module not linked yet');
      return;
    }
    if (isJoined.current) {
      return;
    }
    try {
      setConnectionState('connecting');
      await mod.joinRoom(
        config.appIdentifier,
        config.roomUUID,
        config.roomToken,
        config.uid,
        config.writable,
        config.region,
      );
      isJoined.current = true;
      setConnectionState('connected');
    } catch (err) {
      setConnectionState('error');
      console.error('[Whiteboard] joinRoom failed:', err);
    }
  }, []);

  const leaveRoom = useCallback(async () => {
    const mod = getNativeModule();
    if (!mod || !isJoined.current) {
      return;
    }
    try {
      await mod.leaveRoom();
    } finally {
      isJoined.current = false;
      setConnectionState('disconnected');
    }
  }, []);

  const setTool = useCallback((tool: WhiteboardTool) => {
    const mod = getNativeModule();
    if (!mod) { return; }
    mod.setTool(tool);
    setActiveTool(tool);
  }, []);

  const setStrokeColor = useCallback((hex: string) => {
    const mod = getNativeModule();
    if (!mod) { return; }
    mod.setStrokeColor(hex);
  }, []);

  const setStrokeWidth = useCallback((width: number) => {
    const mod = getNativeModule();
    if (!mod) { return; }
    mod.setStrokeWidth(width);
  }, []);

  const undo = useCallback(() => {
    const mod = getNativeModule();
    if (!mod) { return; }
    mod.undo();
  }, []);

  const redo = useCallback(() => {
    const mod = getNativeModule();
    if (!mod) { return; }
    mod.redo();
  }, []);

  const clearPage = useCallback(() => {
    const mod = getNativeModule();
    if (!mod) { return; }
    mod.clearPage();
  }, []);

  return {
    connectionState,
    activeTool,
    handleConnectionChange,
    joinRoom,
    leaveRoom,
    setTool,
    setStrokeColor,
    setStrokeWidth,
    undo,
    redo,
    clearPage,
  };
}
