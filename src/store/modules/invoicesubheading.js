import axios from 'axios'

const state = {
    invoiceSubheadings: [],
    clients: [],
    invoiceSubheading: null,
}

const mutations = {
    'INVOICE_SUBHEADINGS' (state, result) {
        state.invoiceSubheadings = result.data
        state.clients = result.clients
    },

    'ADD_INVOICE_SUBHEADING' (state, result) {
        state.invoiceSubheadings.unshift(result);
    },

    'SHOW_INVOICE_SUBHEADING' (state, result) {
        state.invoiceSubheading = result
    },

    'UPDATE_INVOICE_SUBHEADING' (state, result) {
        const record = state.invoiceSubheadings.find(record => record.id === result.id);
        if(record) {
            record.alternateSONumber = result.alternateSONumber
            record.alternateInvoiceNo = result.alternateInvoiceNo
        }
    },

    'DELETE_INVOICE_SUBHEADING' (state, result) {
        const record = state.invoiceSubheadings.find(record => record.id === result);
        if(record) {
            state.invoiceSubheadings.splice(state.invoiceSubheadings.indexOf(record), 1);
        }
    }
}

const actions = {
    fetchInvoiceSubheading: ({ commit }) => {
        axios.get('/invoice-subheading')
        .then(response => {
            commit('INVOICE_SUBHEADINGS', response.data)
        })
        .catch(error => {
            return error
        })
    },

    addInvoiceSubheading: ({ commit }, formDataRequest) => {
        axios.post('/invoice-subheading', formDataRequest)
        .then(response => {
            commit('ADD_INVOICE_SUBHEADING', response.data.data)
        })
        .catch(error => {
            return error
        })
    },

    showInvoiceSubheading: ({ commit, state }, recordId) => {
        axios.get(`/invoice-subheading/${recordId}`)
        .then(response => {
            commit('SHOW_INVOICE_SUBHEADING', response.data.data)
            //state.invoiceSubheading = response.data.data
        })
        .catch(error => {
            return error;
        })
    },

    updateInvoiceSubheading: ({ commit }, formDataRequest) => {
        axios.put(`/invoice-subheading/${formDataRequest.id}`, formDataRequest)
        .then(response => {
            commit('UPDATE_INVOICE_SUBHEADING', response.data.data)
        })
        .catch(error => {
            return error
        })
    },

    removeInvoiceSubheading: ({ commit }, payload) => {
        axios.delete(`/invoice-subheading/${payload}`)
        .then(response => {
            commit('DELETE_INVOICE_SUBHEADING', payload);
        })
    }
}

const getters = {
    invoiceSubheadingHistory(state) {
        return state.invoiceSubheadings
    },
    clients(state) {
        return state.clients
    },
    invoiceSubheadingSpecific(state) {
        return state.invoiceSubheading
    }
}

export default {
    state, mutations, actions, getters
}