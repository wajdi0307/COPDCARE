// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance' of it
const token = JSON.parse(localStorage.getItem('token'))

const instance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://mindstakeback.herokuapp.com'
});

// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Also add/ configure interceptors && all the other cool stuff





export default instance;