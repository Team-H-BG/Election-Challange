// SPDX-License-Identifier: MIT

pragma solidity ^0.8.5;

contract Election {

  // voters: voted = bool, access to vote  = uint, vote index == unit

  struct Voter {
    uint vote;
    bool voted;
    uint weight;
    string voterType;
  }


  // Proposal
  struct Proposal {
    string name;
    uint voteCount;
  }

  Proposal[] public proposals;

  mapping(address => Voter) public voters; // voters get address as key and Voter for value

  address public chairman;

  constructor(string[] memory proposalNames) {

    chairman = msg.sender;

    voters[chairman].weight = 5;

    for (uint i = 0; i < proposalNames.length; i++) {
      proposals.push(Proposal({
        name: proposalNames[i],
        voteCount: 0
      }));
    }
    chairman = msg.sender;
  }

  // autheticate voters

  function giveRightToVote(address _voter) public {
    require(msg.sender == chairman, 'Only chairman can give right to vote');
    require(!voters[_voter].voted, 'Voter already voted');
    require(voters[_voter].weight == 0);
    voters[_voter].weight = 2;
  }

  // voting
  function vote(uint proposal) public {
    Voter storage sender = voters[msg.sender];
    require(sender.weight !=0, 'Has no right to vote');
    require(!sender.voted, 'Voter already voted');
    sender.voted = true;
    sender.vote = proposal;

    proposals[proposal].voteCount =  proposals[proposal].voteCount + sender.weight;
  }

  // show results

  function winningProposal() public view returns (uint winningProposal_) {
    uint winningVoteCount = 0;

    for (uint i = 0; i < proposals.length; i++) {
      if (proposals[i].voteCount > winningVoteCount) {
        winningVoteCount = proposals[i].voteCount;
        winningProposal_ = i;
      }
    }
  }

  function winningProposalName() public view returns (string memory winningProposalName_) {

    winningProposalName_ = proposals[winningProposal()].name;

  }
}