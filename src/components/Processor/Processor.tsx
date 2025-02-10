import { useState } from "react";

const Processor = () => {
  const [folder, setFolder] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectFolder = async () => {
    if (window.electronAPI) {
      const selectedFolder = await window.electronAPI.selectFolder();
      setFolder(selectedFolder);
    }
  };

  const handleProcess = async () => {
    if (folder && window.electronAPI) {
      setIsProcessing(true);
      const result = await window.electronAPI.processFiles(folder);
      setResults(result);
      setIsProcessing(false);
    }
  };

  return (
    <div className="processor">
      <h2>Processar Arquivos</h2>

      <div className="folder-selector">
        <button onClick={handleSelectFolder}>
          {folder ? `Pasta: ${folder}` : "Selecionar Pasta"}
        </button>
      </div>

      <button onClick={handleProcess} disabled={!folder || isProcessing}>
        {isProcessing ? "Processando..." : "Iniciar Processamento"}
      </button>

      <div className="results">
        {results.map((result, index) => (
          <div key={index} className={`result ${result.status}`}>
            <span>{result.original}</span>
            {result.status === "success" && <span>→ {result.converted}</span>}
            {result.status === "failed" && (
              <span className="error">Erro: {result.error}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Processor;
