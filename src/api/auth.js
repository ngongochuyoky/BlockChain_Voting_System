import {postMethod} from './httpRequest';

export const companyLogin = async (email, password) => {
    try{
        const response = await postMethod('/company/login', { email: email, password: password });
        return response;
    }catch(err){
        console.log(err.message);
    }
}
export const companyRegister = async (email, password, companyName) => {
    try{
        const response = await postMethod('/company/register', { email: email, password: password, companyName: companyName });
        return response;
    }catch(err){
        console.log(err.message);
    }
}


