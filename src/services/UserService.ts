import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://esitartulibrary.herokuapp.com/';

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

    getBook(id: number) {
        return axios.get(API_URL + 'books/' + id, {headers: authHeader()});
    }
}

export default new UserService();
