export default function authHeader() : {} {
    const token = localStorage.getItem('token');
    let jwtToken = JSON.parse(token ? token : "");

    if (jwtToken) {
        return { Authorization: 'Bearer ' + jwtToken };
    } else {
        return {};
    }
}
