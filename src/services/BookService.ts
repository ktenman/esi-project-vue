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

    editBook(book: any) {
        return axios.put(API_URL + '/books',book, { headers: authHeader() });
    }

    createBook(book: any) {
        return axios.post(API_URL + '/books',book, { headers: authHeader() });
    }

    getBookCategories() {
        return axios.get(API_URL + '/books/categories',{ headers: authHeader() });
    }
}

export default new BookService();
