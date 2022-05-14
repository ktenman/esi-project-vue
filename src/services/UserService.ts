import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://esitartulibrary.herokuapp.com/';
// const API_URL = 'http://localhost:8081/';


class UserService {

    searchPublicContent(searchKey: string, pageSize: number, pageIndex: number) {
        return axios.get(API_URL + `books/search?searchKey=${searchKey}&pageSize=20&pageIndex=0`, { headers: authHeader() });
    }

    getPublicContent() {
        return axios.get(API_URL + 'books', { headers: authHeader() });
    }

    getUserBoard() {
        return axios.get(API_URL + 'customers', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'customers', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'customers', { headers: authHeader() });
    }

    getBook(id: number) {
        return axios.get(API_URL + 'books/' + id, { headers: authHeader() });
    }

}

export default new UserService();
