import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from "@/services/Config";
class AuthService {
    login(username: string, password: string) {

        return axios
            .post(API_URL + '/users/authenticate', {
                "password": password,
                "rememberMe": true,
                "username": username
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(async response => {
                let currentUser = null
                if (response.data.token) {
                    let res =  await fetch(API_URL + '/users/current', {
                        method: "GET",
                        headers: { Authorization: 'Bearer ' + response.data.token }
                    });
                    currentUser = await res.json();
                    localStorage.setItem('user', JSON.stringify(currentUser));
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                }
                return currentUser ;
            }).catch(err => {
                console.log(err.response);
            });
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    register(username: string, lastName: string, firstName: string, email: string, password: string, address: string, phoneNumber: string, idCode: string) {
        return axios.post(API_URL + '/users', {
            username,
            firstName,
            lastName,
            email,
            password,
            address,
            phoneNumber,
            idCode
        }, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}

export default new AuthService();
