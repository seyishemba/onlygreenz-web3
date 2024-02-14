console.log(window.ethereum)
    let account; 
    if (typeof window.ethereum !== 'undefined') {
      // ethereum.request({ method: 'eth_requestAccounts' });
      window.ethereum.request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        account = accounts[0];
        // console.log('Connected to MetaMask:', account);
        init()
      })
      .catch((error) => {
        // console.error('MetaMask connection error:', error);
      });


  } else {
      alert('Please install metamask')
  }

  async function init(){
    // Replace these with your actual Infura or BSC node URLs
    const infuraUrl = 'https://mainnet.infura.io/v3/fe4cd800ec8b4418b894a7a708df8d3c';
    const bscUrl = 'https://bsc-testnet.publicnode.com/';
    const eth = 'https://bsc-testnet.publicnode.com/';
    const bnb = 'https://bsc-testnet.publicnode.com/';

    const web3Mainnet = new Web3(new Web3.providers.HttpProvider(infuraUrl));
    const web3BSC = new Web3(new Web3.providers.HttpProvider(bscUrl));

    const addressesToCheck = [
      account,
      // Add more addresses as needed
    ];

  }


