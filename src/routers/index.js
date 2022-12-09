import Home from '~/pages/Home';
import VoterLogin from '~/pages/voter/VoterLogin/';
import CompanyLogin from '~/pages/company/CompanyLogin';
import CompanyRegister from '~/pages/company/CompanyRegister';
import CreateElection from '~/pages/company/CreateElection';
import VoterDashBoard from '~/pages/voter/VoterDashBoard';
import CompanyDashBoard from '~/pages/company/CompanyDashBoard';
import CompanyPositionList from '~/pages/company/CompanyPositionList';
import CreatePosition from '~/pages/company/CreatePosition';
import CompanyCandidateList from '~/pages/company/CompanyCandidateList';
import CreateCandidate from '~/pages/company/CreateCandidate';
import CompanyVoterList from '~/pages/company/CompanyVoterList';
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
    { path: config.routes.createPosition, component: CreatePosition, layout: DashboardLayout },
    { path: config.routes.createCandidate, component: CreateCandidate, layout: DashboardLayout },
    { path: config.routes.companyVoterList, component: CompanyVoterList, layout: DashboardLayout },
    { path: config.routes.createElection, component: CreateElection, layout: null },
];
