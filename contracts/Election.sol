// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <=0.9.0;

contract ElectionFact {
    struct ElectionDet {
        address deployedAddress;
        string electionName;
        string electionDescription;
    }

    //Event
    event CreateElection(address deployedAddress);

    mapping (string => ElectionDet) company;

    function createElection(string memory companyId, string memory electionName, string memory electionDescription) public {
        Election newelection = new Election(msg.sender, electionName, electionDescription);
        company[companyId].deployedAddress = address(newelection);
        company[companyId].electionName = electionName;
        company[companyId].electionDescription = electionDescription;
        emit CreateElection(address(newelection));
    }

    function getDeployedElection(string memory companyId) public view returns (address, string memory, string memory) {
        address val = company[companyId].deployedAddress;
        if(val == address(0)){
            return (address(0), "", "Create an election");
        }else {
            return (company[companyId].deployedAddress, company[companyId].electionName, company[companyId].electionDescription);
        }
    }
}

contract Election {
    //Election authority's address
    address electionAuthority;
    string electionName;
    string electionDescription;
    bool end;

    //electionAuthority's address taken when it deploys the contract
    constructor(address authority, string memory name, string memory description) {
        electionAuthority = authority;
        electionName = name;
        electionDescription = description;
        end = false;
    }

    //Only electionAuthority can call this function
    modifier owner() {
        require(msg.sender == electionAuthority, "Error: Access Denied");
        _;
    }

     //Count the number of position
    uint8 numPosition;

    mapping (uint8 => string) positions;

    //Candidate
    struct Candidate {
        uint8 positionId;
        string name;
        string dateOfBirth;
        string description;
        string imgHash;
        uint8 voteCount;
        string email;
    }

    //Candidate mapping
    mapping (uint8 => Candidate) public candidates;

    //Voter
    struct Voter {
        bool voted;
        uint8[] candidateIdList;
    }

    //Voter mapping
    mapping (string => Voter) voters;

    //Count the number of candidates
    uint8 numCandidates;

    //Count the number of voter
    uint8 numVoters;

    //Events
    event AddPosition(uint8 positionId, string positionName);
    event AddCandidate( uint8 positionId, uint8 candidateId, string name, string dateOfBirth, string description, string imgHash, uint8 voteCount, string email);
    event Vote(string email);

    //Add Candidate
    function addCandidate(uint8 positionId, string memory name,string memory dateOfBirth ,
            string memory description, string memory imgHash, string memory email) public owner{
        require(!end, "Error: The election is over ");
        uint8 _candidateId = numCandidates++; // assign id of the candidate
        // add candidate to mapping
        candidates[_candidateId] = Candidate(positionId, name, dateOfBirth, description, imgHash, 0,  email);
        emit AddCandidate(positionId, _candidateId, name, dateOfBirth, description, imgHash, 0, email);
    }

    //Function add Position
    function addPosition(string memory _positionName) public {
        require(!end, "Error: The election is over ");
        uint8 _positionId = numPosition++;
        positions[_positionId] = _positionName;
        emit AddPosition(_positionId, _positionName);
    }

    //function to vote and check for double voting
    function vote(uint8[] memory _candidateIdList,string memory voterId) public {
        require(!end, "Error: The election is over ");
        // if false the vote will be registered
        require(!voters[voterId].voted, "Error:You cannot double vote"); 
        voters[voterId] = Voter(true, _candidateIdList);
        for(uint8 i = 0; i < _candidateIdList.length; i++){
            numVoters++;
            candidates[_candidateIdList[i]].voteCount++;//increment vote counter of candidate
        } //add the values to the mapping
        emit Vote(voterId);
    }

    function setEnd() public owner {
        end = true;
    }

    function getPositions() public view returns (string[] memory){
        string[] memory _positions = new string[](numPosition);
        for(uint8 i = 0; i < numPosition; i++) {
            _positions[i] = positions[i];
        }
        return _positions;

    }

    function getVoter(string memory voterId) public view returns (Voter memory){
        return voters[voterId];
    }

    //function to get candidate information
    function getCandidate(uint8 _candidateId) public view returns (uint8, string memory, string memory, string memory, string memory, uint8, string memory) {
        return (candidates[_candidateId].positionId, candidates[_candidateId].name,candidates[_candidateId].dateOfBirth , candidates[_candidateId].description, candidates[_candidateId].imgHash, candidates[_candidateId].voteCount, candidates[_candidateId].email);
    } 

   //function to return winner candidate information
    function winner() public view returns (int8[] memory) {
        require(end, "Error: The election is not over yet ");
        int8[] memory winnerIDList = new int8[](numPosition);
        for(uint8 i = 0; i < numPosition; i++) {
            int8 winnerID = -1;
            uint8 largestVotes = 0;
            for(uint8 j = 0; j < numCandidates; j++){
                if(largestVotes < candidates[j].voteCount && candidates[j].positionId == i){
                    largestVotes = candidates[j].voteCount;
                    winnerID = int8(j);
                }
            }
            winnerIDList[i] = winnerID;
        }
        return winnerIDList;
    } 

    //function to get count of candidates
    function getNumOfCandidates() public view returns(uint8) {
        return numCandidates;
    }

    //function to get count of voters
    function getNumOfVoters() public view returns(uint8) {
        return numVoters;
    }

    function getNumOfPosition() public view returns(uint8) {
        return numPosition;
    }

    function getElectionDetails() public view returns(string memory, string memory) {
        return (electionName,electionDescription);    
    }
    
    function getStatus() public view returns(bool) {
        return end;
    }
}