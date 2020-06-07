import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import product from './modules/product'
import trucktype from './modules/truckType'
import loadingsite from './modules/loadingsite'
import companyTarget from './modules/companyTarget'
import unitheadtarget from './modules/unitheadtarget'
import invoicesubheading from './modules/invoicesubheading'
import companyprofile from './modules/companyprofile'
import trucks from './modules/transportation/trucks'
import drivers from './modules/transportation/driver'
import transporter from './modules/transportation/transporter'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        auth,
        product,
        trucktype,
        loadingsite,
        companyTarget,
        unitheadtarget,
        invoicesubheading,
        companyprofile, 
        trucks,
        drivers,
        transporter
    },
    
})