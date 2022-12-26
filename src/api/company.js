import Cookies from 'js-cookie';
import { getMethod, postMethod } from './httpRequest';

export const getCompanyById = async ({ id }) => {
    try {
        const response = await getMethod('/company/' + id, {}, Cookies.get('companyToken'));
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const resultMail = async ({electionName, winners}) => {
    try{
        const response = await postMethod('/company/resultMail', {
            electionAddress: Cookies.get('electionAddress'),
            electionName,
            winners,    
        }, Cookies.get('companyToken'));
        return response;
    }catch (err) {
        console.log(err);
    }
};
