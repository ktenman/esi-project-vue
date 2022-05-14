import axios from 'axios';

const API_URL = 'https://esitartulibrary.herokuapp.com/users';
// const API_URL = 'http://localhost:8081/users/';


class AuthService {
    login(username: string, password: string) {

        return axios
            .post(API_URL + '/authenticate', {
                "password": password,
                "rememberMe": true,
                "username": username
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if (response.data.token) {
                    console.log("siin");
                    console.log(JSON.stringify(response.data.token));
                    localStorage.setItem('user', JSON.stringify(response.data.token));
                }

                return response.data;
            }).catch(err => {
                console.log(err.response);
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(username: string, lastName: string, firstName: string, email: string, password: string, type: string, address: string, phoneNumber: string) {
        return axios.post(API_URL + '', {
            username,
            firstName,
            lastName,
            email,
            password,
            type,
            address,
            phoneNumber
        }, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}

export default new AuthService();
