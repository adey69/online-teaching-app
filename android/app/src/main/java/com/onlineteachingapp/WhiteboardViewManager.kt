package com.onlineteachingapp

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

/**
 * WhiteboardViewManager — registers WhiteboardView with React Native's Fabric renderer.
 *
 * The REACT_CLASS name must match:
 *   - codegenNativeComponent('WhiteboardView') in WhiteboardNativeComponent.ts
 *   - WhiteboardViewCls() on iOS
 *
 * TODO (New Architecture / Fabric):
 *   When codegen runs it generates WhiteboardViewManagerInterface and
 *   WhiteboardViewManagerDelegate. Change the class signature to:
 *     class WhiteboardViewManager : SimpleViewManager<WhiteboardView>(),
 *       WhiteboardViewManagerInterface<WhiteboardView>
 *   and add:
 *     override fun getDelegate() = WhiteboardViewManagerDelegate(this)
 */
class WhiteboardViewManager : SimpleViewManager<WhiteboardView>() {

  override fun getName(): String = REACT_CLASS

  override fun createViewInstance(context: ThemedReactContext): WhiteboardView =
    WhiteboardView(context)

  // ── Props ──────────────────────────────────────────────────────────────────
  // Mirrors the props declared in WhiteboardNativeComponent.ts.

  @ReactProp(name = "writable", defaultBoolean = true)
  fun setWritable(view: WhiteboardView, writable: Boolean) {
    // TODO: pass writable flag to Fastboard SDK
  }

  companion object {
    const val REACT_CLASS = "WhiteboardView"
  }
}
