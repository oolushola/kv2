import axios from 'axios'

const state = {
    loadingSites: null,
    provinces: null,
    details: null,

}

const mutations = {
    'LOADING_SITES' (state, response) {
        state.loadingSites = response.data.data
        state.provinces = response.data.states
    },

    'NEW_LOADING_SITE' (state, response) {
        state.loadingSites.unshift(response);
    },

    'LOADING_SITE_DETAIL' (state, response) {
        state.details = response
    },

    'UPDATE_LOADING_SITE' (state, response) {
        const loadingSiteId = response.id;
        const record = state.loadingSites.find(record => record.id === loadingSiteId);
        if(record) {
            record.loadingSiteCode = response.loadingSiteCode
            record.loadingSite = response.loadingSite
        }
    }
}

const actions = {
    fetchAllLoadingSites({ commit }) {
        axios.get('loading-sites')
            .then(response => {
                commit('LOADING_SITES', response)
            })
            .catch(error => {
                return error
            })
    },

    addLoadingSite: ({ commit }, payload) => {
        axios.post('/loading-sites', payload)
            .then(response => {
                commit('NEW_LOADING_SITE', response.data.data);
            })
            .catch(error => {
                return error
            })
    },

    loadingSiteDetails: ({ commit }, payload) => {
        axios.get(`/loading-sites/${payload}`)
            .then(response => {
                commit('LOADING_SITE_DETAIL', response.data.data)
            })
            .catch(error => {
                return error
            })
    },

    updateLoadingSite: ({ commit }, payload) => {
        const updateRequest = {
            state_domiciled: payload.stateDomiciled,
            loading_site_code: payload.loadingSiteCode,
            loading_site: payload.loadingSite,
            address: payload.address
        }
        axios.put(`/loading-sites/${payload.loadingSiteId}`, updateRequest)
            .then(response => {
                commit('UPDATE_LOADING_SITE', response.data.data)
            })
            .catch(error => {
                return error
            })
    }
}

const getters = {
    loadingSites(state) {
        return state.loadingSites
    },

    provinces(state) {
        return state.provinces
    },

    loadingSiteInfo(state) {
        return state.details
    }
}

export default {
    state, mutations, actions, getters
}