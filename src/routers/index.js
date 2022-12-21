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
import CreateVoter from '~/pages/company/CreateVoter';
import DashboardLayout from '~/layout/DashboardLayout';
import config from '~/config';

//Public Routes
export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.voterLogin, component: VoterLogin, layout: null },
    { path: config.routes.companyLogin, component: CompanyLogin, layout: null },
    { path: config.routes.companyRegister, component: CompanyRegister, layout: null },
];

//Private Routes

export const voterPrivateRoutes = [{ path: config.routes.voterDashboard, component: VoterDashBoard, layout: null }];

// Admin Routes
export const companyPrivateRoutes = [
    { path: config.routes.companyDashboard, component: CompanyDashBoard, layout: DashboardLayout },
    { path: config.routes.companyCandidateList, component: CompanyCandidateList, layout: DashboardLayout },
    { path: config.routes.companyPositionList, component: CompanyPositionList, layout: DashboardLayout },
    { path: config.routes.createCandidate, component: CreateCandidate, layout: DashboardLayout },
    { path: config.routes.createElection, component: CreateElection, layout: null },
    { path: config.routes.companyVoterList, component: CompanyVoterList, layout: DashboardLayout },
    { path: config.routes.createVoter, component: CreateVoter, layout: DashboardLayout },
];
