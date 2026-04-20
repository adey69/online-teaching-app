// WhiteboardAdapterBridge.m
//
// Calls WhiteboardAdapter.swift WITHOUT importing OnlineTeachingApp-Swift.h.
//
// Why: the auto-generated Swift header contains `@import React_RCTAppDelegate`
// which fails when RN is built from prebuilt artifacts (the module exists as a
// static lib, not a Clang-importable framework).
//
// Solution: declare a local ObjC protocol that mirrors WhiteboardAdapter's
// @objc API, then reach the class at runtime via NSClassFromString.
// The selectors are resolved at runtime — no generated header needed.
// WhiteboardAdapter.swift uses @objc(WhiteboardAdapter) so the ObjC class
// name is simply "WhiteboardAdapter" (no module prefix).

#import "WhiteboardAdapterBridge.h"
#import <UIKit/UIKit.h>

// ── Runtime protocol mirror ───────────────────────────────────────────────────
// Must match the @objc method signatures in WhiteboardAdapter.swift exactly.

@protocol WBAdapterInterface <NSObject>
+ (instancetype)shared;
- (BOOL)hasRoom;
- (void)createRoomWithAppIdentifier:(NSString *)appIdentifier
                           roomUUID:(NSString *)roomUUID
                          roomToken:(NSString *)roomToken
                                uid:(NSString *)uid
                           writable:(BOOL)writable
                             region:(NSString *)region
                          container:(UIView *)container
                        onConnected:(dispatch_block_t)onConnected
                            onError:(void (^)(NSString *))onError;
- (void)leaveRoom;
- (void)setTool:(NSString *)tool;
- (void)setStrokeColor:(NSString *)hex;
- (void)setStrokeWidth:(float)width;
- (void)undo;
- (void)redo;
- (void)clearPage;
@end

static id<WBAdapterInterface> WBAdapter(void) {
    Class cls = NSClassFromString(@"WhiteboardAdapter");
    return [(Class<WBAdapterInterface>)cls shared];
}

// ── Pending room config (set by joinRoom TurboModule call) ────────────────────

static NSString *sPendingAppIdentifier = nil;
static NSString *sPendingRoomUUID      = nil;
static NSString *sPendingRoomToken     = nil;
static NSString *sPendingUid           = nil;
static BOOL      sPendingWritable      = YES;
static NSString *sPendingRegion        = nil;

void WBSetPendingConfig(NSString *appIdentifier,
                        NSString *roomUUID,
                        NSString *roomToken,
                        NSString *uid,
                        BOOL writable,
                        NSString *region) {
    sPendingAppIdentifier = appIdentifier;
    sPendingRoomUUID      = roomUUID;
    sPendingRoomToken     = roomToken;
    sPendingUid           = uid;
    sPendingWritable      = writable;
    sPendingRegion        = region;
    // Notify any already-mounted WhiteboardComponentView to connect now.
    // (The view's layoutSubviews may have already fired before the token arrived.)
    [[NSNotificationCenter defaultCenter] postNotificationName:@"WBPendingConfigReady"
                                                        object:nil];
}

BOOL WBHasPendingConfig(void) {
    return sPendingAppIdentifier != nil
        && sPendingRoomUUID  != nil
        && sPendingRoomToken != nil;
}

void WBConnectWithPendingConfig(UIView *container,
                                dispatch_block_t onConnected,
                                void (^onError)(NSString *)) {
    WBCreateRoom(sPendingAppIdentifier,
                 sPendingRoomUUID,
                 sPendingRoomToken,
                 sPendingUid ?: @"user",
                 sPendingWritable,
                 sPendingRegion ?: @"us-sv",
                 container,
                 onConnected,
                 onError);
}

// ── Bridge functions ──────────────────────────────────────────────────────────

void WBCreateRoom(NSString *appIdentifier,
                  NSString *roomUUID,
                  NSString *roomToken,
                  NSString *uid,
                  BOOL writable,
                  NSString *region,
                  UIView *container,
                  dispatch_block_t onConnected,
                  void (^onError)(NSString *)) {
    [WBAdapter() createRoomWithAppIdentifier:appIdentifier
                                    roomUUID:roomUUID
                                   roomToken:roomToken
                                         uid:uid
                                    writable:writable
                                      region:region
                                   container:container
                                 onConnected:onConnected
                                     onError:onError];
}

void WBLeaveRoom(void)             { [WBAdapter() leaveRoom]; }
BOOL WBHasRoom(void)               { return [WBAdapter() hasRoom]; }
void WBSetTool(NSString *tool)     { [WBAdapter() setTool:tool]; }
void WBSetStrokeColor(NSString *h) { [WBAdapter() setStrokeColor:h]; }
void WBSetStrokeWidth(float width) { [WBAdapter() setStrokeWidth:width]; }
void WBUndo(void)                  { [WBAdapter() undo]; }
void WBRedo(void)                  { [WBAdapter() redo]; }
void WBClearPage(void)             { [WBAdapter() clearPage]; }
