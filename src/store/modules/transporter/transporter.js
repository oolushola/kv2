import axios from 'axios'

const state = {

}

const mutations = {
    fetchTransporters: ({ commit }) => {
        axios.get('/transporters')
        .then(response => {
            commit('TRANSPORTERS', response.data.data);
        })
        .catch(error => {
            return error
        })
    },

    addNewTransporter: ({ commit }, transporterCredentials) => {
            
    }
}

const actions = {

}

const getters = {

}

export default {
    state, mutations, actions, getters
}