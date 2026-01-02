#!/bin/bash
# ============================================================================
# BreboTeam TWA - Build Script for Linux/Mac
# ============================================================================
#
# This script helps build the TWA package for Google Play Store
#
# Prerequisites:
# 1. Node.js (v18 or higher): https://nodejs.org/
# 2. Java JDK 17: https://adoptium.net/
# 3. Android SDK Command Line Tools: https://developer.android.com/studio
#
# Usage:
# 1. Install Bubblewrap: npm install -g @bubblewrap/cli
# 2. Make executable: chmod +x build.sh
# 3. Run: ./build.sh
#
# ============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "========================================================================"
echo "  BreboTeam TWA - Build Script"
echo "========================================================================"
echo -e "${NC}"

# Check Node.js
echo -e "${BLUE}[1/5]${NC} Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}  ERROR: Node.js not found. Please install Node.js v18+${NC}"
    echo "  Download: https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}  OK: Node.js $(node --version) is installed${NC}"

# Check Java
if ! command -v java &> /dev/null; then
    echo -e "${RED}  ERROR: Java JDK 17 not found. Please install Java JDK 17${NC}"
    echo "  Download: https://adoptium.net/"
    exit 1
fi
echo -e "${GREEN}  OK: Java is installed$(NC)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}  ERROR: npm not found${NC}"
    exit 1
fi
echo -e "${GREEN}  OK: npm $(npm --version) is installed${NC}"

echo ""
echo -e "${BLUE}[2/5]${NC} Installing Bubblewrap..."

# Install Bubblewrap globally
if ! command -v bubblewrap &> /dev/null; then
    echo "  Installing @bubblewrap/cli..."
    npm install -g @bubblewrap/cli
else
    echo -e "${GREEN}  OK: Bubblewrap is already installed${NC}"
fi

echo ""
echo -e "${BLUE}[3/5]${NC} Initializing TWA project..."
echo -e "${YELLOW}  This will prompt for configuration options...${NC}"
echo ""

# Initialize Bubblewrap with the PWA manifest
bubblewrap init --manifest https://ogxhm8fvphgw.space.minimax.io/manifest.json

if [ $? -ne 0 ]; then
    echo -e "${RED}  ERROR: Bubblewrap init failed${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}[4/5]${NC} Building the app..."
bubblewrap build

if [ $? -ne 0 ]; then
    echo -e "${RED}  ERROR: Build failed${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}[5/5]${NC} Generating signing key info..."

# Generate signing key info file
cat > signing-key-info.txt << 'EOF'
# ============================================================================
# BreboTeam TWA - Signing Key Information
# ============================================================================
# Generated: $(date)
# ============================================================================

IMPORTANT: Keep this file safe and private!

Your keystore was created during initialization (breboteam-release.keystore).
Please record the following information:

- Keystore Location: ./breboteam-release.keystore
- Key Alias: breboteam_key
- The passwords you entered during setup

WARNING: If you lose your keystore or passwords,
you CANNOT update the app on Google Play Store!

BACKUP RECOMMENDATION:
1. Copy breboteam-release.keystore to a secure location
2. Store passwords in a password manager
3. Consider keeping an encrypted backup in cloud storage
# ============================================================================
EOF

echo -e "${GREEN}"
echo "========================================================================"
echo "  BUILD COMPLETE!"
echo "========================================================================"
echo -e "${NC}"
echo ""
echo "Output files:"
echo -e "  ${GREEN}app-release-bundle.aab${NC}   - Upload to Google Play Store"
echo -e "  ${GREEN}app-release-signed.apk${NC}   - For testing on device"
echo -e "  ${GREEN}assetlinks.json${NC}          - Upload to your server"
echo -e "  ${GREEN}breboteam-release.keystore${NC} - Keep safe! Backup!"
echo ""
echo "NEXT STEPS:"
echo ""
echo -e "${YELLOW}1. Upload assetlinks.json to your server:${NC}"
echo "   Path: https://ogxhm8fvphgw.space.minimax.io/.well-known/assetlinks.json"
echo ""
echo -e "${YELLOW}2. Upload app-release-bundle.aab to Google Play Console${NC}"
echo ""
echo -e "${YELLOW}3. Add screenshots and description in Play Console${NC}"
echo ""
echo "========================================================================"
