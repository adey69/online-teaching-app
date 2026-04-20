// WhiteboardAdapterBridge.h
// Plain ObjC header — no C++, no Swift.
//
// WhiteboardComponentView.mm includes RCTViewComponentView.h (C++ heavy) and
// cannot also include OnlineTeachingApp-Swift.h in the same translation unit.
// This bridge puts the Swift import in a plain .m file, keeping the .mm clean.

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

// extern "C" ensures C linkage when this header is included from ObjC++ (.mm)
// files. Without it, the C++ compiler mangles the symbol names and they won't
// match the plain-C definitions in WhiteboardAdapterBridge.m at link time.
#ifdef __cplusplus
extern "C" {
#endif

NS_ASSUME_NONNULL_BEGIN

void WBCreateRoom(NSString *appIdentifier,
                  NSString *roomUUID,
                  NSString *roomToken,
                  NSString *uid,
                  BOOL writable,
                  NSString *region,
                  UIView *container,
                  dispatch_block_t onConnected,
                  void (^onError)(NSString *));

/// Store room credentials so the view can connect when it mounts.
void WBSetPendingConfig(NSString *appIdentifier,
                        NSString *roomUUID,
                        NSString *roomToken,
                        NSString *uid,
                        BOOL writable,
                        NSString *region);

/// Returns YES if credentials have been stored via WBSetPendingConfig.
BOOL WBHasPendingConfig(void);

/// Connect using stored credentials, adding the canvas to `container`.
void WBConnectWithPendingConfig(UIView *container,
                                dispatch_block_t onConnected,
                                void (^onError)(NSString *));

void WBLeaveRoom(void);
BOOL WBHasRoom(void);

void WBSetTool(NSString *tool);
void WBSetStrokeColor(NSString *hex);
void WBSetStrokeWidth(float width);
void WBUndo(void);
void WBRedo(void);
void WBClearPage(void);

NS_ASSUME_NONNULL_END

#ifdef __cplusplus
}
#endif
