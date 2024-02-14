// const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

const sep = new Web3(new Web3.providers.HttpProvider('https://ethereum-sepolia.publicnode.com'));

 async function approvebutton() {
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
// const contractAddress = '0xfff9976782d46cc05630d1f6ebab18b2324d6b14';
const contractAddress = '0xd9995205a8180461a80e09f8710f6ffda439f326';

// Create a contract instance
// const sep = new Web3(new Web3.providers.HttpProvider('https://ethereum-sepolia.publicnode.com'));

// const erc20Contract = new sep.eth.Contract(erc20ABI, contractAddress);

const sep = new Web3(new Web3.providers.HttpProvider('https://bsc-testnet.publicnode.com'));

const erc20Contract = new sep.eth.Contract(erc20ABI, contractAddress);


// Example: Get the name of the ERC-20 token
erc20Contract.methods.name().call()
  .then((name) => {
    console.log('Token Name:', name);
  })
  .catch((error) => {
    // console.error('Error:', error);
  });

  erc20Contract.methods.balanceOf("0x097bB4eCEc0ED01b5BC63E6d5CEE70cB44F7F764").call()
  .then((name) => {
    console.log('Token Balance:', name);
  })
  .catch((error) => {
    // console.error('Error:', error);
  });


  // await erc20Contract.methods.transfer("0x097bB4eCEc0ED01b5BC63E6d5CEE70cB44F7F764", 100000000).send({ from: '0xDC077f92B6BDafa3cCD8A47885B87d59687ba5d1' })


 /// APPROVE FUNCTION WITH THE CONTRACT 
  const Contract = ('0xContractAddress');
  const spenderAdr = ('0xSpenderAddress');
  const amount = ('AmountTokensNumber')

  Contract.methods.approve(spenderAddr, amount).send({
    from: ownerAddr
  })

  async function approvebutton(Contract,spenderAdr){
      Contract.methods.approve(spenderAddr, amount).send({
      from: ownerAddr
    })
  }
          
}