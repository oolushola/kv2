import axios from 'axios'

const state = {
    clients: [],
    client: null,
    countries: [],
    states: []
}

const mutations = {
    'CLIENTS' (state, response) {
        state.clients = response.data
        state.countries = response.countries
    },

    'NEW_CLIENT' (state, client) {
        state.clients.unshift(client);
    },

    'COUNTRY_STATE' (state, response) {
        state.states = response
    },

    'CLIENT_DETAILS' (state, client) {
        state.client = client
    }
}

const actions = {
    clients: ({ commit }) => {
        axios.get('/clients')
        .then(response => {
            commit('CLIENTS', response.data);
        })
        .catch(error => { return error })
    },

    fetchStates: ({ commit }, countryId) => {
        axios.get(`/country-states/${countryId}`)
        .then(response => {
            commit('COUNTRY_STATE', response.data.states)
        })
    },

    newClient: ({ commit }, clientCredentials) => {
        let formData = new FormData();
        formData.append('parent_company_status', clientCredentials.hasParentCompany)
        formData.append('parent_company', clientCredentials.parentCompany)
        formData.append('company_name', clientCredentials.companyName)
        formData.append('person_of_contact', clientCredentials.personOfContact)
        formData.append('phone_number', clientCredentials.phoneNo)
        formData.append('country_id', clientCredentials.country.countryId)
        formData.append('state_id', clientCredentials.state.stateId)
        formData.append('address', clientCredentials.address)
        formData.append('logo', clientCredentials.logo)
        formData.append('email', clientCredentials.email)
        axios.post('/clients', formData, 
            {
                headers: {
                    'Content-Type' :  'multipart/form-data'
                }
            }
        )
        .then(response => {
            commit('NEW_CLIENT', response.data.data)
        })
        .catch(error => { return error });
    },

    fetchClient: ({ commit }, payload) => {
        axios.get('/clients/'+payload)
        .then(response => {
            commit('CLIENT_DETAILS', response.data.data)
        })
        .catch(error => { return error });
    },

    updateClient: ({ commit }, {formData, clientId, imageChecker}) => {
        let formRequest = new FormData();
        formRequest.append('parent_company_status', formData.hasParentCompany)
        formRequest.append('parent_company', formData.parentCompany)
        formRequest.append('company_name', formData.companyName)
        formRequest.append('person_of_contact', formData.personOfContact)
        formRequest.append('phone_number', formData.phoneNo)
        formRequest.append('country_id', formData.country.countryId)
        formRequest.append('state_id', formData.state.stateId)
        formRequest.append('address', formData.address)
        formRequest.append('logo', formData.logo)
        formRequest.append('email', formData.email)
        formRequest.append('changeImage', imageChecker)
        formRequest.append('_method', 'PATCH')

        axios.post(`/clients/${clientId}`, 
            formRequest,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then(response => {
            //console.log(response)
        })
    }

    
}

const getters = {
    clientListings(state) {
        return state.clients
    },

    countries(state ) {
        return state.countries
    },

    clientStateListings(state) {
        return state.states
    },

    clientDetails(state) {
        return state.client
    }
}

export default {
    state, mutations, actions, getters
}