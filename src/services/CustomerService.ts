import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'https://esitartulibrary.herokuapp.com/';
const API_URL = 'http://localhost:8081/';


class CustomerService {
    searchCustomers(searchKey: string, pageSize: number, pageIndex: number) {
        return axios.get(API_URL + `customers/search?searchKey=${searchKey}&pageSize=20&pageIndex=0`, { headers: authHeader() });
    }
    getCustomer(id: number) {
        return axios.get(API_URL + 'customers/' + id, { headers: authHeader() });
    }
    getAdminBoard() {
        return axios.get(API_URL + 'customers', { headers: authHeader() });
    }
}
export default new CustomerService();
