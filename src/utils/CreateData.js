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

export function createVoterData(id, email, password, name) {
    return {
        id,
        email,
        password,
        name,
    };
}