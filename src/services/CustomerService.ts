import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'https://esitartulibrary.herokuapp.com/';
const API_URL = 'http://localhost:8081/';


class CustomerService {
    getUserBoard() {
        return axios.get(API_URL + 'customers', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'customers', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'customers', { headers: authHeader() });
    }
}

export default new CustomerService();
