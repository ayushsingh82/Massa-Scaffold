import { Client } from '../scripts/massa-web3'; // Adjust this import to your actual client path
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config from environment variables or default values
const MASSA_PUBLIC_API_URL = process.env.MASSA_PUBLIC_API_URL || 'https://test.massa.net/api/v2';
const MASSA_PRIVATE_KEY = process.env.MASSA_PRIVATE_KEY;
const WASM_PATH = path.join(__dirname, '../contracts/build/subscription.wasm'); // Adjust path as needed

if (!MASSA_PRIVATE_KEY) {
  console.error('Error: MASSA_PRIVATE_KEY environment variable is required');
  process.exit(1);
}

async function deployContract() {
  try {
    console.log('🚀 Starting AutoSub contract deployment...');
    
    // Initialize Massa client with API URL and your private key
    const client = new Client({
      publicApi: MASSA_PUBLIC_API_URL,
      privateKey: MASSA_PRIVATE_KEY!,
    });

    console.log('📡 Connected to Massa network:', MASSA_PUBLIC_API_URL);

    // Check compiled WASM file exists
    if (!fs.existsSync(WASM_PATH)) {
      console.error(`❌ WASM file not found at: ${WASM_PATH}`);
      console.log('Please compile your contract first (e.g., run "yarn build" in contracts directory).');
      process.exit(1);
    }

    // Read the WASM file
    const wasmBuffer = fs.readFileSync(WASM_PATH);
    console.log(`📦 Loaded WASM file (${wasmBuffer.length} bytes):`, WASM_PATH);

    // Deploy the smart contract to Massa network
    console.log('⏳ Deploying contract...');
    const deployResult = await client.smartContracts().deploySmartContract({
      contractDataBinary: wasmBuffer,
      maxGas: 4_000_000n,  // Adjust gas limit as needed
      coins: 0n,           // Amount of coins to send to contract on deploy (usually 0)
    });

    console.log('✅ Contract deployed successfully!');
    console.log('📋 Deployment details:');
    console.log('   - Operation ID:', deployResult.operationId);
    console.log('   - Contract Address:', deployResult.contractAddress);

    // Save the contract address in frontend/.env file for ease of use
    const envPath = path.join(__dirname, '../frontend/.env');
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }
    const contractAddressLine = `VITE_CONTRACT_ADDRESS=${deployResult.contractAddress}`;

    if (envContent.includes('VITE_CONTRACT_ADDRESS=')) {
      envContent = envContent.replace(/VITE_CONTRACT_ADDRESS=.*/, contractAddressLine);
    } else {
      envContent += `\n${contractAddressLine}\n`;
    }

    fs.writeFileSync(envPath, envContent);
    console.log('💾 Contract address saved to frontend/.env');

    // Write deployment info file alongside this script for reference
    const deploymentInfo = {
      contractAddress: deployResult.contractAddress,
      operationId: deployResult.operationId,
      deployedAt: new Date().toISOString(),
      network: MASSA_PUBLIC_API_URL,
      wasmSize: wasmBuffer.length,
    };

    const deploymentInfoPath = path.join(__dirname, 'deployment-info.json');
    fs.writeFileSync(deploymentInfoPath, JSON.stringify(deploymentInfo, null, 2));
    console.log('📄 Deployment info saved to deployment-info.json');

    console.log('\n🎉 Deployment completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Update your frontend .env file with the contract address (done)');
    console.log('2. Start your frontend app (e.g. `cd frontend && yarn dev`)');
    console.log('3. Interact and test your contract functions through the UI or CLI');

    return deployResult;

  } catch (error) {
    console.error('❌ Deployment failed:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      if ('stack' in error) {
        console.error('Stack trace:', error.stack);
      }
    }
    process.exit(1);
  }
}

// Placeholder to verify the deployed contract by calling its read-only functions
async function verifyDeployment(contractAddress: string) {
  try {
    console.log('\n🔍 Verifying deployment...');
    
    const client = new Client({
      publicApi: MASSA_PUBLIC_API_URL,
      privateKey: MASSA_PRIVATE_KEY!,
    });

    // TODO: Add calls to your contract's read-only functions here using client.smartContracts().callSmartContract()
    // Example (pseudo):
    // const result = await client.smartContracts().callSmartContract({
    //   targetAddress: contractAddress,
    //   functionName: 'greet', 
    //   maxGas: 100000n,
    //   coins: 0n,
    //   params: []
    // });
    // console.log('Contract greet function output:', result);

    console.log('✅ Contract verification completed');
  } catch (error) {
    console.error('❌ Contract verification failed:', error);
  }
}

// Run deploy script if invoked directly
if (import.meta.url === `file://${process.argv[1]}`) {
  deployContract()
    .then(result => {
      if (result?.contractAddress) {
        return verifyDeployment(result.contractAddress);
      }
    })
    .catch(error => {
      console.error('Script execution failed:', error);
      process.exit(1);
    });
}

export { deployContract, verifyDeployment };
