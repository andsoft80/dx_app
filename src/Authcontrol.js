import axios from 'axios';
import be_conf from './be_config';
class Auth {

    static authenticateUser(token) {
        localStorage.setItem('token_rohan', token)
    }

    static async isUserAuthenticated() {
        var token = localStorage.getItem('token_rohan');
        const response = await axios.post(be_conf.server + '/checkauth',{} ,{ headers: { "Authorization": 'Bearer ' + token } });

        if (token !== null) {
            

            if (response.data === 'checked') {
                return true;
            }
            else return false;
        }
        else {
            
            return false;
        }
    }
    static deauthenticateUser() {
        localStorage.removeItem('token_rohan')
    }

    static getToken() {
        return localStorage.getItem('token_rohan')
    }
}

export default Auth