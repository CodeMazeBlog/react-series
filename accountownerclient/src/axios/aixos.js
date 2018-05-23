import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        headerType: 'example header type'
    }
});

export default instance;