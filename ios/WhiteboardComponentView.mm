// ─── WhiteboardComponentView (Fabric View) ────────────────────────────────────
// Mounts the Fastboard whiteboard canvas inside this native view.
//
// Connection flow:
//   1. JS calls WhiteboardModule.joinRoom(...) → WBSetPendingConfig stores creds
//   2. <WhiteboardView /> renders → layoutSubviews → connectIfReady
//   3. connectIfReady reads pending config, calls WBConnectWithPendingConfig
//   4. WhiteboardAdapter creates FastRoom, embeds its UIView, joins room
//   5. onConnected callback → emitConnectionState("connected")

#import "WhiteboardComponentView.h"
#import <React/RCTFabricComponentsPlugins.h>
#import <React/RCTLog.h>
#import "WhiteboardAdapterBridge.h"

// Codegen-generated headers (produced by pod install + first Xcode build)
#include <react/renderer/components/AppSpecs/ComponentDescriptors.h>
#include <react/renderer/components/AppSpecs/Props.h>

using namespace facebook::react;

@implementation WhiteboardComponentView {
  BOOL _writable;
  BOOL _connecting;
}

// ── Initialisation ────────────────────────────────────────────────────────────

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    _writable   = YES;
    _connecting = NO;
    self.backgroundColor = [UIColor whiteColor];
    // Observe config-ready notification so we can connect even if the token
    // arrives after our first layoutSubviews (the common case, since getRoomToken
    // is an async HTTP call that finishes after the view is already mounted).
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(connectIfReady)
                                                 name:@"WBPendingConfigReady"
                                               object:nil];
  }
  return self;
}

- (void)dealloc
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

// ── Prop updates (Fabric calls this when JS props change) ─────────────────────

- (void)updateProps:(const Props::Shared &)props oldProps:(const Props::Shared &)oldProps
{
  const auto &newProps = *std::static_pointer_cast<const WhiteboardViewProps>(props);
  _writable = newProps.writable;
  [super updateProps:props oldProps:oldProps];
}

// ── Connect to room ───────────────────────────────────────────────────────────

- (void)connectIfReady
{
  if (_connecting || WBHasRoom()) { return; }
  if (!WBHasPendingConfig()) { return; }

  _connecting = YES;
  [self emitConnectionState:@"connecting"];

  __weak WhiteboardComponentView *weakSelf = self;
  WBConnectWithPendingConfig(self,
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

- (void)layoutSubviews
{
  [super layoutSubviews];
  [self connectIfReady];
}

// ── Event emission ────────────────────────────────────────────────────────────

- (void)emitConnectionState:(NSString *)state
{
  // TODO: wire to Fabric event emitter to propagate onConnectionChange to JS.
  RCTLogInfo(@"[WhiteboardView] connectionState → %@", state);
}

// ── Codegen registration ──────────────────────────────────────────────────────

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<WhiteboardViewComponentDescriptor>();
}

@end

// ── Plugin registration ───────────────────────────────────────────────────────
Class<RCTComponentViewProtocol> WhiteboardViewCls(void)
{
  return WhiteboardComponentView.class;
}
