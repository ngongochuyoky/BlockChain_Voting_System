import Cookies from 'js-cookie';
import { postMethod } from './httpRequest';

export const sendMailNotification = async ({ email, positionName, electionName }) => {
    try {
        const response = await postMethod(
            '/candidate/sendMailNotification',
            {
                email,
                positionName,
                electionName,
            },
            Cookies.get('companyToken'),
        );
        return response;
    } catch (err) {
        return err.response.data;
    }
};
