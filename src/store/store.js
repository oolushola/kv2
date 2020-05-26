import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import product from './modules/product'
import trucktype from './modules/truckType'
import loadingsite from './modules/loadingsite'
import companyTarget from './modules/companyTarget'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        auth,
        product,
        trucktype,
        loadingsite,
        companyTarget
    }
})