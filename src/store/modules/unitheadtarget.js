import axios from 'axios'

const state = {
    unitHeadUsers: null,
    unitHeadTargets: [],
    showRecord: null,
}

const mutations = {
    'BUSINESS_UNIT_HEAD_TARGETS' (state, response) {
        state.unitHeadUsers = response.unitHeads
        state.unitHeadTargets = response.data
    },

    'BUSINESS_UNIT_HEAD' (state, response) {
        state.unitHeadTargets.unshift(response);
    },

    'UNIT_HEAD_SPECIFIC_TARGET' (state, response) {
        state.showRecord = {
            recordId: response.id,
            userId: response.userId,
            target: response.target
        }
    },

    'UPDATE_BUSINESS_UNIT_TARGET' (state, response) {
        const record = state.unitHeadTargets.find(record => record.id === response.id);
        if(record) {
            record.target = response.target
        }
    },

    'DELETE_UNIT_HEAD_TARGET' (state, resourceId) {
        const record = state.unitHeadTargets.find(record => record.id === resourceId);
        state.unitHeadTargets.splice(state.unitHeadTargets.indexOf(record), 1);
    }
}

const actions = {
    fetchAllUnitHeadTargets: ({ commit }) => {
        axios.get('/business-unit-target')
            .then(response => {
                commit('BUSINESS_UNIT_HEAD_TARGETS', response.data);
            })
            .catch(error => {
                return error
            })
    },

    addBusinessUnitTarget: ({ commit }, payloadRequest) => {
        const businessUnit = {
            current_year: payloadRequest.currentYear,
            current_month: payloadRequest.currentMonth,
            user_id: payloadRequest.unitHead,
            target: payloadRequest.target,
            fullName: payloadRequest.fullName
        }
        axios.post('/business-unit-target', businessUnit)
            .then(response => {
                commit('BUSINESS_UNIT_HEAD', {
                    id: response.data.data.id,
                    currentYear: response.data.data.currentYear,
                    currentMonth: response.data.data.currentMonth,
                    fullName: businessUnit.fullName,
                    target: response.data.data.target
                });
            })
    },

    showUnitHeadTarget: ({ commit }, payload) => {
        axios.get(`/business-unit-target/${payload}`)
            .then(response => {
                commit('UNIT_HEAD_SPECIFIC_TARGET', response.data.data);
            })
            .catch(error => {
                return error
            })
    },

    updateBusinessUnitTarget: ({ commit }, { id, unitHead, target , currentYear, currentMonth }) => { 
        const updateRequest = {
            target,
            user_id: unitHead,
            current_year: currentYear,
            current_month: currentMonth
        }
        axios.put(`/business-unit-target/${id}`, updateRequest) 
        .then(response => {
            commit('UPDATE_BUSINESS_UNIT_TARGET', response.data.data);
        })
        .catch(error => {
            return error
        })
    },

    removeUnitHeadTarget: ({ commit }, resourceId) => {
        axios.delete(`/business-unit-target/${resourceId}`)
        .then(response => {
            commit('DELETE_UNIT_HEAD_TARGET', resourceId)
        })
        .catch(error => {
            return error
        })
    }
};

const getters = {
    allBusinessUnitHeadTargets(state) {
        return state.unitHeadTargets
    },

    unitHeadUsersListing(state) {
        return state.unitHeadUsers
    },

    unitHeadRecordSpecific(state) {
        return state.showRecord
    }
}

export default {
    state, mutations, actions, getters
}