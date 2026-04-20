package com.onlineteachingapp

import android.content.Context
import android.graphics.Color
import android.view.Gravity
import android.widget.FrameLayout
import android.widget.TextView

/**
 * WhiteboardView — Fabric Native Component (Android)
 *
 * This is a placeholder. When integrating the Agora Fastboard Android SDK:
 *   1. Add the Fastboard dependency to android/app/build.gradle.
 *   2. Replace FrameLayout with FastboardView (or embed it here).
 *   3. Expose joinRoom/leaveRoom via WhiteboardModule, not this view.
 */
class WhiteboardView(context: Context) : FrameLayout(context) {

  init {
    setBackgroundColor(Color.parseColor("#F3F4F6"))

    // Placeholder label — remove when Fastboard view is embedded
    val label = TextView(context).apply {
      text = "Whiteboard\n(Fastboard SDK not integrated yet)"
      textAlignment = TEXT_ALIGNMENT_CENTER
      setTextColor(Color.parseColor("#9CA3AF"))
      textSize = 14f
      gravity = Gravity.CENTER
    }

    addView(label, LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT).apply {
      gravity = Gravity.CENTER
    })
  }
}
