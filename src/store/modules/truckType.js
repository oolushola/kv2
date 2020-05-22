import axios from 'axios'

const state = {
    truckTypes: null,
    truckDetails: null,
}

const mutations = {
    'TRUCK_TYPES' (state, truckTypesResponse) {
        state.truckTypes = truckTypesResponse
    },

    'NEW_TRUCK_TYPE' (state, { id, truckTypeCode, truckType, tonnage}) {
        const newTruckType = {
            id, truckTypeCode, truckType, tonnage
        }
        state.truckTypes.unshift(newTruckType);
    },

    'TRUCK_DETAILS' (state, details) {
        state.truckDetails = details
    },

    'REMOVE_TRUCK_DETAILS'(state, response) {
        const record = state.truckTypes.find(truckType => truckType.id === response);
        state.truckTypes.splice(state.truckTypes.indexOf(record), 1);
    }
}

const actions = {
    addTruckType: ({ commit }, payload) => {
        const truckTypeRequest = {
            truck_type_code: payload.truckTypeCode,
            truck_type: payload.truckType,
            tonnage: payload.tonnage
        }
        axios.post('/truck-types', truckTypeRequest)
            .then(response => {
                commit('NEW_TRUCK_TYPE', response.data.data)
            }).catch(error => {
                return error
            })
    },

    getAllTruckTypes: ({ commit }) => {
        axios.get('/truck-types').then((response) => {
            commit('TRUCK_TYPES', response.data.data)
        })
        .catch(error => {
            return error
        })
    },

    specificTruckType: ({ commit, state }, payload) => {
        axios.get(`/truck-types/${payload}`)
        .then(response => {
            state.truckDetails = response
            commit('TRUCK_DETAILS', response.data.data)
        }).catch(error => {
            return error
        })
    },

    deleteTruckType: ({ commit }, payload) => {
        axios.delete(`/truck-types/${payload}`)
        .then(response => {
            commit('REMOVE_TRUCK_DETAILS', payload)
        })
        .catch(error => {
            return error
        })
    }
}

const getters = {
    viewTruckTypes(state) {
        return state.truckTypes
    },
    truckTypeInformation(state) {
        return state.truckDetails
    }
}


export default {
    state, getters, mutations, actions
}

