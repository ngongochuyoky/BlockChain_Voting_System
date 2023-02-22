import Cookies from 'js-cookie';
import { getMethod } from './httpRequest';

//Tạo khóa
export const generateKey = async () => {
    try {
        const response = await getMethod('/key/' + Cookies.get('companyId') + '/keys', {}, Cookies.get('companyToken'));
        return response;
    } catch (err) {
        return err.response.data;
    }
};

//Kiểm tra tạo key chưa
export const getHashSignature = async () => {
    try {
        const response = await getMethod(
            '/key/' + Cookies.get('companyId') + '/hashSignature',
            {},
            Cookies.get('companyToken'),
        );
        return response;
    } catch (err) {
        return err.response.data;
    }
};
