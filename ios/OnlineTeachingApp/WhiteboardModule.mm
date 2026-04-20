// ─── WhiteboardModule (TurboModule) ───────────────────────────────────────────
// Controls the Whiteboard room (join, leave, tools, history).
// All calls route through WhiteboardAdapterBridge (plain C functions)
// which calls WhiteboardAdapter.swift at runtime — no Swift header imported here.

#import "WhiteboardModule.h"
#import "WhiteboardAdapterBridge.h"
#import <React/RCTLog.h>

@implementation WhiteboardModule

RCT_EXPORT_MODULE()

// ── joinRoom ──────────────────────────────────────────────────────────────────
// Room creation happens in WhiteboardComponentView when the view mounts.
// JS calls this to confirm the room is ready.

RCT_EXPORT_METHOD(joinRoom:(NSString *)appIdentifier
                  roomUUID:(NSString *)roomUUID
                  roomToken:(NSString *)roomToken
                  uid:(NSString *)uid
                  writable:(BOOL)writable
                  region:(NSString *)region
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    // Store credentials so the WhiteboardComponentView can connect on mount.
    WBSetPendingConfig(appIdentifier, roomUUID, roomToken, uid, writable, region);
    RCTLogInfo(@"[Whiteboard] joinRoom — config stored, view will connect on mount");
    resolve(nil);
  });
}

// ── leaveRoom ─────────────────────────────────────────────────────────────────

RCT_EXPORT_METHOD(leaveRoom:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    WBLeaveRoom();
    resolve(nil);
  });
}

// ── Tool control ──────────────────────────────────────────────────────────────

RCT_EXPORT_METHOD(setTool:(NSString *)tool)
{
  dispatch_async(dispatch_get_main_queue(), ^{ WBSetTool(tool); });
}

RCT_EXPORT_METHOD(setStrokeColor:(NSString *)hex)
{
  dispatch_async(dispatch_get_main_queue(), ^{ WBSetStrokeColor(hex); });
}

RCT_EXPORT_METHOD(setStrokeWidth:(nonnull NSNumber *)width)
{
  dispatch_async(dispatch_get_main_queue(), ^{ WBSetStrokeWidth([width floatValue]); });
}

// ── History ───────────────────────────────────────────────────────────────────

RCT_EXPORT_METHOD(undo)  { dispatch_async(dispatch_get_main_queue(), ^{ WBUndo(); }); }
RCT_EXPORT_METHOD(redo)  { dispatch_async(dispatch_get_main_queue(), ^{ WBRedo(); }); }
RCT_EXPORT_METHOD(clearPage) { dispatch_async(dispatch_get_main_queue(), ^{ WBClearPage(); }); }

@end
