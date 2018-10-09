@echo off
echo Starting to clear data¡­ 
set var=%cd%
node db/db.js
cd %var%
echo Clearing data is complete.
pause