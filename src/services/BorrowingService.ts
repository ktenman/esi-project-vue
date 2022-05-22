import axios from 'axios';
import authHeader from './auth-header';
import {API_URL} from "@/services/Config";

class BorrowingService {

    borrow(borrowing: any) {
        return axios.post(API_URL + '/borrowings', borrowing, { headers: authHeader() });
    }

}

export default new BorrowingService();
