import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  exportToCanvas,
  exportToSvg,
  exportToBlob,
  exportToClipboard,
  Excalidraw,
  useHandleLibrary,
  MIME_TYPES,
  sceneCoordsToViewportCoords,
  viewportCoordsToSceneCoords,
  restoreElements,
  LiveCollaborationTrigger,
  MainMenu,
  Footer,
  Sidebar
} from "@excalidraw/excalidraw";
import {
  AppState,
  BinaryFileData,
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
  Gesture,
  LibraryItems,
  PointerDownState as ExcalidrawPointerDownState
} from "@excalidraw/excalidraw/types/types";
import "./App.scss";

import { NonDeletedExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { nanoid } from "nanoid";
import MobileFooter from "./MobileFooter";
import {
  resolvablePromise,
  withBatchedUpdates,
  withBatchedUpdatesThrottled,
  distance2d
} from "./utils";
import { ResolvablePromise } from "@excalidraw/excalidraw/types/utils";



// This is so that we use the bundled excalidraw.development.js file instead
// of the actual source code

export default function App() {
  const [
    excalidrawAPI,
    setExcalidrawAPI
  ] = useState<ExcalidrawImperativeAPI | null>(null);

  useHandleLibrary({ excalidrawAPI });

  useEffect(() => {
    if (!excalidrawAPI) {
      return;
    }
  }, [excalidrawAPI]);

  const renderMenu = () => {
    return (
      <MainMenu>
        <MainMenu.DefaultItems.SaveAsImage />
        <MainMenu.DefaultItems.Export />
        <MainMenu.DefaultItems.Help />
      </MainMenu>
    );
  };
  return (
    <div className="App">
      <h1> Excalidraw Example</h1>

        <div className="excalidraw-wrapper">
          <Excalidraw
            excalidrawAPI={(api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api)}
            onChange={(elements, state) => {
              console.info("Elements :", elements, "State : ", state);
            }}
            viewModeEnabled={false}
            zenModeEnabled={false}
            gridModeEnabled={false}
            theme={"light"}
            name="Custom name of drawing"
            UIOptions={{
              canvasActions: { loadScene: false }
            }}
          >
        
            {renderMenu()}
          </Excalidraw>
        
        </div>
    </div>
  );
}
