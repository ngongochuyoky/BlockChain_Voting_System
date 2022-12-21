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

export const login = async ({email, password}) => {
    try{
        const response = await post('/voter/login', {email: email, password: password});
        return response;
    }catch (err) {
        console.log(err.message);
    }
}

export const createVoter = async ({ email, password, fullName, electionAddress }) => {
    try {
        const response = await post(
            '/voter/create',
            {
                email,
                password,
                fullName,
                electionAddress,
            },
            Cookies.get('companyToken'),
        );
        return response;
    } catch (err) {
        console.log(err.message);
    }
};

export const updateVoter = async ({ email, password, fullName }) => {
    try {
        console.log(email, password, fullName);
        const response = await post('/voter/update', { email, password, fullName }, Cookies.get('companyToken'));
        
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
