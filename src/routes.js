import Login from './components/auth/Login.vue'
import Register from './components/auth/Register.vue'
import Dashboard from './components/Dashboard.vue'

import AppProducts from './components/products/Products.vue'

import Preferences from './components/preferences/Preferences.vue'
import TruckTypes from './components/preferences/truck/truck-types/TruckTypes.vue'
import LoadingSites from './components/preferences/loading-site/LoadingSites.vue'

export const routes = [
    { path: '*', redirect: '/dashboard'},
    {path: '/', component: Login},
    { path: '/dashboard', component: Dashboard},
    { path: '/sign-up', component: Register },
    { 
        path: '/products', component: AppProducts, children: [
            { path:':id/edit', component: AppProducts }
        ]
    },
    { path: '/preferences', component: Preferences, children: [
            { path: 'truck-types', component: TruckTypes, children:[
                {path: ':id/edit' }
            ]},
            { path: 'loading-sites', component: LoadingSites}
        ]
    }
    
]