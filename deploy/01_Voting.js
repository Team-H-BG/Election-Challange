// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    //   const chainId = await getChainId();

    await deploy("Voting", {
        // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
        from: deployer,
        // args: [ "Hello", ethers.utils.parseEther("1.5") ],
        log: true,
    });

};

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

module.exports.tags = ["Voting"];
