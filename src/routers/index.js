import Home from '~/pages/Home';
import VoterLogin from '~/pages/voter/Login';
import VoterRegister from '~/pages/voter/Register';
import VoterDashBoard from '~/pages/voter/DashBoard';
import VoterElectionList from '~/pages/voter/ElectionList';
import Voted from '~/pages/voter/Voted';

import CompanyLogin from '~/pages/company/Login';
import CompanyRegister from '~/pages/company/Register';
import CreateElection from '~/pages/company/CreateElection';
import CompanyDashBoard from '~/pages/company/DashBoard';
import CompanyPositionList from '~/pages/company/PositionList';
import CompanyCandidateList from '~/pages/company/CandidateList';
import CreateCandidate from '~/pages/company/CreateCandidate';
import CompanyVoterList from '~/pages/company/VoterList';
import TrashVoters from '~/pages/company/TrashVoters';
import AddVoters from '~/pages/company/AddVoters';
import CompanyAccountSetting from '~/pages/company/AccountSetting';
import VoteList from '~/pages/company/VoteList';

import CompanyDashboardLayout from '~/layout/CompanyDashboardLayout';
import VoterDashboardLayout from '~/layout/VoterDashboardLayout';
import CompanyOnlyHeaderLayout from '~/layout/CompanyOnlyHeaderLayout';
import OnlyHeaderLayout from '~/layout/OnlyHeaderLayout';
import VoterCandidateList from '~/pages/voter/CandidateList';
import VoterElectionListLayout from '~/layout/ElectionListLayout';

import config from '~/config';

//Public Routes
export const publicRoutes = [
    { path: config.routes.home, component: Home, layout: null},  
    { path: config.routes.voterLogin, component: VoterLogin, layout: OnlyHeaderLayout },  
    { path: config.routes.voterRegister, component: VoterRegister, layout: OnlyHeaderLayout },  
    { path: config.routes.companyLogin, component: CompanyLogin, layout: OnlyHeaderLayout },
    { path: config.routes.companyRegister, component: CompanyRegister, layout: OnlyHeaderLayout },
];



// Private Routes for Voter
export const voterPrivateRoutes = [
    { path: config.routes.voterDashboard, component: VoterDashBoard, layout: VoterDashboardLayout },
    { path: config.routes.voterCandidateList, component: VoterCandidateList, layout: VoterDashboardLayout },
    { path: config.routes.voted, component: Voted, layout: VoterDashboardLayout },
    { path: config.routes.voterElectionList, component: VoterElectionList, layout: VoterElectionListLayout },
];


// Private Routes for Admin
export const companyPrivateRoutes = [
    { path: config.routes.companyDashboard, component: CompanyDashBoard, layout: CompanyDashboardLayout },
    { path: config.routes.companyCandidateList, component: CompanyCandidateList, layout: CompanyDashboardLayout },
    { path: config.routes.companyPositionList, component: CompanyPositionList, layout: CompanyDashboardLayout },
    { path: config.routes.createCandidate, component: CreateCandidate, layout: CompanyDashboardLayout },
    { path: config.routes.createElection, component: CreateElection, layout: CompanyOnlyHeaderLayout },
    { path: config.routes.companyVoterList, component: CompanyVoterList, layout: CompanyDashboardLayout },
    { path: config.routes.trashVoters, component: TrashVoters, layout: CompanyDashboardLayout },
    { path: config.routes.addVoters, component: AddVoters, layout: CompanyDashboardLayout },
    { path: config.routes.companyAccountSetting, component: CompanyAccountSetting, layout: CompanyDashboardLayout },
    { path: config.routes.voteList, component: VoteList, layout: CompanyDashboardLayout },
];
