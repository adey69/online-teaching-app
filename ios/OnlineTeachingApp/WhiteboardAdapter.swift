// WhiteboardAdapter.swift
// Bridges Whiteboard SDK (ObjC/Swift pod) to our ObjC native module layer.
//
// Why this exists:
//   WhiteboardModule.mm and WhiteboardComponentView.mm import
//   "OnlineTeachingApp-Swift.h" (Xcode auto-generates this from all
//   @objc-annotated Swift in the target) and call through this class.

import Foundation
import UIKit
import Whiteboard

@objc(WhiteboardAdapter)
@objcMembers
class WhiteboardAdapter: NSObject {

    @objc static let shared = WhiteboardAdapter()

    private var whiteSDK: WhiteSDK?
    private var whiteRoom: WhiteRoom?

    // MARK: - Room lifecycle

    /// Initialises the Whiteboard SDK, embeds the board view inside `container`, and joins the room.
    /// Callbacks arrive on the main queue.
    @objc func createRoom(
        appIdentifier: String,
        roomUUID: String,
        roomToken: String,
        uid: String,
        writable: Bool,
        region: String,
        container: UIView,
        onConnected: @escaping () -> Void,
        onError: @escaping (String) -> Void
    ) {
        let sdkConfig = WhiteSdkConfiguration(app: appIdentifier)

        let boardView = WhiteBoardView(frame: container.bounds)
        boardView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        if #available(iOS 13.0, *) {
            boardView.overrideUserInterfaceStyle = .light
        }
        boardView.backgroundColor = .white
        container.backgroundColor = .white
        container.addSubview(boardView)

        let sdk = WhiteSDK(whiteBoardView: boardView, config: sdkConfig, commonCallbackDelegate: nil)
        self.whiteSDK = sdk

        let roomConfig = WhiteRoomConfig(uuid: roomUUID, roomToken: roomToken, uid: uid)
        roomConfig.isWritable = writable
        roomConfig.region = WhiteRegionKey(rawValue: region)

        sdk.joinRoom(with: roomConfig, callbacks: nil) { [weak self] success, room, error in
            if success, let room = room {
                self?.whiteRoom = room
                onConnected()
            } else {
                onError(error?.localizedDescription ?? "Failed to join whiteboard room")
            }
        }
    }

    @objc func leaveRoom() {
        whiteRoom?.disconnect(nil)
        whiteRoom = nil
        whiteSDK = nil
    }

    @objc func hasRoom() -> Bool {
        whiteRoom != nil
    }

    // MARK: - Tool control
    // Tool strings match WhiteboardTool in src/modules/whiteboard/types.ts.

    @objc func setTool(_ tool: String) {
        guard let room = whiteRoom else { return }
        let applianceValue: String
        switch tool {
        case "pencil":    applianceValue = "pencil"
        case "eraser":    applianceValue = "pencilEraser"
        case "text":      applianceValue = "text"
        case "rectangle": applianceValue = "rectangle"
        case "ellipse":   applianceValue = "ellipse"
        case "selector":  applianceValue = "selector"
        default: return
        }
        let state = WhiteMemberState()
        state.currentApplianceName = WhiteApplianceNameKey(rawValue: applianceValue)
        room.setMemberState(state)
    }

    @objc func setStrokeColor(_ hex: String) {
        guard let room = whiteRoom else { return }
        let cleaned = hex.replacingOccurrences(of: "#", with: "")
        guard cleaned.count == 6, let rgb = UInt32(cleaned, radix: 16) else { return }
        let state = WhiteMemberState()
        state.strokeColor = [
            NSNumber(value: Int((rgb >> 16) & 0xFF)),
            NSNumber(value: Int((rgb >> 8)  & 0xFF)),
            NSNumber(value: Int( rgb        & 0xFF))
        ]
        room.setMemberState(state)
    }

    @objc func setStrokeWidth(_ width: Float) {
        guard let room = whiteRoom else { return }
        let state = WhiteMemberState()
        state.strokeWidth = NSNumber(value: width)
        room.setMemberState(state)
    }

    @objc func undo() { whiteRoom?.undo() }
    @objc func redo() { whiteRoom?.redo() }
    @objc func clearPage() { whiteRoom?.cleanScene(false) }
}
