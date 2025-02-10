import { useState } from "react";
import "./App.css";
import ComingSoon from "./components/ComingSoon";
import DownloadElectron from "./components/DownloadElectron";

function App() {
  const [activeTab, setActiveTab] = useState<"web" | "desktop">("web");
  const handleProcess = async () => {
    if (window.electronAPI) {
      const folder = await window.electronAPI.selectFolder();
      const result = await window.electronAPI.processFiles(folder);
      console.log(result);
    } else {
      alert("Funcionalidade disponível apenas na versão desktop");
    }
  };
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
      <button onClick={handleProcess}>Processar Arquivos</button>

      {activeTab === "web" ? <ComingSoon /> : <DownloadElectron />}
    </div>
  );
}

export default App;
