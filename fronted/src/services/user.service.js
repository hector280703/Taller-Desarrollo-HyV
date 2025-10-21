import axios from './root.service.js';
import { formatUserData } from '@helpers/formatData.js';

export async function getUsers() {
    try {
        const {data} = await axios.get('/users');
        const formattedData = data.data.map(formatUserData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateUser(id, data) {
    try {
        const response = await axios.patch(`/users?id=${id}`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function deleteUser(id) {
    try {
        const response = await axios.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }   
}

