@echo off
SETLOCAL
SET "NODE_DIR=%LOCALAPPDATA%\Programs\nodejs"
SET "MARIADB_DIR=%LOCALAPPDATA%\Programs\mariadb"
SET "PATH=%NODE_DIR%;%MARIADB_DIR%\bin;%PATH%"

echo ========================================================
echo   INICIALIZANDO SERVICOS TALENTFLOW (MARIADB + API + WEB)
echo ========================================================

REM 1. Iniciar MariaDB caso nao esteja rodando
tasklist /FI "IMAGENAME eq mariadbd.exe" 2>NUL | find /I /N "mariadbd.exe">NUL
if errorlevel 1 (
    echo [1/3] Iniciando MariaDB na porta 3306...
    start "" /B "%MARIADB_DIR%\bin\mariadbd.exe" --defaults-file="%MARIADB_DIR%\data\my.ini" --skip-ssl --port=3306
    timeout /t 3 /nobreak >NUL
) else (
    echo [1/3] MariaDB ja esta em execucao na porta 3306.
)

REM 2. Iniciar Backend REST API (Porta 3001) caso nao esteja em uso
netstat -ano | findstr ":3001 " | findstr "LISTENING" >NUL
if errorlevel 1 (
    echo [2/3] Iniciando API Backend Node.js na porta 3001...
    cd /d "C:\trabalho_guto\talentflow\backend"
    start "" /B "%NODE_DIR%\node.exe" server.js
) else (
    echo [2/3] API Backend ja esta em execucao na porta 3001.
)

REM 3. Iniciar Aplicacao Web (Vite na porta 80 com proxy /api) caso a porta 80 nao esteja em uso
netstat -ano | findstr ":80 " | findstr "LISTENING" >NUL
if errorlevel 1 (
    echo [3/3] Iniciando Web Platform na porta 80...
    cd /d "C:\trabalho_guto\talentflow\web_platform"
    start "" /B "%NODE_DIR%\node.exe" "node_modules\vite\bin\vite.js"
) else (
    echo [3/3] Web Platform ja esta em execucao na porta 80.
)

echo ========================================================
echo   TODOS OS SERVICOS FORAM VERIFICADOS E DISPARADOS!
echo   Publico: https://talentflow.tail5f8db5.ts.net/
echo   API    : https://talentflow.tail5f8db5.ts.net/api/health
echo ========================================================
