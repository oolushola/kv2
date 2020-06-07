import axios from 'axios'

const state = {
    drivers: [],
    onEdit: null
}

const mutations = {
    'DRIVERS' (state, response) {
        state.drivers = response
    },

    'NEW_DRIVER'(state, response) {
        state.drivers.unshift(response);
    },

    'SHOW_DRIVER' (state, response) {
        state.onEdit = response
    },

    'UPDATE_DRIVER' (state, response) {
        const record = state.drivers.find(element => element.id === response.id);
        if(record) {
            record.driver = response.driver,
            record.driverPhoneNo = response.driverPhoneNo
            record.driverAltNo = response.driverAltNo
            record.motorBoy = response.motorBoy,
            record.motorBoyNo = response.motorBoyNo,
            record.motorBoyAltNo = response.motorBoyAltNo
        }
    } ,

    'DELETE_DRIVER' (state, driverId) {
        const record = state.drivers.find(element => element.id === driverId);
        if(record) {
            state.drivers.splice(state.drivers.lastIndexOf(record), 1);
        }
    }
}

const actions = {
    fetchDrivers: ({ commit }) => {
        axios.get('/drivers')
        .then(response => {
            commit('DRIVERS', response.data.data)
        })
        .catch(error => { return error});
    },

    addDriver: ({ commit }, formData) => {
        axios.post('/drivers', {
            'first_name': formData.firstName,
            'last_name': formData.lastName,
            'driver_phone_no': formData.driverPhoneNo,
            'driver_alt_no' : formData.driverAltNo,
            'motor_boy_first_name': formData.motorBoyFirstName,
            'motor_boy_last_name': formData.motorBoyLastName,
            'motor_boy_no': formData.motorBoyNo,
            'motor_boy_alt_no': formData.motorBoyAltNo
        })
        .then(response => {
            commit('NEW_DRIVER', response.data.data)
        })
        .catch(error => { return error})
    },

    editDriver: ({ commit }, payload) => {
        axios.get(`/drivers/${payload}`)
        .then(response => {
            commit('SHOW_DRIVER', response.data.data)
        })
        .catch(error => {return error})
    },

    updateDriver: ({ commit }, { formData, driverId}) => {
        axios.put(`/drivers/${driverId}`, {
            'first_name': formData.firstName,
            'last_name': formData.lastName,
            'driver_phone_no': formData.driverPhoneNo,
            'driver_alt_no' : formData.driverAltNo,
            'motor_boy_first_name': formData.motorBoyFirstName,
            'motor_boy_last_name': formData.motorBoyLastName,
            'motor_boy_no': formData.motorBoyNo,
            'motor_boy_alt_no': formData.motorBoyAltNo
        })
        .then(response => {
            commit('UPDATE_DRIVER', response.data.data);
        })
        .catch(error => { return error })
    },

    deleteDriver: ({ commit }, payload) => {
        axios.delete(`/drivers/${payload}`)
        .then(response => {
            commit('DELETE_DRIVER', payload);
        })
        .catch(error => { return error })
    }
}

const getters = {
    drivers(state) {
        return state.drivers
    },
    driverInfo(state) {
        return state.onEdit
    }
}

export default {
    state, mutations, actions, getters
}