export default function DownloadElectron() {
  const releasesUrl = "https://github.com/apenasgabs/bereal-toolkit/releases";

  return (
    <div className="downloads">
      <h2>📥 Download para Desktop</h2>
      <p>Versão atual: 1.0.0-beta</p>

      <div className="download-buttons">
        <a
          href={`${releasesUrl}/download/v1.0.0/bereal-toolkit-1.0.0.dmg`}
          className="download-btn mac"
        >
          macOS (Intel/Apple Silicon)
        </a>

        <a
          href={`${releasesUrl}/download/v1.0.0/bereal-toolkit-1.0.0.exe`}
          className="download-btn windows"
        >
          Windows (10/11)
        </a>

        <a
          href={`${releasesUrl}/download/v1.0.0/bereal-toolkit-1.0.0.AppImage`}
          className="download-btn linux"
        >
          Linux (AppImage)
        </a>
      </div>

      <div className="notes">
        <p>🔒 Builds assinadas e verificadas</p>
        <a href={releasesUrl} className="release-notes">
          Ver todas versões e notas de atualização
        </a>
      </div>
    </div>
  );
}
