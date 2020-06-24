import axios from 'axios'

const fetchClients = ({ commit }) => {
    axios.get('/clients')
    .then(response => {
        commit('TRIP_ORDERS_CLIENT', response.data.data)
    })
    .catch(error => {
        return error
    })

    // axios.get('/client-loading-site/${payload}')
    // .then()
}

export {
    fetchClients
}

