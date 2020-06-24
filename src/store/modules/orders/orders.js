import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

const state = {
    ordersClient: [],
    ordersLoadingSite: [],
}

export default {
    state,
    getters,
    mutations,
    actions
}