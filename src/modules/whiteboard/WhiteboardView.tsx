// ─── JS Wrapper ───────────────────────────────────────────────────────────────
// A thin React component that wraps the native Fabric view.
// All consumers import this — never the raw NativeComponent directly.

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Platform } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { WhiteboardConnectionState } from './types';

// Lazy-require so the app doesn't crash on platforms where the native
// module isn't linked yet (e.g. running on web or before pod install).
let WhiteboardNativeComponent: React.ComponentType<any> | null = null;
try {
  WhiteboardNativeComponent =
    require('./WhiteboardNativeComponent').default;
} catch {
  // Native module not linked — will show placeholder below
}

type Props = {
  writable?: boolean;
  onConnectionChange?: (state: WhiteboardConnectionState) => void;
  style?: StyleProp<ViewStyle>;
};

export default function WhiteboardView({
  writable = true,
  onConnectionChange,
  style,
}: Readonly<Props>) {
  if (!WhiteboardNativeComponent) {
    // Shown during development before the native module is linked
    return (
      <View style={[styles.placeholder, style]}>
        <Text style={styles.placeholderText}>
          WhiteboardView — native module not linked
          {'\n'}Run pod install (iOS) or gradle sync (Android)
        </Text>
      </View>
    );
  }

  return (
    <WhiteboardNativeComponent
      style={style}
      writable={writable}
      onConnectionChange={
        onConnectionChange
          ? (e: { nativeEvent: { state: string } }) =>
              onConnectionChange(
                e.nativeEvent.state as WhiteboardConnectionState,
              )
          : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 24,
  },
});
