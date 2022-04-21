require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
const fs = require("fs");
require("@nomiclabs/hardhat-ethers");
//require solidity-coverage
require('solidity-coverage');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const { API_URL, PRIVATE_KEY } = process.env;

function mnemonic() {
   try {
     return fs.readFileSync("./mnemonic.txt").toString().trim();
   } catch (e) {
     if (defaultNetwork !== "localhost") {
       console.log(
         "☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`."
       );
     }
   }
   return "";
 }

module.exports = {
   solidity: "0.8.5",
   defaultNetwork: "localhost",
   networks: {
      localhost: {
         url: "http://localhost:8545",
         // notice no mnemonic here? it will just use account 0 of the hardhat node to deploy
         // (you can put in a mnemonic here to set the deployer locally)
       },
      rinkeby: {
         url: "https://rinkeby.infura.io/v3/ec6a8acd1d354717acec099ad46a0bab", // <---- YOUR INFURA ID! (or it won't work)
         accounts: {
            mnemonic: mnemonic(),
         },
      }
   },
   etherscan: {
      // your api key here.
      apiKey: "PSW8C433Q667DVEX5BCRMGNAH9FSGFZ7Q8",
    },
}