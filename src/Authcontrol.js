import axios from 'axios';
import be_conf from './be_config';
class Auth {

    static authenticateUser(token) {
        localStorage.setItem('token_rohan', token)
    }

    static isUserAuthenticated() {
        
        return localStorage.getItem('token_rohan') !== null
    }

    static deauthenticateUser() {
        localStorage.removeItem('token_rohan')
    }

    static getToken() {
        return localStorage.getItem('token_rohan')
    }
}

export default Auth