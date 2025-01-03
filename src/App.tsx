import { useEffect, useState } from "react";
import {
  Excalidraw,
  useHandleLibrary,
  MainMenu,
} from "@excalidraw/excalidraw";
import {
  ExcalidrawImperativeAPI,
} from "@excalidraw/excalidraw/types/types";
import "./App.scss";

export default function App() {
  const [
    excalidrawAPI,
    setExcalidrawAPI
  ] = useState<ExcalidrawImperativeAPI | null>(null);

  // Using the hook to load the library only after the API is initialized
  useHandleLibrary({ excalidrawAPI });

  useEffect(() => {
    if (!excalidrawAPI) {
      console.error("Excalidraw API not initialized.");
      return;
    }
    // You can use the excalidrawAPI here for imperative calls
  }, [excalidrawAPI]);

  // Function to render the custom menu
  const renderMenu = () => {
    return (
      <MainMenu>
        <MainMenu.DefaultItems.SaveAsImage aria-label="Save as Image" />
        <MainMenu.DefaultItems.Export aria-label="Export Drawing" />
        <MainMenu.DefaultItems.Help aria-label="Help and Documentation" />
      </MainMenu>
    );
  };

  return (
    <div className="App">
      <h1>Excalidraw Example</h1>

      <div className="excalidraw-wrapper">
        <Excalidraw
          excalidrawAPI={(api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api)}
          onChange={(elements, state) => {
            console.info("Elements:", elements, "State:", state);
          }}
          viewModeEnabled={false}
          zenModeEnabled={false}
          gridModeEnabled={false}
          theme={"light"}
          name="Custom Drawing Name"
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
