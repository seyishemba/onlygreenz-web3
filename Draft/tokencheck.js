// Wallet address
const address = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'
// const address = '0x097bB4eCEc0ED01b5BC63E6d5CEE70cB44F7F764'
// Alchemy URL

const baseURL = `https://bsc-testnet.publicnode.com`;

const raw = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenBalances",
  "headers": {
    "Content-Type": "application/json"
  },
  "params": [
    `${address}`,
    "erc20",
  ],
  "id": 42
});

const requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

// Make the request and print the formatted response:
fetch(baseURL, requestOptions)
  .then(response => {
      console.log(response)
       // Get balances
       const balances = response['result']
        
       // Remove tokens with zero balance
       const nonZeroBalances = 
       balances['tokenBalances'].filter(token => {
          return token['tokenBalance'] !== '0'
       })

       console.log(`Token balances of ${address} \n`)
    
       // Counter for SNo of final output
       let i = 1
    
       // Loop through all tokens with non-zero balance
       for (token of nonZeroBalances) {
    
          // Get balance of token 
          let balance = token['tokenBalance']
          
          const metadataRaw = JSON.stringify({
              "jsonrpc": "2.0",
              "method": "alchemy_getTokenMetadata",
              "headers": {
               'Content-Type': 'application/json'
              },
              "params": [
                  `${token['contractAddress']}`
              ],
              "id": 42
          });
          
          const metadataOptions = {
             method: 'POST',
             body: metadataRaw,
             redirect: 'follow',
          };  
          
          // Get metadata of token
          fetch(baseUrl, metadataOptions)
             .then(metadata => {
                // Compute token balance in human-readable format
                balance = balance/Math.pow(10, metadata['decimals']);
                balance = balance.toFixed(2);
                
                // Print name, balance, and symbol of token
                console.log(`${i++}. ${metadata['name']}: ${balance} 
                ${metadata['symbol']}`)
             })
             .catch(error => console.log('error', error))
          }
  })
  .catch(error => console.log('error', error));