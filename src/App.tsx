import { useState } from "react";
import "./App.css";
import ComingSoon from "./components/ComingSoon";
import DownloadElectron from "./components/DownloadElectron";

function App() {
  const [activeTab, setActiveTab] = useState<"web" | "desktop">("web");

  return (
    <div className="container">
      <h1 className="title">BeReal Toolkit</h1>

      <div className="tabs">
        <button
          className={activeTab === "web" ? "active" : ""}
          onClick={() => setActiveTab("web")}
        >
          Versão Web
        </button>
        <button
          className={activeTab === "desktop" ? "active" : ""}
          onClick={() => setActiveTab("desktop")}
        >
          Versão Desktop
        </button>
      </div>

      {activeTab === "web" ? <ComingSoon /> : <DownloadElectron />}
    </div>
  );
}

export default App;
