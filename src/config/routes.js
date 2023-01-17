const routes = {
    home: '/',
    voterLogin: '/voter_login',
    voterRegister: '/voter_register',
    voterDashboard: '/election/voter/dashboard',
    voterCandidateList: '/election/voter/candidate_list',
    voted: '/election/voter/voted',
    voterElectionList: '/election_list/voter',

    companyLogin: '/company_login',
    companyRegister: '/company_register',
    companyDashboard: '/election/company/dashboard',
    companyAccountSetting: '/election/company/account_setting',
    companyCandidateList: '/election/company/candidate_list',
    companyVoterList: '/election/company/voter_list',
    companyPositionList: '/election/company/position_list',
    createElection: '/election/create_election',
    createCandidate: '/election/company/create_candidate',
    trashVoters: '/election/company/trash_voters',
    addVoters: '/election/company/add_voters',
    voteList: '/election/company/vote_list',
};

export default routes;
