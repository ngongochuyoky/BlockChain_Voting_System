export function createCandidateData(candidateID, positionID, name, dateOfBirth, description, imgHash, voteCount, email) {
    return {
        candidateID,
        name,
        dateOfBirth,
        description,
        imgHash,
        voteCount,
        positionID,
        email,
    };
}

export function createPositionData(positionID, positionName) {
    return {
        positionID,
        positionName,
    };
}

export function createVoterData(id, name, email, dateCreateAccount) {
    return {
        id,
        email,
        name,
        dateCreateAccount
    };
}

export function createVoterDataExtend(id, email, password, name) {
    return {
        id,
        email,
        password,
        name,
        selected: false
    };
}

export function createVoteData(id, email, name, voteTime, isCheck){
    return {
        id,
        email,
        name,
        voteTime,
        isCheck,
    };
}

export function createElectionData(electionAddress, companyName, name, description, numVoters, status) {
    return {
        electionAddress,
        companyName,
        name,
        description, 
        numVoters,
        status
    }
}