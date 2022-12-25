import Cookies from 'js-cookie';
import {getMethod} from './httpRequest';

export const getCompanyById = async ({id}) => {
    try{
        const response = await getMethod('/company/'+id, {}, Cookies.get('companyToken'));
        return response;
    }catch(err){
        console.log(err);
    }
}