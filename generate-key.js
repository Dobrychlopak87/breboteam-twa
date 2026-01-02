#!/usr/bin/env node
/**
 * Generate Signing Key for TWA App
 * 
 * This script creates a new signing key (keystore) for the TWA app.
 * 
 * Usage:
 *   node generate-key.js [--keystore=breboteam-release.keystore] [--alias=breboteam_key]
 * 
 * Environment variables (optional):
 *   KEYSTORE_PASSWORD - Password for the keystore
 *   KEY_PASSWORD - Password for the key
 *   KEYSTORE_NAME - Name for the key owner
 *   KEYSTORE_ORG_UNIT - Organization unit
 *   KEYSTORE_CITY - City
 *   KEYSTORE_STATE - State/Province
 *   KEYSTORE_COUNTRY - Country code (2 letters)
 *   KEYSTORE_VALIDITY - Validity in years (default: 25)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

// Configuration
const config = {
    keystore: process.env.KEYSTORE_PATH || 'breboteam-release.keystore',
    alias: process.env.KEY_ALIAS || 'breboteam_key',
    storePassword: process.env.KEYSTORE_PASSWORD || null,
    keyPassword: process.env.KEY_PASSWORD || null,
    dname: {
        CN: process.env.KEYSTORE_NAME || 'BreboTeam Developer',
        OU: process.env.KEYSTORE_ORG_UNIT || 'Development',
        O: process.env.KEYSTORE_ORG || 'BreboTeam',
        L: process.env.KEYSTORE_CITY || 'Warsaw',
        ST: process.env.KEYSTORE_STATE || 'Mazovia',
        C: process.env.KEYSTORE_COUNTRY || 'PL'
    },
    validity: parseInt(process.env.KEYSTORE_VALIDITY) || 25,
    keyalg: 'RSA',
    keysize: 2048,
    sigalg: 'SHA256withRSA'
};

// Prompts for missing values
const prompts = {
    storePassword: async () => {
        if (config.storePassword) return config.storePassword;
        return await askQuestion('Enter keystore password: ', true);
    },
    keyPassword: async () => {
        if (config.keyPassword) return config.keyPassword;
        return await askQuestion('Enter key password (same as keystore or Enter): ', true);
    }
};

/**
 * Ask a question and get answer
 */
