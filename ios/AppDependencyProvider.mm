// AppDependencyProvider.mm
// Registers in-app Fabric components that CocoaPods auto-linking does not
// include in RCTThirdPartyComponentsProvider (only library pods go there).

#import "AppDependencyProvider.h"
#import <React/RCTComponentViewProtocol.h>

// Factory function declared in WhiteboardComponentView.mm
extern Class<RCTComponentViewProtocol> WhiteboardViewCls(void);

@implementation AppDependencyProvider

- (NSDictionary<NSString *, Class<RCTComponentViewProtocol>> *)thirdPartyFabricComponents {
  NSMutableDictionary *dict = [super thirdPartyFabricComponents].mutableCopy;
  dict[@"WhiteboardView"] = WhiteboardViewCls();
  return dict;
}

@end
