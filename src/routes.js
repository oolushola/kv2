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

import Transporters from './components/transporter/Transporters'
import TransporterForm from './components/transporter/TransporterForm.vue'
import Trucks from './components/trucks/Trucks.vue'
import Drivers from './components/drivers/Drivers.vue'

import Clients from './components/clients/Clients.vue'
import ClientForm from'./components/clients/ClientForm.vue'
import ClientProduct from './components/clients/product/ClientProduct.vue'
import ClientLoadingSites from './components/clients/loading-site/ClientLoadingSites.vue'



export const routes = [
    { path: '*', redirect: '/' },
    { path: '', component: Login, name: 'login' },
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
    }, 
    { path: '/transporters', component: Transporters, name: 'transporters', children:[
        { path: 'new', component:TransporterForm, name: 'newTransporter'},
        { path: ':id/edit', component: TransporterForm, name: 'editTransporter'}
    ]},
    { path: '/trucks', component: Trucks, name: 'trucks'},
    { path: '/drivers', component: Drivers, name: 'drivers'},
    { path: '/clients', component: Clients, name: 'clients', children: [
        { path: 'new', component: ClientForm, name: 'newClient' },
        { path: ':id/edit', component: ClientForm, name: 'updateClient' },
        { path: ':client/product/:id', component: ClientProduct, name:'clientProduct'},
        { path: ':client/loading-site/:id', component: ClientLoadingSites, name:'clientLoadingSite' }
        
    ]}
]

