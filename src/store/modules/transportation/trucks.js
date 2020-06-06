import axios from 'axios'

const state = {
    trucks: [],
    transporters: [],
    truckTypes: [],
    onEdit: null
}

const mutations = {
    'TRUCKS' (state, response) {
        state.trucks = response.data
        state.transporters = response.transporters,
        state.truckTypes = response.truckTypes
    },
    'NEW_TRUCK' (state, response) {
        state.trucks.unshift(response)
    },
    'TRUCK_DETAILS' (state, response) {
        state.onEdit = response
    },
    'UPDATE_TRUCKS' (state, response) {
        const record = state.trucks.find(element => element.id === response.id);
        if(record) {
            record.truckNo = response.truckNo
        }
        state.trucks = response
    },
    'DELETE_TRUCK' (state, response) {
        const record = state.trucks.find(element => element.id === response);
        if(record) {
            state.trucks.splice(state.trucks.lastIndexOf(record), 1);
        }
    }
}

const actions = {
    trucks: ({ commit }) => {
        axios.get('/trucks').then(response => {
            commit('TRUCKS', response.data);
        })
        .catch(error => {
            return error
        })
    },

    addTruck: ({ commit }, formData) => {
        axios.post('/trucks', {
            'transporter_id': formData.transporterId,
            'truck_type_id': formData.truckTypeId,
            'truck_no': formData.truckNo
        })
        .then(response => {
            commit('NEW_TRUCK', 
                response.data.data
            )
        })
    },

    editTruck: ({ commit }, payload) => {
        axios.get(`/trucks/${payload}`)
        .then(response => {
            commit('TRUCK_DETAILS', response.data.data)
        })
        .catch(error => {
            return error
        })
    },

    updateTruck: ({ commit }, {formData, truckId}) => {
        axios.put(`/trucks/${truckId}`, {
            'transporter_id': formData.transporterId,
            'truck_type_id': formData.truckTypeId,
            'truck_no': formData.truckNo
        })
        .then(response => {
            commit('UPDATE_TRUCKS', response.data.data)
        })
        .catch(error => {
            return error
        })
    },

    deleteTruck: ({ commit }, payload) => {
        axios.delete(`/trucks/${payload}`)
        .then(response => {
            commit('DELETE_TRUCK', payload)
        })
        .catch(error => {
            return error
        })
    }
}

const getters = {
    trucks(state) {
        return state.trucks
    },
    transporters(state) {
        return state.transporters
    },
    truckTypes(state) {
        return state.truckTypes
    },
    truckInfo(state) {
        return state.onEdit
    }
}

export default {
    state, mutations, actions, getters
}