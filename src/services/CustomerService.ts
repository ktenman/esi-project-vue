import axios from 'axios';
import authHeader from './auth-header';
import {API_URL} from "@/services/Config";

class CustomerService {
    searchCustomers(searchKey: string, pageSize: number, pageIndex: number) {
        return axios.get(API_URL + `customers/search?searchKey=${searchKey}&pageSize=20&pageIndex=0`, { headers: authHeader() });
    }
    getCustomer(id: number) {
        return axios.get(API_URL + 'customers/' + id, { headers: authHeader() });
    }
}
export default new CustomerService();
