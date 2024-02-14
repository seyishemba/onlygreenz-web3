function getUser(){
  return 'wallet, chain, native'
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

async function getAllNativeBalances() {
    try {
      // Fetch balances on Ethereum mainnet
      console.log('Balances on Ethereum Mainnet:');
      await getBalancesForChain(web3Mainnet, addressesToCheck);

      // // Fetch balances on Binance Smart Chain
      // console.log('\nBalances on Binance Smart Chain:');
      // await getBalancesForChain(web3BSC, addressesToCheck);
    } catch (error) {
      console.error('Error:', error);
    }
}
  
getAllNativeBalances();


async function getAllTokenBalances() {
  try {
    // Fetch balances on Ethereum mainnet
    console.log('Balances on Ethereum Mainnet:');
    await getBalancesForChain(web3Mainnet, addressesToCheck);

    // // Fetch balances on Binance Smart Chain
    // console.log('\nBalances on Binance Smart Chain:');
    // await getBalancesForChain(web3BSC, addressesToCheck);
  } catch (error) {
    console.error('Error:', error);
  }
}

getAllTokenBalances();
