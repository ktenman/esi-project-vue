export default function authHeader() : {} {
    const storedUser = localStorage.getItem('user');
    let jwtToken = JSON.parse(storedUser ? storedUser : "");

    if (jwtToken) {
        return { Authorization: 'Bearer ' + jwtToken };
    } else {
        return {};
    }
}
