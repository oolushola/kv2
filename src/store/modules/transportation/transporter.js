import axios from 'axios'

const state = {
    transporters: [],
    users: []
}

const mutations = {
    'TRANSPORTERS' (state, response) {
        state.transporters = response.data
        state.users = response.users
    }
}

const actions = {
    fetchTransporters: ({ commit }) => {
        axios.get('/transporters')
        .then(response => {
            commit('TRANSPORTERS', response.data);
        })
        .catch(error => {
            return error
        })
    },

    addNewTransporter: ({ commit }, transporterCredentials) => {
            
    }
}

const getters = {
    transporterList(state) {
        return state.transporters
    },
    staffs(state) {
        return state.users
    }
}

export default {
    state, mutations, actions, getters
}