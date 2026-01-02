#!/usr/bin/env node
/**
 * Generate Asset Links JSON for TWA Domain Verification
 * 
 * This script generates the assetlinks.json file needed for TWA
 * domain verification in Google Play Store.
 * 
 * Usage:
 *   node generate-assetlinks.js --keystore=/path/to/keystore --alias=key-alias
 * 
 * Or manually:
 *   node generate-assetlinks.js --fingerprint="SHA256:FINGERPRINT" --package="io.minimax.breboteam"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const DEFAULT_PACKAGE = 'io.minimax.breboteam';
const OUTPUT_FILE = 'assetlinks.json';

// Parse command line arguments
const args = process.argv.slice(2);
const config = {
    keystore: null,
    alias: 'breboteam_key',
    fingerprint: null,
    package: DEFAULT_PACKAGE,
    output: OUTPUT_FILE
};

for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--keystore=')) {
        config.keystore = arg.split('=')[1];
    } else if (arg.startsWith('--alias=')) {
        config.alias = arg.split('=')[1];
    } else if (arg.startsWith('--fingerprint=')) {
        config.fingerprint = arg.split('=')[1];
    } else if (arg.startsWith('--package=')) {
        config.package = arg.split('=')[1];
    } else if (arg.startsWith('--output=')) {
        config.output = arg.split('=')[1];
    }
}

/**
 * Get SHA-256 fingerprint from keystore
 */
function getFingerprintFromKeystore(keystorePath, alias) {
    try {
        // Read password from environment or prompt
        const password = process.env.KEYSTORE_PASSWORD || 
                        process.env.KEY_PASSWORD || 
                        'changeit';
        
        // Use keytool to get fingerprint
        const command = `keytool -list -v -keystore "${keystorePath}" -alias "${alias}" -storepass "${password}" 2>/dev/null`;
        const output = execSync(command, { encoding: 'utf8' });
        
        // Parse SHA-256 fingerprint
        const match = output.match(/SHA256:\s*([A-F0-9:]+)/i);
        if (match && match[1]) {
            return match[1].toUpperCase();
        }
        
        throw new Error('Could not parse SHA-256 fingerprint');
    } catch (error) {
        throw new Error(`Failed to get fingerprint from keystore: ${error.message}`);
    }
}

/**
 * Generate assetlinks.json content
 */
function generateAssetLinks(fingerprint, packageName) {
    const assetLinks = [{
        relation: ['delegate_permission/common.handle_all_urls'],
        target: {
            namespace: 'android_app',
            package_name: packageName,
            sha256_fingerprint: fingerprint
        }
    }];
    
    return JSON.stringify(assetLinks, null, 4);
}

/**
 * Main function
 */
async function main() {
    console.log('');
    console.log('╔════════════════════════════════════════════════════════════════╗');
    console.log('║  Asset Links Generator for TWA Domain Verification              ║');
    console.log('╚════════════════════════════════════════════════════════════════╝');
    console.log('');

    try {
        // Get fingerprint
        let fingerprint = config.fingerprint;
        
        if (!fingerprint && config.keystore) {
            console.log('🔐 Getting SHA-256 fingerprint from keystore...');
            fingerprint = getFingerprintFromKeystore(config.keystore, config.alias);
            console.log(`   Fingerprint: ${fingerprint}`);
        } else if (!fingerprint) {
            throw new Error(
                'No fingerprint provided. Either:\n' +
                '  1. Use --keystore=/path/to/keystore --alias=key-alias\n' +
                '  2. Use --fingerprint="XX:XX:XX:..."\n' +
                '  3. Set KEYSTORE_PASSWORD and KEY_PASSWORD environment variables'
            );
        }

        // Generate assetlinks.json
        console.log('');
        console.log('📝 Generating assetlinks.json...');
        const content = generateAssetLinks(fingerprint, config.package);
        
        // Write to file
        fs.writeFileSync(config.output, content, 'utf8');
        
        console.log(`   Written to: ${path.resolve(config.output)}`);
        console.log('');
        console.log('✅ Success! Asset links generated.');
        console.log('');
        console.log('📋 Next Steps:');
        console.log('   1. Upload this file to your server at:');
        console.log(`      https://ogxhm8fvphgw.space.minimax.io/.well-known/assetlinks.json`);
        console.log('');
        console.log('   2. Verify it\'s accessible:');
        console.log('      curl https://ogxhm8fvphgw.space.minimax.io/.well-known/assetlinks.json');
        console.log('');
        console.log('   3. Wait a few minutes, then test your TWA app');
        console.log('');
        
        // Display the generated content
        console.log('📄 Generated content:');
        console.log('─'.repeat(60));
        console.log(content);
        console.log('─'.repeat(60));
        console.log('');
        
    } catch (error) {
        console.error('');
        console.error('❌ Error:', error.message);
        console.error('');
        process.exit(1);
    }
}

// Run main function
main();
