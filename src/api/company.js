import Cookies from 'js-cookie';
import { getMethod, postMethod } from './httpRequest';

export const getCompanyById = async ({ id }) => {
    try {
        const response = await getMethod('/company/' + id, {}, Cookies.get('companyToken'));
        return response;
    } catch (err) {
        return err.response.data;
    }
};

export const resultMail = async ({ electionName, winners }) => {
    try {
        const response = await postMethod(
            '/company/resultMail',
            {
                electionAddress: Cookies.get('companyElectionAddress'),
                electionName,
                winners,
            },
            Cookies.get('companyToken'),
        );
        return response;
    } catch (err) {
        return err.response.data;
    }
};
