import Cookies from 'js-cookie';
import { getMethod, postMethod, putMethod, deleteMethod, patchMethod } from './httpRequest';

export const getAllVoter = async () => {
    try{
        const response = await getMethod('/voter/', {}, Cookies.get('companyToken'));
        return response;
    }catch(err) {
        console.log(err.message);
    }
}


export const getVoterById = async ({ id }) => {
    try {
        const response = await getMethod('/voter/' + id + '/show', {}, Cookies.get('voterToken'));
        return response;
    } catch (err) {
        console.log(err.message);
    }
};


export const createVoter = async ({ email, fullName, electionAddress, electionName }) => {
    try {
        const response = await postMethod(
            '/voter/create',
            {
                email,
                fullName,
                electionAddress,
                electionName,
            },
            Cookies.get('companyToken'),
        );
        return response;
    } catch (err) {
        console.log(err.message);
    }
};

export const updateVoter = async ({ id, password, fullName, electionName }) => {
    try {
        const response = await putMethod(
            '/voter/' + id,
            { password, fullName, electionName },
            Cookies.get('companyToken'),
        );

        return response;
    } catch (err) {
        console.log(err.message);
    }
};

export const deleteVoter = async ({ id }) => {
    try {
        const response = await deleteMethod('/voter/' + id, {}, Cookies.get('companyToken'));
        return response;
    } catch (err) {
        console.log(err.message);
    }
};

//sửa lại
export const findDeletedVoters = async () => {
    try {
        const response = await getMethod(
            '/voter/' + Cookies.get('electionAddress') + '/trash',
            {},
            Cookies.get('companyToken'),
        );
        return response;
    } catch (err) {
        console.log(err.message);
    }
};

export const restoreVoter = async ({ id }) => {
    try {
        const response = await patchMethod('/voter/' + id + '/restore', {}, Cookies.get('companyToken'));
        return response;
    } catch (err) {
        console.log(err.message);
    }
};
