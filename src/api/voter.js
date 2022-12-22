import Cookies from 'js-cookie';
import { get, post } from './httpRequest';

export const allVoter = async () => {
    try {
        const response = await get('/voter', {}, Cookies.get('companyToken'));
        return response;
    } catch (err) {
        console.log(err.message);
    }
};

export const login = async ({ email, password }) => {
    try {
        const response = await post('/voter/login', { email: email, password: password });
        return response;
    } catch (err) {
        console.log(err.message);
    }
};

export const createVoter = async ({ email, password, fullName, electionAddress, electionName }) => {
    try {
        const response = await post(
            '/voter/register',
            {
                email,
                password,
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

export const updateVoter = async ({ email, password, fullName, electionName }) => {
    try {
        const response = await post(
            '/voter/update',
            { email, password, fullName, electionName },
            Cookies.get('companyToken'),
        );

        return response;
    } catch (err) {
        console.log(err.message);
    }
};

export const deleteVoter = async ({ email }) => {
    try {
        const response = await post('/voter/delete', { email }, Cookies.get('companyToken'));
        return response;
    } catch (err) {
        console.log(err.message);
    }
};
