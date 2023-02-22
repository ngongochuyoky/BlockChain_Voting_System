import { postMethod } from './httpRequest';

export const companyLogin = async ({ email, password }) => {
    try {
        const response = await postMethod('/company/login', { email, password });
        return response;
    } catch (err) {
        return err.response.data;
    }
};
export const companyRegister = async ({ email, password, companyName }) => {
    try {
        const response = await postMethod('/company/register', { email, password, companyName });
        return response;
    } catch (err) {
        return err.response.data;
    }
};

export const voterRegister = async ({ email, password, fullName }) => {
    try {
        const response = await postMethod('/voter/register', {
            email,
            password,
            fullName,
        });
        return response;
    } catch (err) {
        return err.response.data;
    }
};

export const voterLogin = async ({ email, password }) => {
    try {
        const response = await postMethod('/voter/login', { email: email, password: password });
        return response;
    } catch (err) {
        return err.response.data;
    }
};
