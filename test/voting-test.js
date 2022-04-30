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

        it("should be able to create ballot", async function () {

            votingStatus = await votingContract.connect(chairman).createBallot("President", ["Buhari", "Osinbanjo"]);
            // Expect the function to go through
            const txResult = await votingStatus.wait();
            expect(txResult.status).to.equal(1);
        });

        it("should be able to get ballot", async function () {
            // create ballot
            await votingContract.connect(chairman).createBallot("President", ["Buhari", "Osinbanjo"]);
            
            
            // Expect the function to go through
            votingStatus = await votingContract.connect(chairman).getBallot(0);
            expect(votingStatus.id).to.equal(0);
        });

        it("should not be able to voting if voting status is false", async function () {
            // create ballot
            await votingContract.connect(chairman).createBallot("President", ["Buhari", "Osinbanjo"]);
            
            // should vote
            await expect(votingContract.connect(chairman).vote(0, 0)).to.be.reverted;
        });

        it("should be able to vote", async function () {
            // create ballot
            await votingContract.connect(chairman).createBallot("President", ["Buhari", "Osinbanjo"]);
            votingStatus = await votingContract.connect(chairman).setVotingStatus(true);
            
            // Expect the function to go through
            votingStatus = await votingContract.connect(chairman).vote(0, 0);
            const txResult = await votingStatus.wait();
            expect(txResult.status).to.equal(1);
        });

        it("should be able to set voting result", async function () {
            // create ballot
            await votingContract.connect(chairman).createBallot("President", ["Buhari", "Osinbanjo"]);
            votingStatus = await votingContract.connect(chairman).setVotingStatus(true);
            
            // should vote
            votingStatus = await votingContract.connect(chairman).vote(0, 0);
            
            // set voting result
            votingStatus = await votingContract.connect(chairman).setVotingResultStatus(true);
            const txResult = await votingStatus.wait();
            expect(txResult.status).to.equal(1);
        });

        it("should revert if voting result status is not true", async function () {
            // create ballot
            await votingContract.connect(chairman).createBallot("President", ["Buhari", "Osinbanjo"]);
            await votingContract.connect(chairman).setVotingStatus(true);
            
            // should vote
            await votingContract.connect(chairman).vote(0, 0);
            
            // get voting result
            await expect(votingContract.connect(chairman).results(0)).to.be.reverted;
        });

        it("should be able to get voting result", async function () {
            // create ballot
            await votingContract.connect(chairman).createBallot("President", ["Buhari", "Osinbanjo"]);
            await votingContract.connect(chairman).setVotingStatus(true);
            
            // should vote
            await votingContract.connect(chairman).vote(0, 0);
            
            // set voting result
            await votingContract.connect(chairman).setVotingResultStatus(true);
            
            // get voting result
            votingStatus = await votingContract.connect(chairman).results(0);

            expect(votingStatus[0].votes).to.equal(1);
        });


    })

    describe("Voting", function () {
        beforeEach(async function () {
            // create the smart contract object to test from
            votingChairman = await votingContract.connect(admin).setChairman(chairman.address);
            // create ballot
            voting = await votingContract.connect(chairman).createBallot("President", ["Buhari", "Osinbanjo"]);
            // set voting status
            votingStatus = await votingContract.connect(chairman).setVotingStatus(true);
        });

        it("teacher should be able to vote", async function () {
            const addressList = [teacher.address];
            contractFunction = await votingContract.connect(admin).addTeachers(addressList);
            // Expect the function to go through
            votingStatus = await votingContract.connect(teacher).vote(0, 0);
            const txResult = await votingStatus.wait();
            expect(txResult.status).to.equal(1);
        });

        it("should be able to add students", async function () {
            const addressList = [student.address];
            contractFunction = await votingContract.connect(admin).addStudents(addressList);
            // Expect the function to go through
            votingStatus = await votingContract.connect(student).vote(0, 0);
            const txResult = await votingStatus.wait();
            expect(txResult.status).to.equal(1);
        });

        it("teacher should not be able to vote twice", async function () {
            const addressList = [teacher.address];
            contractFunction = await votingContract.connect(admin).addTeachers(addressList);
            // Expect the function to go through
            votingStatus = await votingContract.connect(teacher).vote(0, 0);
            
            await expect(votingContract.connect(teacher).vote(0, 1)).to.be.reverted;
            
        });


    });


    
    
    

});