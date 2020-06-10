import axios from 'axios'

const state = {
    transporters: [],
    users: [],
    transporter: null
}

const mutations = {
    'TRANSPORTERS' (state, response) {
        state.transporters = response.data
        state.users = response.users
    },

    'NEW_TRANSPORTER' (state, response) {
        state.transporters.unshift(response.data)
    },

    'TRANSPORTER' (state, transporter) {
        state.transporter = transporter
    },

    'UPDATE_TRANSPORTERS' (state, response) {
        const record = state.transporters.find(element => element.id === response.id);
        if(record) {
            Object.assign(record, response)
        }
    },

    'REMOVE_TRANSPORTER' (state, response) {
        const record = state.transporters.find(element => element.id === response);
        if(record) {
            state.transporters.splice(state.transporters.lastIndexOf(record), 1);
        }
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

    addTransporter: ({ commit, dispatch }, formData) => {
        axios.post('/transporters', {
            owned_by:formData.assignedStaff.userId,
            transporter_name: formData.transporterName,
            email: formData.email,
            phone_no: formData.phoneNo,
            phone_no_two: formData.altPhoneNo,
            address: formData.address,
            bank_name: formData.bankName,
            account_name: formData.accountName,
            account_type: formData.accountType,
            account_no: formData.accountNo,
            guarantor_full_name: formData.guarantor,
            guarantor_phone_no: formData.guarantorPhoneNo,
            guarantor_phone_no_two: formData.gurantorAltPhoneNo,
            guarantor_address: formData.guarantorAddress,
            nok_full_name: formData.nextOfKin,
            nok_phone_no_one: formData.nokPhoneNo,
            nok_phone_no_two: formData.nokAltPhoneNo,
            relationship_with_nok: formData.relationshipWithNok,
            nok_address: formData.nokAddress
        })
        .then(response => {
            commit('NEW_TRANSPORTER', response.data)
            dispatch('addDocuments')
        })
        .catch(error => { return error });
    },

    transporterDetails: ({ commit }, payload) => {
        axios.get(`/transporters/${payload}`)
        .then(response => {
            commit('TRANSPORTER', response.data.data);
        })
        .catch(error => {
            return error;
        })
    },

    updateTransporter: ({ commit }, {formData,  transporterId}) => {
        console.log(formData)
        axios.put(`/transporters/${transporterId}`, {
            owned_by:formData.assignedStaff.userId,
            transporter_name: formData.transporterName,
            email: formData.email,
            phone_no: formData.phoneNo,
            phone_no_two: formData.altPhoneNo,
            address: formData.address,
            bank_name: formData.bankName,
            account_name: formData.accountName,
            account_type: formData.accountType,
            account_no: formData.accountNo,
            guarantor_full_name: formData.guarantor,
            guarantor_phone_no: formData.guarantorPhoneNo,
            guarantor_phone_no_two: formData.gurantorAltPhoneNo,
            guarantor_address: formData.guarantorAddress,
            nok_full_name: formData.nextOfKin,
            nok_phone_no_one: formData.nokPhoneNo,
            nok_phone_no_two: formData.nokAltPhoneNo,
            relationship_with_nok: formData.relationshipWithN
        })
        .then(response => {
            commit('UPDATE_TRANSPORTERS', response.data.data)
        })
        .catch(error => {
            return error
        })
    },

    removeTransporter: ({ commit }, payload) => {
        axios.delete(`/transporters/${payload}`)
        .then(response => {
            console.log(response)
            commit('REMOVE_TRANSPORTER', payload)
        })
        .catch(error => { return error });
    },

    addDocuments: ({ commit }) => {
        console.log('Dispatch bulk document upload...')
    }
}

const getters = {
    transporterList(state) {
        return state.transporters
    },
    staffs(state) {
        return state.users
    },
    transporter(state) {
        return state.transporter;
    }
}

export default {
    state, mutations, actions, getters
}