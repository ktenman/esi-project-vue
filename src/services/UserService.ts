import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8082/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'books', {headers: authHeader()});
    }

    getUserBoard() {
        return axios.get(API_URL + 'customers', {headers: authHeader()});
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'customers', {headers: authHeader()});
    }

    getAdminBoard() {
        return axios.get(API_URL + 'customers', {headers: authHeader()});
    }
}

export default new UserService();
