import {post} from './httpRequest';

export const companyLogin = async (email, password) => {
    try{
        const response = await post('/company/login', { email: email, password: password });
        return response;
    }catch(err){
        console.log(err.message);
    }
}
export const companyRegister = async (email, password, companyName) => {
    try{
        const response = await post('/company/register', { email: email, password: password, companyName: companyName });
        return response;
    }catch(err){
        console.log(err.message);
    }
}