import Cookies from 'js-cookie';
import { post } from './httpRequest';


export const sendMailNotification = async ({email, positionName, electionName}) => {
    //data = {email:'', positionName:'', electionName:''}
    try {
        const response = await post('/candidate/sendMailNotification', {
            email,
            positionName,
            electionName,
        }, Cookies.get('companyToken'));
        return response;
    } catch (err) {
        console.log(err.message);
    }
};

