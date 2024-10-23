import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;

const getToken = async () => {
    axiosInstance.post('/auth/refresh', {
    }).then(response => {
        const { accessToken } = response.data.access;
        return accessToken

    }).catch(error => {
        console.log(error);
        return null
    });
}
