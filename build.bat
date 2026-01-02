@rem ============================================================================
@rem BreboTeam TWA - Build Script for Windows
@rem ============================================================================
@rem This script helps build the TWA package for Google Play Store
@rem 
@rem Prerequisites:
@rem 1. Node.js (v18 or higher): https://nodejs.org/
@rem 2. Java JDK 17: https://adoptium.net/
@rem 3. Android SDK Command Line Tools: https://developer.android.com/studio
@rem
@rem Usage:
@rem 1. Install Bubblewrap: npm install -g @bubblewrap/cli
@rem 2. Run this script: build.bat
@rem 
@rem ============================================================================

@echo off
chcp 65001 >nul
echo.
echo ============================================================================
echo   BreboTeam TWA - Build Script
echo ============================================================================
echo.
echo [1/5] Checking prerequisites...

rem Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo   ERROR: Node.js not found. Please install Node.js v18+
    goto :error
)
echo   OK: Node.js is installed

rem Check Java
java -version >nul 2>&1
if errorlevel 1 (
    echo   ERROR: Java JDK 17 not found. Please install Java JDK 17
    echo   Download: https://adoptium.net/
    goto :error
)
echo   OK: Java is installed

echo.
echo [2/5] Installing Bubblewrap (if not installed)...
npm install -g @bubblewrap/cli --silent 2>nul
if errorlevel 1 (
    echo   WARNING: Could not install Bubblewrap globally
    echo   Trying local installation...
    npm install @bubblewrap/cli --silent
)

echo.
echo [3/5] Initializing TWA project...
echo   This will prompt for configuration options...
echo.
bubblewrap init --manifest https://ogxhm8fvphgw.space.minimax.io/manifest.json

if errorlevel 1 (
    echo   ERROR: Bubblewrap init failed
    goto :error
)

echo.
echo [4/5] Building the app...
bubblewrap build

if errorlevel 1 (
    echo   ERROR: Build failed
    goto :error
)

echo.
echo [5/5] Generating signing key info...
echo.
echo Generating signing key information file...
echo # ============================================================================ >> signing-key-info.txt
echo # BreboTeam TWA - Signing Key Information >> signing-key-info.txt
echo # Generated: %date% %time% >> signing-key-info.txt
echo # ============================================================================ >> signing-key-info.txt
echo. >> signing-key-info.txt
echo IMPORTANT: Keep this file safe and private! >> signing-key-info.txt
echo. >> signing-key-info.txt
echo Your keystore was created during initialization. >> signing-key-info.txt
echo Please record the following information: >> signing-key-info.txt
echo. >> signing-key-info.txt
echo - Keystore Location: ./breboteam-release.keystore >> signing-key-info.txt
echo - Key Alias: breboteam_key >> signing-key-info.txt
echo - The passwords you entered during setup >> signing-key-info.txt
echo. >> signing-key-info.txt
echo WARNING: If you lose your keystore or passwords, >> signing-key-info.txt
echo you CANNOT update the app on Google Play Store! >> signing-key-info.txt
echo # ============================================================================ >> signing-key-info.txt

echo.
echo ============================================================================
echo   BUILD COMPLETE!
echo ============================================================================
echo.
echo Output files:
echo   - app-release-bundle.aab   (Upload to Google Play Store)
echo   - app-release-signed.apk   (For testing on device)
echo   - assetlinks.json          (Upload to your server)
echo   - breboteam-release.keystore (Keep safe! Backup!)
echo.
echo NEXT STEPS:
echo 1. Upload assetlinks.json to your server at:
echo    https://ogxhm8fvphgw.space.minimax.io/.well-known/assetlinks.json
echo.
echo 2. Upload app-release-bundle.aab to Google Play Console
echo.
echo 3. Add screenshots and description in Play Console
echo.
echo ============================================================================
goto :eof

:error
echo.
echo ============================================================================
echo   BUILD FAILED
echo ============================================================================
echo.
echo Please check the error messages above and try again.
echo.
echo Troubleshooting:
echo - Make sure Node.js and Java JDK 17 are installed
echo - Run this script from the project directory
echo - Check your internet connection
echo.
pause
exit /b 1

:eof
