const Web3 = require('web3');

// Replace these with your actual Infura or BSC node URLs
const infuraUrl = 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY';
const bscUrl = 'https://bsc-dataseed.binance.org/';

const web3Mainnet = new Web3(infuraUrl);
const web3BSC = new Web3(bscUrl);

const addressesToCheck = [
  '0xAddress1',
  '0xAddress2',
  // Add more addresses as needed
];

async function getAllNativeBalances() {
  try {
    // Fetch balances on Ethereum mainnet
    console.log('Balances on Ethereum Mainnet:');
    await getBalancesForChain(web3Mainnet, addressesToCheck);

    // Fetch balances on Binance Smart Chain
    console.log('\nBalances on Binance Smart Chain:');
    await getBalancesForChain(web3BSC, addressesToCheck);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getBalancesForChain(web3, addresses) {
  for (const address of addresses) {
    try {
      const balanceWei = await web3.eth.getBalance(address);
      const balanceEther = web3.utils.fromWei(balanceWei, 'ether');

      console.log(`Native Balance of ${address}: ${balanceEther} ETH`);
    } catch (error) {
      console.error(`Error fetching balance for ${address}:`, error);
    }
  }
}

// Call the function to fetch balances on all chains
getAllNativeBalances();
