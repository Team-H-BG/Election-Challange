const hre = require("hardhat");
const { ethers } = hre;
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

// Wait so the reporter has time to fetch and return prices from APIs.
// https://github.com/cgewecke/eth-gas-reporter/issues/254
// describe("eth-gas-reporter workaround", () => {
//     it("should kill time", (done) => {
//       setTimeout(done, 2000);
//     });
//   });


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

        it("Should be able to add teachers", async function () {
            const addressList = [teacher.address];
            contractFunction = await votingContract.connect(admin).addTeachers(addressList);
            // Expect the function to go through
            const txResult = await contractFunction.wait();
            expect(txResult.status).to.equal(1);
        });

        it("should be able to add students", async function () {
            const addressList = [student.address];
            contractFunction = await votingContract.connect(admin).addStudents(addressList);
            // Expect the function to go through
            const txResult = await contractFunction.wait();
            expect(txResult.status).to.equal(1);
        });

    })

    describe("Chairman", function () {
        beforeEach(async function () {
            // create the smart contract object to test from
            votingChairman = await votingContract.connect(admin).setChairman(chairman.address);
        });

        it("Should set voting status", async function () {
            

            votingStatus = await votingContract.connect(chairman).setVotingStatus(true);
            // Expect the function to go through
            const txResult = await votingStatus.wait();
            expect(txResult.status).to.equal(1);
        });

        it("voting status should change", async function () {
            votingStatus = await votingContract.connect(chairman).setVotingStatus(true);
            // Expect the function to go through
            const status = await votingContract.connect(chairman).getVotingStatus();
            expect(status).to.equal(true);
        });

    })
    
    

});