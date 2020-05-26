import Login from './components/auth/Login.vue'
import Register from './components/auth/Register.vue'
import Dashboard from './components/Dashboard.vue'
import AppProducts from './components/preferences/products/Products.vue'
import Preferences from './components/preferences/Preferences.vue'
import TruckTypes from './components/preferences/truck/truck-types/TruckTypes.vue'
import LoadingSites from './components/preferences/loading-site/LoadingSites.vue'
import AllLoadingSites from './components/preferences/loading-site/ViewAll.vue'
import CompanyTargets from './components/preferences/company-target/companyTargets.vue'
import CompanyProfile from './components/preferences/company-profile/companyProfile.vue'
import InvoiceSubheading from './components/preferences/invoice-subheading/InvoiceSubheadings.vue'
import BuhTarget from './components/preferences/buh-targets/BuhTargets.vue'


export const routes = [
    { path: '*', redirect: '/dashboard'},
    {path: '/', component: Login, name: 'login'},
    { path: '/dashboard', component: Dashboard, name: 'dashboard'},
    { path: '/sign-up', component: Register, name: 'register' },
    
    { path: '/preferences', component: Preferences, name: 'preferences', children: 
        [
            { path: 'company-profile', component: CompanyProfile, name:'companyProfile', children: [
                { path: ':id/edit' }
            ]},
            { path: 'products', component: AppProducts, name: 'products', children: [
                { path:':id/edit' }
            ]},
            { path: 'truck-types', component: TruckTypes, name: 'trucktypes', children:[
                {path: ':id/edit' }
            ]},
            { path: 'loading-sites', component: LoadingSites, name: 'loadingsite', children: [
                { path: ':id/edit'},
            ]},
            { path: 'loading-sites/view-all', component: AllLoadingSites},
            { path: 'company-target', component: CompanyTargets, name: 'companytargets'},
            { path: 'invoice-subheading', component: InvoiceSubheading, name: 'Invoicesubheading'},
            { path: 'unit-head-targets', component: BuhTarget, name: 'unitheadtarget' },
        ]
    }
    
]