package com.onlineteachingapp

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * WhiteboardModule — TurboModule (Android)
 *
 * Implements the methods declared in NativeWhiteboardModule.ts.
 *
 * TODO (New Architecture):
 *   After codegen runs it generates NativeWhiteboardModuleSpec.
 *   Change the superclass to:
 *     class WhiteboardModule(context: ReactApplicationContext)
 *       : NativeWhiteboardModuleSpec(context)
 *   and remove the @ReactMethod annotations (codegen handles registration).
 *
 * TODO (Agora Fastboard SDK):
 *   1. Add Fastboard dependency to android/app/build.gradle.
 *   2. Hold a FastRoom reference here.
 *   3. Fill in each method body with real Fastboard SDK calls.
 */
class WhiteboardModule(
  private val reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = NAME

  // ── Room lifecycle ──────────────────────────────────────────────────────────

  @ReactMethod
  fun joinRoom(
    appIdentifier: String,
    roomUUID: String,
    roomToken: String,
    uid: String,
    writable: Boolean,
    promise: Promise,
  ) {
    // TODO: FastboardView.setup(...).joinRoom(roomToken, ...)
    promise.resolve(null)
  }

  @ReactMethod
  fun leaveRoom(promise: Promise) {
    // TODO: fastRoom.disconnect()
    promise.resolve(null)
  }

  // ── Tool control ────────────────────────────────────────────────────────────

  @ReactMethod
  fun setTool(tool: String) {
    // TODO: fastRoom.setAppliance(...)
  }

  @ReactMethod
  fun setStrokeColor(hex: String) {
    // TODO: fastRoom.setStrokeColor(...)
  }

  @ReactMethod
  fun setStrokeWidth(width: Double) {
    // TODO: fastRoom.setStrokeWidth(...)
  }

  // ── History ─────────────────────────────────────────────────────────────────

  @ReactMethod
  fun undo() {
    // TODO: fastRoom.undo()
  }

  @ReactMethod
  fun redo() {
    // TODO: fastRoom.redo()
  }

  @ReactMethod
  fun clearPage() {
    // TODO: fastRoom.cleanScene(false)
  }

  companion object {
    const val NAME = "WhiteboardModule"
  }
}
