// ─── WhiteboardComponentView (Fabric View) ────────────────────────────────────
// Mounts the Fastboard whiteboard canvas inside this native view.
//
// Fastboard is a Swift-only pod — it has no Fastboard.h ObjC header.
// All Fastboard calls go through WhiteboardAdapter (Swift) which this file
// reaches via the auto-generated "OnlineTeachingApp-Swift.h" header.
//
// Flow:
//   1. JS renders <WhiteboardView roomUUID=... roomToken=... writable=... />
//   2. Props land → layoutSubviews fires → connectIfReady
//   3. WhiteboardAdapter creates FastRoom, adds its UIView here, joins room
//   4. onConnected callback → emitConnectionState("connected")

#import "WhiteboardComponentView.h"
#import <React/RCTFabricComponentsPlugins.h>
#import <React/RCTLog.h>
#import "WhiteboardAdapterBridge.h"

@implementation WhiteboardComponentView {
  NSString *_roomUUID;
  NSString *_roomToken;
  NSString *_appIdentifier;
  NSString *_uid;
  BOOL      _writable;
  BOOL      _connecting;
}

// ── Initialisation ────────────────────────────────────────────────────────────

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    _writable   = YES;
    _connecting = NO;
  }
  return self;
}

// ── Connect to room ───────────────────────────────────────────────────────────
// Called from layoutSubviews once all props are set.

- (void)connectIfReady
{
  if (!_roomUUID || !_roomToken || !_appIdentifier) { return; }
  if (_connecting || WBHasRoom()) { return; }

  _connecting = YES;
  [self emitConnectionState:@"connecting"];

  __weak WhiteboardComponentView *weakSelf = self;
  WBCreateRoom(_appIdentifier, _roomUUID, _roomToken, _uid ?: @"user", _writable, self,
    ^{
      RCTLogInfo(@"[WhiteboardView] Room connected");
      [weakSelf emitConnectionState:@"connected"];
    },
    ^(NSString *msg) {
      RCTLogError(@"[WhiteboardView] Room error: %@", msg);
      WhiteboardComponentView *strongSelf = weakSelf;
      if (!strongSelf) { return; }
      strongSelf->_connecting = NO;
      [strongSelf emitConnectionState:@"error"];
    });
}

// ── Prop updates (called by Fabric when JS props change) ─────────────────────

- (void)setRoomUUID:(NSString *)roomUUID   { _roomUUID = roomUUID; }
- (void)setRoomToken:(NSString *)roomToken { _roomToken = roomToken; }
- (void)setAppIdentifier:(NSString *)id    { _appIdentifier = id; }
- (void)setUid:(NSString *)uid             { _uid = uid; }

- (void)setWritable:(BOOL)writable
{
  _writable = writable;
  // Room writable state is applied on connect; live changes not yet implemented.
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  [self connectIfReady];
}

// ── Event emission ────────────────────────────────────────────────────────────

- (void)emitConnectionState:(NSString *)state
{
  // TODO: wire to Fabric event emitter after codegen runs.
  // The JS hook polls/listens via the onConnectionChange prop.
  RCTLogInfo(@"[WhiteboardView] connectionState → %@", state);
}

// ── Codegen registration ──────────────────────────────────────────────────────
// Uncomment once codegen has run and the descriptor is available:
//
// + (ComponentDescriptorProvider)componentDescriptorProvider {
//   return concreteComponentDescriptorProvider<WhiteboardViewComponentDescriptor>();
// }

@end

// ── Plugin registration ───────────────────────────────────────────────────────
Class<RCTComponentViewProtocol> WhiteboardViewCls(void)
{
  return WhiteboardComponentView.class;
}
