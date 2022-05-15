import axios from 'axios';
import authHeader from './auth-header';
import {API_URL} from "@/services/Config";

class BookService {

    searchBooks(searchKey: string, pageSize: number, pageIndex: number) {
        return axios.get(API_URL + `/books/search?searchKey=${searchKey}&pageSize=20&pageIndex=0`, { headers: authHeader() });
    }

    getBook(id: number) {
        return axios.get(API_URL + '/books/' + id, { headers: authHeader() });
    }

}

export default new BookService();
