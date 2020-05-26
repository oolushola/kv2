import axios from 'axios'

const state = {
    companyTargets: null,
    onEdit: false,
    companyTargetValue: null
}

const mutations = {
    'COMPANY_TARGETS' (state, response) {
        state.companyTargets = response
    },
    'COMPANY_TARGET' (state, response) {
        const targets = state.companyTargets.find(record => record.id === response.id);
        if(targets) {
            targets.target = response.target
        }
        else{
            state.companyTargets.unshift(response)
        }
    },
    'SHOW_COMPANY_TARGET'(state, response) {
        state.companyTargetValue = response
    },
    'REMOVE_CURRENT_TARGET'(state, response) {
        const targets = state.companyTargets.find(record => record.id === response);
        if(targets) {
            state.companyTargets.splice(state.companyTargets.indexOf(targets));
        }
    }
}

const actions = {
    fetchAllCompanyTarget: ({ commit }) => {
        axios.get('/company-target')
            .then(response => {
                commit('COMPANY_TARGETS', response.data.data)
            })
            .catch(error => {
                return error
            })
    },

    addNewCompanyTarget: ({ commit }, { currentYear, currentMonth, target}) => {
        const targetRequest = {
            current_year: currentYear,
            current_month: currentMonth,
            target,
        }
        axios.post('/company-target', targetRequest)
            .then(response => {
                commit('COMPANY_TARGET', response.data.data);
            })
            .catch(error => {
                return error
            })
    },

    specificCompanyTarget: ({ commit }, payload) => {
        axios.get(`/company-target/${payload}`)
            .then(response => {
                commit('SHOW_COMPANY_TARGET', response.data.data)
            })
            .catch(error => {
                return error
            })
    },

    updateCompanyTarget: ({ commit }, payload) => {
        axios.put(`/company-target/${payload.id}`, {
            current_year : payload.currentYear,
            current_month: payload.currentMonth,
            target:payload.target
        })
        .then(response => {
            commit('COMPANY_TARGET', response.data.data)
        })
        .catch(error => {
            return error
        }) 
    },
    removeCompanyTarget: ({ commit }, payload) => {
        const ask = confirm('Are you sure about this?');
            if(ask) {
                axios.delete(`/company-target/${payload}`) 
                .then(response => {
                    commit('REMOVE_CURRENT_TARGET', payload)
                })
            }
            else{
                return false
            }
        
        
    }
}

const getters = {
    companyTargets(state) {
        return state.companyTargets
    },

    specificRecord(state) {
        return state.companyTargetValue
    }
}

export default {
    state, mutations, actions, getters
}