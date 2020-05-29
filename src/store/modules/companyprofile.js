import axios from 'axios'

const state = {
    companyProfile: null,
    signatories:null,
}

const mutations = {
    'PROFILE' (state, result) {
        state.companyProfile = result.data
        state.signatories = result.signatories
    },

    'ADD_NEW_PRODFILE' (state, result) {
        state.companyProfile = result
    },

    'PROFILE_DELETE' (state) {
        state.companyProfile = null
    }

}

const actions = {
    companyProfile: ({ commit }) => {
        axios.get('/company-profile')
            .then(response => {
                commit('PROFILE', response.data);
            })
            .catch(error => {
                return error
            })
    },

    addCompanyProfile: ({ commit }, formDataRequest) => {
        let formData = new FormData();
        formData.append('company_name', formDataRequest.companyName)
        formData.append('email', formDataRequest.email)
        formData.append('phone_no', formDataRequest.phoneNo1)
        formData.append('phone_no_two', formDataRequest.phoneNo2)
        formData.append('website', formDataRequest.website)
        formData.append('logo', formDataRequest.logo)
        formData.append('bank_name', formDataRequest.bankName)
        formData.append('account_name', formDataRequest.accountName)
        formData.append('account_no', formDataRequest.accountNo)
        formData.append('tin', formDataRequest.tin)
        formData.append('signatory', formDataRequest.signatory)
        formData.append('signature', formDataRequest.signature)
        formData.append('address', formDataRequest.address)

        axios.post('/company-profile',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            
        )
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            return error
        })    
    },

    showCompanyProfile: ({ commit }, payload) => {
        axios.get(`/company-profile/${payload}`)
            .then(response => {
                commit('PROFILE', response.data)
            })
            .catch(error => {
                return error
            })
    },

    updateCompanyProfile: ({ commit }, formDataRequest) => {
        let formData = new FormData();
        formData.append('company_name', formDataRequest.companyName)
        formData.append('email', formDataRequest.email)
        formData.append('phone_no', formDataRequest.phoneNo1)
        formData.append('phone_no_two', formDataRequest.phoneNo2)
        formData.append('website', formDataRequest.website)
        formData.append('logo', formDataRequest.logo)
        formData.append('bank_name', formDataRequest.bankName)
        formData.append('account_name', formDataRequest.accountName)
        formData.append('account_no', formDataRequest.accountNo)
        formData.append('tin', formDataRequest.tin)
        formData.append('signatory', formDataRequest.signatory)
        formData.append('signature', formDataRequest.signature)
        formData.append('_method', 'PATCH')
        formData.append('address', formDataRequest.address)

        
        axios.post(`/company-profile/${formDataRequest.id}`, formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
        .then(response => {
            commit('PROFILE', response.data)
        })
        .catch(error => {
            return error
        })
    },

    deleteCompanyProfile: ({ commit }, payload) => {
        axios.delete(`/company-profile/${payload}`)
            .then(response => {
                commit('PROFILE_DELETE', payload)
            })
            .catch(error => {
                return error
            })
    }
}

const getters = {
    showCompanyProfile(state) {
        return state.companyProfile
    },
    showSignatories(state) {
        return state.signatories
    }
}

export default {
    state, mutations, actions, getters
}