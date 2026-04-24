@echo off
title Velocity Prototype – Dev Server
echo.
echo  Starting Velocity Prototype dev server...
echo  Open http://localhost:5173 in your browser once ready.
echo.
cd /d "%~dp0"
npm run dev
pause
