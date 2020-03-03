import axios from 'axios';
import be_conf from './be_config';
class Auth {

    static authenticateUser(token) {
        var tokenObj = {};
        tokenObj.token = token;
        localStorage.setItem('token_rohan', JSON.stringify(tokenObj));
    }

    static isUserAuthenticated() {
        var token = localStorage.getItem('token_rohan');

        // const response = await axios.post(be_conf.server + '/checkauth',{} ,{ headers: { "Authorization": 'Bearer ' + token } });

        // if (token !== null) {


        //     if (response.data === 'checked') {
        //         return true;
        //     }
        //     else return false;
        // }
        // else {

        //     return false;
        // }
        
        if (token !== null && JSON.parse(token).exp > new Date() / 1000) {
            return true
        }
        else
            return false


    }
    static deauthenticateUser() {
        localStorage.removeItem('token_rohan')
    }

    static getToken() {
        if (localStorage.getItem('token_rohan') !== null) {
            return JSON.parse(localStorage.getItem('token_rohan')).token;
        }
        else
            return '';
    }
    static setExp(exp) {
        
        var tokenObj = JSON.parse(localStorage.getItem('token_rohan'));
        tokenObj.exp = exp;
        localStorage.setItem('token_rohan', JSON.stringify(tokenObj));
    }
}

export default Auth