import { post } from './httpRequest';

export const sendMailNotification = async (email, positionName, electionName) => {
    try {
        const response = await post('/candidate/sendMailNotification', {
            email: email,
            positionName: positionName,
            electionName: electionName,
        });
        return response;
    } catch (err) {
        console.log(err.message);
    }
};
