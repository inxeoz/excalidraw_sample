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
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isGridEnabled, setIsGridEnabled] = useState(false);

  // Using the hook to load the library only after the API is initialized
  useHandleLibrary({ excalidrawAPI });

  useEffect(() => {
    if (!excalidrawAPI) {
      console.error("Excalidraw API not initialized.");
      return;
    }
  }, [excalidrawAPI]);

  // Function to handle import scene
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const sceneData = await file.text();
    try {
      const parsedScene = JSON.parse(sceneData);
      excalidrawAPI?.resetScene(parsedScene);
    } catch (error) {
      alert("Invalid scene file.");
    }
  };

  // Function to handle export scene
  const handleExport = () => {
    if (excalidrawAPI) {
      const scene = excalidrawAPI.getSceneElements();
      const sceneData = JSON.stringify(scene);
      const blob = new Blob([sceneData], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "excalidraw_scene.json";
      link.click();
    }
  };

  // Function to render the custom menu with additional items
  const renderMenu = () => {
    return (
      <MainMenu>
        <MainMenu.DefaultItems.SaveAsImage aria-label="Save as Image" />
        <MainMenu.DefaultItems.Export aria-label="Export Drawing" />
        <MainMenu.DefaultItems.Help aria-label="Help and Documentation" />

        <div className="menu-item">
          <button onClick={() => setIsGridEnabled(!isGridEnabled)}>
            Toggle Grid {isGridEnabled ? "Off" : "On"}
          </button>
        </div>

        <div className="menu-item">
          <button onClick={() => setIsDarkTheme(!isDarkTheme)}>
            Toggle Theme {isDarkTheme ? "Light" : "Dark"}
          </button>
        </div>

        <div className="menu-item">
          <label>
            Import Scene:
            <input type="file" accept=".json" onChange={handleImport} />
          </label>
        </div>

        <div className="menu-item">
          <button onClick={handleExport}>Export Scene</button>
        </div>
      </MainMenu>
    );
  };

  return (
    <div className={`App ${isDarkTheme ? "dark" : "light"}`}>
      <h1>Excalidraw Example</h1>

      <div className="excalidraw-wrapper">
        <Excalidraw
          excalidrawAPI={(api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api)}
          onChange={(elements, state) => {
            console.info("Elements:", elements, "State:", state);
          }}
          viewModeEnabled={false}
          zenModeEnabled={false}
          gridModeEnabled={isGridEnabled}
          theme={isDarkTheme ? "dark" : "light"}
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
