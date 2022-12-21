
import axios from 'axios';

const httpRequest = (token='') => {
    return axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: { 'Authorization': 'Bearer ' + token},
    });
}

export const post = async (path, option={}, token) => {
    const response = await httpRequest(token).post(path, option);
    return response.data;
}
export const get = async (path, option={}, token) => {
    const response = await httpRequest(token).get(path, option);
    return response.data;
};
