import { useState, useEffect, useCallback, useRef } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  ConnectionStateType,
  type IRtcEngine,
  type RtcConnection,
} from 'react-native-agora';
import type { RootStackParamList } from '../../navigation/types';
import { useWhiteboard } from '../../modules/whiteboard/useWhiteboard';
import { getRoomToken } from '../../services/whiteboardApi';
import { endSession } from '../../database/repositories/sessionsRepository';
import { Config } from '../../config';

type Props = NativeStackScreenProps<RootStackParamList, 'Classroom'>;

export function useClassroomScreen({ route, navigation }: Readonly<Props>) {
  const { channelId, roomUUID, role, title, sessionId } = route.params;

  const whiteboard = useWhiteboard();
  const engineRef = useRef<IRtcEngine | null>(null);
  const [remoteUids, setRemoteUids] = useState<number[]>([]);
  const [isConnecting, setIsConnecting] = useState(true);
  const [videosHidden, setVideosHidden] = useState(false);

  useEffect(() => {
    let mounted = true;

    // ── Agora RTC ─────────────────────────────────────────────────────────
    const engine = createAgoraRtcEngine();
    engineRef.current = engine;

    console.log('app ID: ', Config.agora.appId);
    engine.initialize({
      appId: Config.agora.appId,
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });
    engine.enableVideo();
    if (role !== 'parent') {
      engine.startPreview();
    } else {
      engine.muteLocalAudioStream(true);
      engine.muteLocalVideoStream(true);
    }

    engine.addListener('onError', (err: number) => {
      console.error('[Agora] Error code:', err);
    });

    engine.addListener('onJoinChannelSuccess', (connection: RtcConnection) => {
      console.log('[Agora] Joined channel:', connection.channelId, '| uid:', connection.localUid);
    });

    engine.addListener('onConnectionStateChanged', (
      _conn: RtcConnection,
      state: ConnectionStateType,
      reason: number,
    ) => {
      console.log('[Agora] Connection state:', state, '| reason:', reason);
    });

    engine.addListener('onUserJoined', (_conn: RtcConnection, uid: number) => {
      console.log('[Agora] Remote user joined uid:', uid);
      if (mounted) setRemoteUids(prev => [...prev, uid]);
    });

    engine.addListener('onUserOffline', (_conn: RtcConnection, uid: number) => {
      console.log('[Agora] Remote user left uid:', uid);
      if (mounted) setRemoteUids(prev => prev.filter(u => u !== uid));
    });

    console.log('[Agora] Joining channel:', channelId);

    engine.joinChannel('', channelId, 0, {
      clientRoleType:
        role === 'parent'
          ? ClientRoleType.ClientRoleAudience
          : ClientRoleType.ClientRoleBroadcaster,
    });

    // ── Whiteboard ────────────────────────────────────────────────────────
    const wbRole =
      role === 'teacher' ? 'admin' : role === 'parent' ? 'reader' : 'writer';

    getRoomToken(roomUUID, wbRole)
      .then(token => {
        if (!mounted) return;
        return whiteboard.joinRoom({
          appIdentifier: Config.whiteboard.appIdentifier,
          roomUUID,
          roomToken: token,
          uid: `${role}_${Date.now()}`,
          writable: role !== 'parent',
          region: Config.whiteboard.region,
        });
      })
      .catch(err => console.error('[Classroom] whiteboard join failed:', err))
      .finally(() => {
        if (mounted) setIsConnecting(false);
      });

    return () => {
      mounted = false;
      engine.leaveChannel();
      engine.release();
      whiteboard.leaveRoom();
      if (sessionId) {
        endSession(sessionId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLeave = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const toggleVideos = useCallback(() => {
    setVideosHidden(v => !v);
  }, []);

  // A third participant beyond the expected teacher+student pair is an observer
  const hasObserver = role !== 'parent' && remoteUids.length > 1;

  return {
    title,
    role,
    remoteUids,
    isConnecting,
    videosHidden,
    hasObserver,
    whiteboard,
    handleLeave,
    toggleVideos,
  };
}
