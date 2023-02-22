import Cookies from 'js-cookie';
import { getMethod, patchMethod, postMethod } from './httpRequest';

export const createElection = async () => {
    try {
        const response = await postMethod(
            '/election/create',
            {
                companyId: Cookies.get('companyId'),
                electionAddress: Cookies.get('companyElectionAddress'),
            },
            Cookies.get('companyToken'),
        );
        return response;
    } catch (err) {
        return err.response.data;
    }
};

export const searchByVoterId = async ({ voterId, token }) => {
    try {
        const response = await getMethod('/election/' + voterId + '/searchByVoterId', {}, token);
        return response;
    } catch (err) {
        return err.response.data;
    }
};

export const searchElection = async ({ companyId, token }) => {
    try {
        const response = await getMethod('/election/' + companyId + '/searchElection', {}, token);
        return response;
    } catch (err) {
        return err.response.data;
    }
};

export const searchByElectionAddress = async ({ electionAddress, token }) => {
    try {
        const response = await getMethod('/election/' + electionAddress + '/searchByElectionAddress', {}, token);
        return response;
    } catch (err) {
        return err.response.data;
    }
};

export const getVoterList = async ({ companyId, token }) => {
    try {
        const response = await getMethod('/election/' + companyId + '/voterList', {}, token);
        return response;
    } catch (err) {
        return err.response.data;
    }
};

export const saveChange = async ({ voters }) => {
    try {
        const response = await patchMethod(
            '/election/' + Cookies.get('companyId') + '/voters',
            {
                voters,
            },
            Cookies.get('companyToken'),
        );
        return response;
    } catch (err) {
        return err.response.data;
    }
};

export const updateTimeStart = async ({ timeOut }) => {
    try {
        const response = await patchMethod(
            '/election/' + Cookies.get('companyId') + '/updateTimeStart',
            { timeOut },
            Cookies.get('companyToken'),
        );
        return response;
    } catch (err) {
        return err.response.data;
    }
};
