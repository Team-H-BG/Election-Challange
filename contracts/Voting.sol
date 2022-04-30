// SPDX-License-Identifier: MIT

pragma solidity ^0.8.5;

contract Voting {

  struct Voter {
    uint vote;
    bool voted;
    uint weight;
    string voterType;
  }

  /*
    * get voting status
  */
  bool votingEnabled;

  /*
    * get voting result
  */
  bool votingResult;


  // Proposal
  struct Proposal {
    string name;
    uint voteCount;
  }

  Proposal[] public proposals;

  mapping(address => Voter) public voters; // voters get address as key and Voter for value

  address public chairman;

  event Vote(address voter);
  event VoterAdded(address voter, string voterType);
  event VotingStatus(bool votingStatus);
  event VotingResult(bool votingStatus);
  event ChairmanChange(address chairman, address newChairman);

  constructor(string[] memory proposalNames) {

    chairman = msg.sender;

    voters[chairman].weight = 8;

    for (uint i = 0; i < proposalNames.length; i++) {
      proposals.push(Proposal({
        name: proposalNames[i],
        voteCount: 0
      }));
    }
    chairman = msg.sender;
  }

  /*
    * set chairman
  */
  function changeChairman(address _chairman) external onlyChairman() {
    chairman = _chairman;
    emit ChairmanChange(msg.sender, _chairman);
  }

  /*
    * set voting status
  */
  function setVotingStatus(bool _votingStatus) external {
    require(msg.sender == chairman);
    votingEnabled = _votingStatus;
    emit VotingStatus(_votingStatus);
  }

  /*
    * view voting status
  */
  function getVotingStatus() external view returns (bool) {
    return votingEnabled;
  }

  /*
    * set voting result
  */
  function setVotingResultStatus(bool _votingResult) external onlyChairman() {
    votingResult = _votingResult;
    emit VotingResult(_votingResult);
  }

    /*
    * view voting status
  */
  function getVotingResultStatus() external view returns (bool) {
    return votingResult;
  }


  // autheticate voters
  function addStudent(address _voter) external onlyChairman {
    require(msg.sender == chairman, 'Only chairman can give right to vote');
    require(!voters[_voter].voted, 'Voter already voted');
    require(voters[_voter].weight == 0);
    voters[_voter].voterType = "student";
    voters[_voter].weight = 2;
    emit VoterAdded(_voter, "student");
  }

    // autheticate voters
  function addTeacher(address _voter) external onlyChairman {
    require(msg.sender == chairman, 'Only chairman can give right to vote');
    require(!voters[_voter].voted, 'Voter already voted');
    require(voters[_voter].weight == 0);
    voters[_voter].voterType = "teacher";
    voters[_voter].weight = 4;
    emit VoterAdded(_voter, "teacher");
  }

  // Get Proposal
function getProposals()public view returns( Proposal  [] memory){
    return proposals;
}


  /*
    * vote
  */
  function vote(uint proposal) external {
    require(votingEnabled, "Voting is not enabled");
    Voter storage sender = voters[msg.sender];
    require(sender.weight !=0, 'Has no right to vote');
    require(!sender.voted, 'Voter already voted');
    sender.voted = true;
    sender.vote = proposal;

    proposals[proposal].voteCount =  proposals[proposal].voteCount + sender.weight;
    emit Vote(msg.sender);

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
    require(votingResult, "Voting Result is not open");
    winningProposalName_ = proposals[winningProposal()].name;

  }


  modifier onlyChairman() {
    require(msg.sender == chairman, 'only chairman can make this action');
    _;
  }

  

}