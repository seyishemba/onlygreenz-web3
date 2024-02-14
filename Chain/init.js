$(document).ready(function() {

  console.log(window.ethereum)
  let account; 
    if (typeof window.ethereum !== 'undefined') {
      // ethereum.request({ method: 'eth_requestAccounts' });
      window.ethereum.request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        account = accounts[0];
        console.log('Connected to MetaMask:', account);
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
    const maticUrl = 'https://endpoints.omniatech.io/v1/matic/mumbai/public';

    const eth = 'https://bsc-testnet.publicnode.com/';
    const bnb = 'https://bsc-testnet.publicnode.com/';

    const web3Mainnet = new Web3(new Web3.providers.HttpProvider(infuraUrl));
    const web3BSC = new Web3(new Web3.providers.HttpProvider(bscUrl));
    const web3Matic = new Web3(new Web3.providers.HttpProvider(maticUrl));
    let web3 = web3Matic
    const contractAddress = '0x09170c0919447736b14da0a3c3B3D2Fa9881E4c0';
const contractABI = [
    {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"BuyTickets","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"CurrentWinningReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DrawWinnerTicket","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"IsWinner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RefundAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"RemainingTickets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WithdrawCommission","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"WithdrawWinnings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"checkWinningsAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"duration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"expiration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTickets","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getWinningsForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastWinner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastWinnerAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lotteryOperator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTickets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operatorTotalCommission","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"restartDraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ticketCommission","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ticketPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tickets","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"winnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
];
const contract = new web3.eth.Contract(contractABI, contractAddress);



async function updateLotteryInfo() {
    try {
        const expiration = await contract.methods.expiration().call();
        document.getElementById('expiration').innerText = new Date(expiration * 1000).toLocaleString();

        const lastWinner = await contract.methods.lastWinner().call();
        document.getElementById('lastWinner').innerText = lastWinner;

        const lastWinnerAmount = await contract.methods.lastWinnerAmount().call();
        document.getElementById('lastWinnerAmount').innerText = web3.utils.fromWei(lastWinnerAmount) + " ETH";

        const operatorTotalCommission = await contract.methods.operatorTotalCommission().call();
        document.getElementById('operatorTotalCommission').innerText = web3.utils.fromWei(operatorTotalCommission) + " ETH";

        const currentWinningReward = await contract.methods.CurrentWinningReward().call();
        document.getElementById('currentWinningReward').innerText = web3.utils.fromWei(currentWinningReward) + " ETH";

        const remainingTickets = await contract.methods.RemainingTickets().call();
        document.getElementById('remainingTickets').innerText = remainingTickets;
    } catch (error) {
        console.error(error);
        alert('Failed to fetch lottery information.');
    }
}

    updateLotteryInfo();

      // web3Matic.eth.requestAccounts().then(function(accounts) {
      //       console.log(accounts)
      //       if (accounts.length > 0) {
      //           $('#accountAddress').text(accounts[0]);
      //       } else {
      //           $('#accountAddress').text('No accounts found');
      //       }
      //   });

      web3Matic.eth.net.getId().then(function(networkId) {
        alert(networkId)
          $('#networkId').text(networkId);
      });

  }
})

async function buyTickets() {
  const numTickets = document.getElementById('num_tickets').value;
  const accounts = await web3.eth.requestAccounts();
  const sender = accounts[0];

  try {
      const result = await contract.methods.BuyTickets().send({
          from: sender,
          value: numTickets * 0.01 * 10**18, // Convert ETH to Wei
      });
      console.log(result);
      alert('Tickets bought successfully!');
  } catch (error) {
      console.error(error);
      alert('Failed to buy tickets.');
  }
}

async function checkWinnings() {
  const accounts = await web3.eth.requestAccounts();
  const sender = accounts[0];

  try {
      const winnings = await contract.methods.getWinningsForAddress(sender).call();
      document.getElementById('winnings').innerText = `Your Winnings: ${web3.utils.fromWei(winnings)} ETH`;
  } catch (error) {
      console.error(error);
      alert('Failed to check winnings.');
  }
}

async function withdrawWinnings() {
  const accounts = await web3.eth.requestAccounts();
  const sender = accounts[0];

  try {
      const result = await contract.methods.WithdrawWinnings().send({ from: sender });
      console.log(result);
      alert('Winnings withdrawn successfully!');
  } catch (error) {
      console.error(error);
      alert('Failed to withdraw winnings.');
  }
}

async function drawWinner() {
  const accounts = await web3.eth.requestAccounts();
  const sender = accounts[0];

  try {
      const result = await contract.methods.DrawWinnerTicket().send({ from: sender });
      console.log(result);
      alert('Winner drawn successfully!');
  } catch (error) {
      console.error(error);
      alert('Failed to draw winner.');
  }
}

async function restartDraw() {
  const accounts = await web3.eth.requestAccounts();
  const sender = accounts[0];

  try {
      const result = await contract.methods.restartDraw().send({ from: sender });
      console.log(result);
      alert('Draw restarted successfully!');
  } catch (error) {
      console.error(error);
      alert('Failed to restart draw.');
  }
}

async function withdrawCommission() {
  const accounts = await web3.eth.requestAccounts();
  const sender = accounts[0];

  try {
      const result = await contract.methods.WithdrawCommission().send({ from: sender });
      console.log(result);
      alert('Commission withdrawn successfully!');
  } catch (error) {
      console.error(error);
      alert('Failed to withdraw commission.');
  }
}


