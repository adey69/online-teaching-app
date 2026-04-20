// ─── Fabric Component Spec ────────────────────────────────────────────────────
// This file is the CONTRACT for the native view (the canvas that renders on screen).
// Codegen reads this and generates the C++/ObjC/Kotlin view descriptors.
//
// Rules:
//  - Props must use codegen-compatible types only.
//  - Event handlers use WithDefault / BubblingEventHandler / DirectEventHandler.
//  - The string passed to codegenNativeComponent must exactly match the
//    native class name you register (WhiteboardView on both platforms).

import type { ViewProps } from 'react-native';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type {
  DirectEventHandler,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';

// Shape of the event payload emitted when connection state changes
type OnConnectionChangeEvent = {
  state: string; // matches WhiteboardConnectionState values
};

export interface NativeProps extends ViewProps {
  /**
   * Whether the local user has write permission.
   * Pass false for Students and Parents in observer mode.
   */
  writable?: WithDefault<boolean, true>;

  /**
   * Fired whenever the native SDK connection state changes.
   * Payload: { state: 'connecting' | 'connected' | 'disconnected' | ... }
   */
  onConnectionChange?: DirectEventHandler<OnConnectionChangeEvent>;
}

export default codegenNativeComponent<NativeProps>(
  'WhiteboardView',
) as HostComponent<NativeProps>;
