const alchemyApiKey = 'WVo6tTsuDnyNq12Y9dDTdUMkX9tkiF8c';
// https://eth-sepolia.g.alchemy.com/v2/WVo6tTsuDnyNq12Y9dDTdUMkX9tkiF8c
// wss://eth-sepolia.g.alchemy.com/v2/WVo6tTsuDnyNq12Y9dDTdUMkX9tkiF8c
const addressToCheck = '0x097bb4ecec0ed01b5bc63e6d5cee70cb44f7f764'; // Replace with the Ethereum address you want to check

const alchemyEndpoint = `https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`;

// Function to get native balance using Alchemy API
async function getNativeBalance() {
  try {
    const response = await fetch(`${alchemyEndpoint}/${addressToCheck}`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const balanceInEther = data.data.balance / 1e18;
    console.log(`Native Balance of ${addressToCheck}: ${balanceInEther} ETH`);
  } catch (error) {
    console.error('Error:', error.message || error);
  }
}

// Call the function
getNativeBalance();
