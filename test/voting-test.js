const hre = require("hardhat");
const { ethers } = hre;
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

// Wait so the reporter has time to fetch and return prices from APIs.
// https://github.com/cgewecke/eth-gas-reporter/issues/254
describe("eth-gas-reporter workaround", () => {
    it("should kill time", (done) => {
      setTimeout(done, 2000);
    });
  });


describe("Voting 🤖", function () {
    let votingContract;
    let admin, chairman, teacher, student, addrs;

    beforeEach(async function () {
        // create the smart contract object to test from
        [admin, chairman, teacher, student, ...addrs] = await ethers.getSigners();
        const VotingContract = await ethers.getContractFactory("Voting");
        votingContract = await VotingContract.deploy();
    });

    describe("Admin", function () {
        it("Should set chairman", async function () {
            votingChairman = await votingContract.connect(admin).setChairman(chairman.address);
            // Expect the function to go through
            const txResult = await votingChairman.wait();
            expect(txResult.status).to.equal(1);
        });

    })
    
    

});