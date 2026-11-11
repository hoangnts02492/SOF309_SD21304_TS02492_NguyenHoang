@echo off
chcp 65001 >nul
title Conbovuive Gear - Khoi Chay Website

echo ================================================================
echo       CONBOVUIVE GEAR - GAMING GEAR ^& HIGH-END PC STORE
echo      He thong tu dong kiem tra va khoi chay tren may moi
echo ================================================================
echo.

cd /d "%~dp0"

:: 1. KIEM TRA NODE.JS
echo [1/4] Kiem tra Node.js tren may tinh...
where node >nul 2>nul
if %errorlevel% equ 0 goto :node_found

echo.
echo [CANH BAO] May tinh chua cai dat Node.js!
echo Dang thu cai dat Node.js tu dong qua winget hoac PowerShell...
echo.

where winget >nul 2>nul
if %errorlevel% neq 0 goto :download_node_ps

echo Dang cai dat Node.js LTS bang winget...
winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
goto :node_installed

:download_node_ps
echo Dang tai bo cai dat Node.js tu nodejs.org...
powershell -NoProfile -ExecutionPolicy Bypass -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi', 'node_setup.msi'); Start-Process msiexec.exe -ArgumentList '/i node_setup.msi /passive' -Wait; Remove-Item 'node_setup.msi' -Force -ErrorAction SilentlyContinue"

:node_installed
echo.
echo ================================================================
echo [THONG BAO] Da cai dat xong Node.js!
echo Vui long dong cua so nay va chay lai file start.bat de ap dung.
echo ================================================================
echo.
pause
exit /b

:node_found
echo [OK] Da tim thay Node.js san sang!

:: 2. KIEM TRA NODE_MODULES
echo.
echo [2/4] Kiem tra cac thu vien va plugin (Express, Tailwind CSS)...
if exist "node_modules\" goto :modules_found

echo [!] Chua co thu vien. Dang tu dong chay npm install...
echo Vui long cho trong giay lat...
call npm install
if %errorlevel% neq 0 (
    echo [LOI] Khong the cai dat thu vien. Vui long kiem tra ket noi Internet.
    pause
    exit /b
)
echo [OK] Cai dat cac thu vien thanh cong!
goto :check_tailwind

:modules_found
echo [OK] Thu vien da duoc cai dat day du!

:: 3. KIEM TRA TAILWIND CSS
:check_tailwind
echo.
echo [3/4] Kiem tra giao dien Tailwind CSS...
if exist "public\css\tailwind.css" goto :css_ready

echo [!] Dang bien dich ma nguon Tailwind CSS...
call npm run build:css

:css_ready
echo [OK] File giao dien Tailwind CSS da san sang!

:: 4. KHOI CHAY SERVER VA MO TRINH DUYET
echo.
echo [4/4] Dang khoi chay Server Node.js tai http://localhost:3000...
echo Trinh duyet se tu dong mo trong giay lat...
echo.

start "" powershell -NoProfile -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:3000'"

node server.js

pause
