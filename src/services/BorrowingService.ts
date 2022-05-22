import axios from 'axios';
import authHeader from './auth-header';
import {API_URL} from "@/services/Config";

class BorrowingService {

    borrow(borrowing: any) {
        return axios.post(API_URL + '/borrowings', borrowing, { headers: authHeader() });
    }

    release(borrowing: any) {
        return axios.put(API_URL + '/borrowings', borrowing, { headers: authHeader() });
    }

    getAllBookRentingRequests() {
        return axios.get(API_URL + '/borrowings', { headers: authHeader() });
    }

}

export default new BorrowingService();
