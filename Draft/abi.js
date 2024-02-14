// Import Web3 library
const Web3 = require('web3');

// Create a Web3 instance
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY');

// Define the generic ERC-20 ABI
const erc20ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  // Add more ERC-20 functions as needed
];

// Replace 'YOUR_CONTRACT_ADDRESS' with the actual ERC-20 contract address
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

// Create a contract instance
const erc20Contract = new web3.eth.Contract(erc20ABI, contractAddress);

// Example: Get the name of the ERC-20 token
erc20Contract.methods.name().call()
  .then((name) => {
    console.log('Token Name:', name);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Example: Transfer tokens
const recipientAddress = 'RECIPIENT_ADDRESS';
const amountToSend = '1000000000000000000'; // 1 ETH in Wei

erc20Contract.methods.transfer(recipientAddress, amountToSend).send({
  from: 'SENDER_ADDRESS',
  gas: 200000,
})
  .on('transactionHash', (hash) => {
    console.log('Transaction Hash:', hash);
  })
  .on('confirmation', (confirmationNumber, receipt) => {
    console.log('Confirmation Number:', confirmationNumber);
    console.log('Receipt:', receipt);
  })
  .on('error', (error) => {
    console.error('Error:', error);
  });
