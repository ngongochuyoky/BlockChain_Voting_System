import Home from '~/pages/Home';
import VoterLogin from '~/pages/voter/Login/';
import VoterDashBoard from '~/pages/voter/DashBoard';
import CompanyLogin from '~/pages/company/Login';
import CompanyRegister from '~/pages/company/Register';
import CreateElection from '~/pages/company/CreateElection';
import CompanyDashBoard from '~/pages/company/DashBoard';
import CompanyPositionList from '~/pages/company/PositionList';
import CompanyCandidateList from '~/pages/company/CandidateList';
import CreateCandidate from '~/pages/company/CreateCandidate';
import CompanyVoterList from '~/pages/company/VoterList';
import TrashVoters from '~/pages/company/TrashVoters';
import CompanyDashboardLayout from '~/layout/CompanyDashboardLayout';

import VoterDashboardLayout from '~/layout/VoterDashboardLayout';
import VoterCandidateList from '~/pages/voter/CandidateList';
import Voted from '~/pages/voter/Voted';
import config from '~/config';

//Public Routes
export const publicRoutes = [
    { path: config.routes.home, component: Home, layout: null},  
    { path: config.routes.voterLogin, component: VoterLogin, layout: null },  
    { path: config.routes.companyLogin, component: CompanyLogin, layout: null },
    { path: config.routes.companyRegister, component: CompanyRegister, layout: null },
];



// Private Routes for Voter
export const voterPrivateRoutes = [
    { path: config.routes.voterDashboard, component: VoterDashBoard, layout: VoterDashboardLayout },
    { path: config.routes.voterCandidateList, component: VoterCandidateList, layout: VoterDashboardLayout },
    { path: config.routes.voted, component: Voted, layout: VoterDashboardLayout },
];


// Private Routes for Admin
export const companyPrivateRoutes = [
    { path: config.routes.companyDashboard, component: CompanyDashBoard, layout: CompanyDashboardLayout },
    { path: config.routes.companyCandidateList, component: CompanyCandidateList, layout: CompanyDashboardLayout },
    { path: config.routes.companyPositionList, component: CompanyPositionList, layout: CompanyDashboardLayout },
    { path: config.routes.createCandidate, component: CreateCandidate, layout: CompanyDashboardLayout },
    { path: config.routes.createElection, component: CreateElection, layout: null },
    { path: config.routes.companyVoterList, component: CompanyVoterList, layout: CompanyDashboardLayout },
    { path: config.routes.trashVoters, component: TrashVoters, layout: CompanyDashboardLayout },
];








// //Public Routes
// export const publicRoutes = [
//     { path: config.routes.home, component: Home, layout: null},
//     { path: config.routes.voterLogin, component: VoterLogin, layout: null },
//     { path: config.routes.companyLogin, component: CompanyLogin, layout: null },
//     { path: config.routes.companyRegister, component: CompanyRegister, layout: null },
// ];

// //Private Routes

// export const voterPrivateRoutes = [
//     { path: config.routes.voterDashboard, component: VoterDashBoard, layout: VoterDashboardLayout },
//     { path: config.routes.voterCandidateList, component: VoterCandidateList, layout: VoterDashboardLayout },
//     { path: config.routes.voted, component: Voted, layout: VoterDashboardLayout },
// ];

// // Admin Routes
// export const companyPrivateRoutes = [
//     { path: config.routes.companyDashboard, component: CompanyDashBoard, layout: CompanyDashboardLayout },
//     { path: config.routes.companyCandidateList, component: CompanyCandidateList, layout: CompanyDashboardLayout },
//     { path: config.routes.companyPositionList, component: CompanyPositionList, layout: CompanyDashboardLayout },
//     { path: config.routes.createCandidate, component: CreateCandidate, layout: CompanyDashboardLayout },
//     { path: config.routes.createElection, component: CreateElection, layout: null },
//     { path: config.routes.companyVoterList, component: CompanyVoterList, layout: CompanyDashboardLayout },
// ];