async function askQuestion(question, hidden = false) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    return new Promise((resolve) => {
        const fn = hidden ? rl.question : rl.question;
        fn.call(rl, question, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

/**
 * Generate DName string
 */
function getDName() {
    const parts = [];
    if (config.dname.CN) parts.push(`CN=${config.dname.CN}`);
    if (config.dname.OU) parts.push(`OU=${config.dname.OU}`);
    if (config.dname.O) parts.push(`O=${config.dname.O}`);
    if (config.dname.L) parts.push(`L=${config.dname.L}`);
    if (config.dname.ST) parts.push(`ST=${config.dname.ST}`);
    if (config.dname.C) parts.push(`C=${config.dname.C}`);
    return parts.join(', ');
}

/**
 * Check if keytool is available
 */
async function checkKeytool() {
    try {
        await exec('keytool -version');
        return true;
    } catch {
        return false;
    }
}

/**
 * Main function
 */
async function main() {
    console.log('');
    console.log('╔════════════════════════════════════════════════════════════════╗');
    console.log('║  Signing Key Generator for TWA App                              ║');
    console.log('╚════════════════════════════════════════════════════════════════╝');
    console.log('');

    // Check for keytool
    const hasKeytool = await checkKeytool();
    if (!hasKeytool) {
        console.error('❌ Error: keytool not found.');
        console.error('');
        console.error('Please install Java JDK 17:');
        console.error('  Windows/Mac/Linux: https://adoptium.net/');
        console.error('');
        console.error('After installation, ensure "keytool" is in your PATH.');
        process.exit(1);
    }

    // Get passwords
    console.log('📋 Configuration:');
    console.log(`   Keystore: ${config.keystore}`);
    console.log(`   Key Alias: ${config.alias}`);
    console.log(`   Validity: ${config.validity} years`);
    console.log(`   DName: ${getDName()}`);
    console.log('');

    // Get passwords if not provided
    const storePass = await prompts.storePassword();
    const keyPass = await prompts.keyPassword() || storePass;

    // Check if keystore already exists
    if (fs.existsSync(config.keystore)) {
        console.warn('');
        console.warn('⚠️  Warning: Keystore already exists!');
        console.warn('   Continuing will overwrite it and make previous installs invalid.');
        console.warn('');
        const confirm = await askQuestion('Do you want to overwrite? (y/N): ');
        if (confirm.toLowerCase() !== 'y') {
            console.log('Cancelled.');
            process.exit(0);
        }
    }

    // Generate keystore
    console.log('');
    console.log('🔐 Generating signing key...');

    const dname = getDName();
    const command = `keytool -genkeypair \
        -v \
        -keystore "${config.keystore}" \
        -alias "${config.alias}" \
        -keyalg "${config.keyalg}" \
        -keysize "${config.keysize}" \
        -sigalg "${config.sigalg}" \
        -validity "${config.validity * 365}" \
        -storepass "${storePass}" \
        -keypass "${keyPass}" \
        -dname "${dname}" 2>&1`;

    try {
        execSync(command, { stdio: 'pipe' });
        
        console.log('✅ Key generated successfully!');
        console.log('');
        console.log('📁 File created: ' + path.resolve(config.keystore));
        console.log('');
        
        // Get fingerprint for reference
        const fingerprintCmd = `keytool -list -v -keystore "${config.keystore}" -alias "${config.alias}" -storepass "${storePass}" 2>/dev/null`;
        const fingerprintOutput = execSync(fingerprintCmd, { encoding: 'utf8' });
        const fingerprintMatch = fingerprintOutput.match(/SHA256:\s*([A-F0-9:]+)/i);
        
        if (fingerprintMatch) {
            console.log('🔑 SHA-256 Fingerprint:');
            console.log('   ' + fingerprintMatch[1].toUpperCase());
            console.log('');
        }

        // Generate signing-key-info.txt
        const infoContent = `# ============================================================================
# BreboTeam TWA - Signing Key Information
# ============================================================================
# Generated: ${new Date().toISOString()}
# ============================================================================

IMPORTANT: Keep this file safe and private!

## Keystore Information
- File: ${path.resolve(config.keystore)}
- Alias: ${config.alias}
- Algorithm: ${config.keyalg} ${config.keysize}-bit
- Signature: ${config.sigalg}
- Validity: ${config.validity} years

## Passwords
⚠️  RECORD YOUR PASSWORDS BELOW:
- Keystore Password: ${storePass}
- Key Password: ${keyPass}

## SHA-256 Fingerprint (for assetlinks.json)
${fingerprintMatch ? fingerprintMatch[1].toUpperCase() : '[Get from keystore]'}

## Usage Examples

Generate assetlinks.json:
  keytool -list -v -keystore "${config.keystore}" -alias "${config.alias}"

Sign a new build:
  # Bubblewrap handles this automatically during build

## Security Recommendations

1. BACKUP THIS KEYSTORE FILE!
   Copy to secure, offline storage (USB drive, encrypted cloud)

2. Use a password manager for passwords

3. Never commit this file to version control

4. Use the same key for all app updates

## If You Lose This Key

⚠️  WARNING: If you lose the keystore or passwords:
- You CANNOT publish updates to Google Play Store
- You CANNOT install over existing app installations
- You MUST create a new app with a new package name

## Next Steps

1. Store this file securely
2. Record passwords in password manager
3. Use "bubblewrap build" to create your TWA app
4. When prompted, use this keystore

# ============================================================================
`;
        
        fs.writeFileSync('signing-key-info.txt', infoContent, 'utf8');
        console.log('📄 Info file created: signing-key-info.txt');
        console.log('');
        
        console.log('═══════════════════════════════════════════════════════════════════');
        console.log('  NEXT STEPS');
        console.log('═══════════════════════════════════════════════════════════════════');
        console.log('');
        console.log('1. ✅ Key generated successfully');
        console.log('2. 📄 Review signing-key-info.txt');
        console.log('3. 🔐 Store keystore file securely');
        console.log('4. 📝 Record passwords in password manager');
        console.log('5. 🚀 Run: bubblewrap build');
        console.log('');
        
    } catch (error) {
        console.error('');
        console.error('❌ Error generating key:', error.message);
        process.exit(1);
    }
}

// Run main
main().catch(console.error);
