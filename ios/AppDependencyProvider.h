// AppDependencyProvider.h
// Subclass of RCTAppDependencyProvider that adds our app-level Fabric components
// to the component registry. In-app Fabric components defined via codegenConfig
// are not picked up by CocoaPods auto-linking, so we register them manually here.

#import <ReactAppDependencyProvider/RCTAppDependencyProvider.h>

NS_ASSUME_NONNULL_BEGIN

@interface AppDependencyProvider : RCTAppDependencyProvider
@end

NS_ASSUME_NONNULL_END
