
import axios from 'axios';

const httpRequest = (token='') => {
    return axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: { 'Authorization': 'Bearer ' + token},
    });
}

export const postMethod = async (path, option={}, token) => {
    const response = await httpRequest(token).post(path, option);
    return response.data;
}
export const putMethod = async (path, option={}, token) => {
    const response = await httpRequest(token).put(path, option);
    return response.data;
}
export const deleteMethod = async (path, option={}, token) => {
    const response = await httpRequest(token).delete(path, option);
    return response.data;
}
export const getMethod = async (path, option={}, token) => {
    const response = await httpRequest(token).get(path, option);
    return response.data;
};
export const patchMethod = async (path, option={}, token) => {
    const response = await httpRequest(token).patch(path, option);
    return response.data;
};
