import axios from 'axios'

const state = {
    clients: [],
    client: null,
    countries: [],
    states: [],
    products: [],
    clientProducts: [],
    clientLoadingSites: [],
    assignedLoadingSites: []
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
    },

    'PRODUCT_LISTING' (state, products) {
        state.products = products
    },

    'CLIENT_PRODUCT_LISTINGS' (state, products) {
        state.clientProducts = products
    },

    'ADD_CLIENT_PRODUCT'(state, products) {
        state.clientProducts.unshift(products);
    },

    'REMOVE_PRODUCT' (state, productId) {
        const product = state.clientProducts.find(product => product.id === productId);
        if(product) {
            state.clientProducts.splice(state.clientProducts.lastIndexOf(product), 1);
        }
    },

    'CLIENT_LOADING_SITE' (state, response) {
        state.clientLoadingSites = response
    },

    'VIEW_ASSIGNED_LOADING_SITE' (state, response) {
        state.assignedLoadingSites = response;
    },

    'ASSIGNED_LOADING_SITE' (state, response) {
        state.assignedLoadingSites.unshift(response)
    },

    'REMOVE_CLIENT_LOADING_SITE' (state, response) {
        state.assignedLoadingSites.map((el, i) => {
            let record = state.assignedLoadingSites.find(loadingSite => loadingSite.id === response[i]);
            if(record) {
                state.assignedLoadingSites.splice(state.assignedLoadingSites.lastIndexOf(record), 1)
            }
        })
    }

}

const actions = {
    clients: ({ commit }) => {
        axios.get('/clients')
        .then(response => {
            commit('CLIENTS', response.data)
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
    },

    products: ({ commit }) => {
        axios.get('/products')
        .then(response => {
            commit('PRODUCT_LISTING', response.data.data);
        })
        .catch(error => { return error });
    },

    fetchClientProducts: ({ commit }, payload) => {
        axios.get(`/client-products/${payload}`)
        .then(response => {
            commit('CLIENT_PRODUCT_LISTINGS', response.data.data);
        })
        .catch(error => { return error })
    },

    addClientProduct: ({ commit }, formData) => {
        axios.post(`/client-products/${formData.clientId}`, {
            product_id: formData.clientProduct.id
        })
        .then(response => {
            commit('ADD_CLIENT_PRODUCT', response.data.data)
        })
        .catch(error => {
            return error
        })
    },

    removeClientProduct: ({ commit }, payload) => {
        axios.delete(`/remove-client-product/${payload}`)
        .then(response => {
            commit('REMOVE_PRODUCT', payload)
        })
        .catch(error => { return error });
    },

    statesListings: ({ commit }) => {
        axios.get('/states')
        .then(response => {
            commit('COUNTRY_STATE', response.data.states);
        })
        .catch(error => { return error });
    },

    clientLoadingSites: ({ commit }) => {
        axios.get('/loading-sites').then(response => {
            commit('CLIENT_LOADING_SITE', response.data.data)
        }) 
        .catch(error => { return error })
    },

    viewAssignedLoadingSite: ({ commit }, payload) => {
        axios.get(`/client/loading-sites/${payload}`)
        .then(response => {
            commit('VIEW_ASSIGNED_LOADING_SITE', response.data.data);
        })
        .catch(error => { return error });
    },

    assignClientLoadingSite: ({ commit }, formData) => {
        axios.post(`/client/loading-sites/${formData.clientId}`, {
            loading_site_id: formData.loadingSites
        })
        .then(response => {
            commit('ASSIGNED_LOADING_SITE', response.data.data)
        })
        .catch(error => { return error})
    },

    deleteClientLoadingSite: ({ commit }, formData) => {
        axios.post(`/client/loading-sites/${formData.clientId}`, {
            assigned_client_loading_site: formData.assignLoadingSites
        })
        .then(response => {
            commit('REMOVE_CLIENT_LOADING_SITE', formData.assignLoadingSites)
        })
        .catch(error => { return error })
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
    },

    fetchProducts(state) {
        return state.products;
    },

    fetchClientProducts(state) {
        return state.clientProducts;
    },

    fetchClientLoadingSites(state) {
        return state.clientLoadingSites;
    },

    fetchAssignedLoadingSites(state) {
        return state.assignedLoadingSites
    }
}

export default {
    state, mutations, actions, getters
}