import React from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RtcSurfaceView, VideoSourceType } from 'react-native-agora';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { useClassroomScreen } from './useClassroomScreen';
import WhiteboardView from '../../modules/whiteboard/WhiteboardView';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Classroom'>;

function remoteLabel(index: number, myRole: string): string {
  if (myRole === 'teacher') { return 'Student'; }
  if (myRole === 'student') { return 'Teacher'; }
  return index === 0 ? 'Teacher' : 'Student'; // parent sees both
}

export default function ClassroomScreen(props: Readonly<Props>) {
  const {
    title, role, remoteUids, isConnecting,
    videosHidden, hasObserver, whiteboard,
    handleLeave, toggleVideos,
  } = useClassroomScreen(props);

  // Parent sees up to 2 remotes; teacher/student sees 1
  const visibleRemotes = role === 'parent'
    ? remoteUids.slice(0, 2)
    : remoteUids.slice(0, 1);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>

        {/* Observer present badge (shown to teacher/student) */}
        {hasObserver && (
          <View style={styles.observerBadge}>
            <Text style={styles.observerBadgeText}>👁 Observer</Text>
          </View>
        )}

        {/* Observing badge (shown to parent themselves) */}
        {role === 'parent' && (
          <View style={styles.observerBadge}>
            <Text style={styles.observerBadgeText}>Observing</Text>
          </View>
        )}

        {/* Hide / Show video toggle */}
        <Pressable
          style={({ pressed }) => [styles.toggleButton, pressed && styles.toggleButtonPressed]}
          onPress={toggleVideos}
          accessibilityRole="button"
          accessibilityLabel={videosHidden ? 'Show video' : 'Hide video'}
        >
          <Text style={styles.toggleButtonText}>
            {videosHidden ? 'Show' : 'Hide'}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.leaveButton, pressed && styles.leaveButtonPressed]}
          onPress={handleLeave}
          accessibilityRole="button"
          accessibilityLabel="Leave class"
        >
          <Text style={styles.leaveButtonText}>Leave</Text>
        </Pressable>
      </View>

      {/* ── Video row (hidden when toggled) ── */}
      {!videosHidden && (
        <View style={styles.videoRow}>

          {/* Local tile — teacher / student only */}
          {role !== 'parent' && (
            <View style={styles.videoTile}>
              <RtcSurfaceView
                style={styles.videoSurface}
                canvas={{ uid: 0, sourceType: VideoSourceType.VideoSourceCamera }}
              />
              <Text style={styles.videoLabel}>You</Text>
            </View>
          )}

          {/* Remote tiles */}
          {visibleRemotes.map((uid, i) => (
            <View key={uid} style={styles.videoTile}>
              <RtcSurfaceView
                style={styles.videoSurface}
                canvas={{ uid }}
              />
              <Text style={styles.videoLabel}>{remoteLabel(i, role)}</Text>
            </View>
          ))}

          {/* Placeholder when remote hasn't joined yet */}
          {visibleRemotes.length === 0 && role !== 'parent' && (
            <View style={[styles.videoTile, styles.videoTilePlaceholder]}>
              <Text style={styles.videoTilePlaceholderText}>Waiting…</Text>
            </View>
          )}
        </View>
      )}

      {/* ── Whiteboard (always white, takes remaining space) ── */}
      <WhiteboardView
        style={styles.whiteboard}
        writable={role !== 'parent'}
        onConnectionChange={whiteboard.handleConnectionChange}
      />

      {/* ── Connecting overlay ── */}
      {isConnecting && (
        <View style={styles.statusOverlay} pointerEvents="none">
          <ActivityIndicator color="#fff" size="large" />
          <Text style={styles.statusText}>Joining class…</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
