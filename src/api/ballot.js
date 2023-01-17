import Cookies from 'js-cookie';
import { getMethod, patchMethod, postMethod } from './httpRequest';

export const vote = async ({ candidateIdList, companyId }) => {
    try {
        const response = await postMethod(
            '/ballot/' + Cookies.get('voterId') + '/vote',
            {
                companyId,
                candidateIdList,
            },
            Cookies.get('voterToken'),
        );
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const getVote = async ({ voterId, companyId, token }) => {
    try {
        const response = await getMethod('/ballot/' + companyId + '/' + voterId + '/searchVote', {}, token);
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const getVotersVoted = async ({ companyId, token }) => {
    try {
        const response = await getMethod('/ballot/' + companyId + '/numVoted', {}, token);
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const getVotes = async ({ companyId, token }) => {
    try {
        const response = await getMethod('/ballot/' + companyId + '/votes', {}, token);
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const decryptContent = async ({ privateKey, id }) => {
    try {
        const response = await postMethod(
            '/ballot/' + id + '/decryptContent',
            {
                privateKey,
            },
            Cookies.get('companyToken'),
        );
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const updateIsCheck = async ({ id }) => {
    try {
        const response = await patchMethod('/ballot/' + id + '/updateIsCheck', {}, Cookies.get('companyToken'));
        return response;
    } catch (err) {
        console.log(err);
    }
};
