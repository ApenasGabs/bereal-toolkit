#!/bin/bash

# Sair do script se qualquer comando falhar
set -e

echo "🔧 Criando estrutura do projeto..."
git init

echo "📦 Inicializando monorepo com PNPM..."
# pnpm init -y

# Adiciona configuração de workspaces no package.json
jq '. + { "private": true, "workspaces": ["packages/*"] }' package.json > temp.json && mv temp.json package.json

echo "📁 Criando diretórios..."
mkdir -p packages/app packages/electron-core

echo "⚡ Criando o frontend (Vite + React + TypeScript)..."
cd packages
pnpm create vite app --template react-ts
cd app
pnpm install

echo "⚙️ Criando o backend (Electron + TypeScript)..."
cd ..
mkdir electron-core && cd electron-core
pnpm init
pnpm add electron electron-builder concurrently wait-on --save-dev
pnpm add @electron/remote
pnpm add typescript ts-node @types/node -D

# Criando tsconfig.json
cat <<EOT > tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true
  }
}
EOT

# Criando diretório e arquivo principal do Electron
mkdir src
cat <<EOT > src/main.ts
import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL('http://localhost:5173'); // Porta do Vite
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
EOT

# Adicionando scripts no package.json do electron-core
jq '.scripts += { "dev": "ts-node src/main.ts", "build": "electron-builder" }' package.json > temp.json && mv temp.json package.json

echo "🛠️ Configurando scripts no package.json do projeto raiz..."
cd ../../
jq '.scripts += { "dev": "concurrently \\"pnpm --filter app dev\\" \\"pnpm --filter electron-core dev\\"" }' package.json > temp.json && mv temp.json package.json

echo "✅ Setup concluído! Para iniciar, execute:"
echo "cd meu-projeto && pnpm dev"
