import axios from 'axios'
import { router } from '../../main'

const state = {
    userToken: null,
    userId: null,
    user: null
};

const mutations = {
    'LOGIN' (state, { token, id }) {
        state.userToken = token;
        state.userId = id
    },

    'AUTH_USER'(state, authUser) {
        state.user = authUser
    },
    
    'LOG_OUT' (state) {
        state.userToken = null
        state.userId = null
        state.user = null
    }
};

const actions = {
    login: ({ commit }, loginCredentials) => {
        axios.post('/login', loginCredentials)
        .then(response => {
            const authUser = {
                token: response.data.token,
                id: response.data.id,
                expiresIn: response.data.expiresIn
            }
            
            const now = new Date();
            const expirationDate = new Date(now.getTime() + response.data.expiresIn * 1000)

            localStorage.setItem('token', authUser.token);
            localStorage.setItem('id', authUser.id);
            localStorage.setItem('sessionValidity', expirationDate);
            commit('LOGIN', authUser);
            router.replace('/dashboard')

        })
        .catch(error => console.log(error))
    },

    autoLogin: ({ commit }) => {
        const token = localStorage.getItem('token');
        if(!token) {
            router.push('/')
        }
        const expirationDate = localStorage.getItem('sessionValidity');
        const now = new Date();
        if(now > expirationDate) {
            return;
        }
        const id = localStorage.getItem('id');
        const userData = { token, id, }
        commit('LOGIN', userData)
    },

    logout: ({ commit }) => {
        commit('LOG_OUT');
        localStorage.clear();
        router.replace('/')
    },

    fetchUserDetails: ({ commit }) => {
        axios.get('/user-details/'+state.userId, {
            headers: {
                'Authorization' : 'Bearer '+state.userToken
            }
        })
        .then(response => {
            //console.log(response)
            commit('AUTH_USER', response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }


};


const getters = {
    userInfo(state) {
        return state.userId;
    },
    userDetails(state) {
        return state.user;
    },
    activeUserState(state) {
        return state.userToken !== null
    },
    activeToken(state) {
        return state.userToken
    }

};

export default {
    state, mutations, actions, getters
}