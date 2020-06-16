<template>
    <div>
        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                    <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Home - </span>  Clients</h4>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>

                <div class="header-elements d-none">
                    <div class="d-flex justify-content-center">
                        <router-link to="/clients/new"  class="btn btn-link btn-float text-default">
                            <i class="icon-add text-primary"></i> 
                            <span>Add New Client</span>
                        </router-link>
                        <router-link to="/clients" class="btn btn-link btn-float text-default">
                            <i class="icon-book text-warning"></i>
                            <span>All Clients</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <router-view></router-view>
        
        <div class="row">
            <div class="col-md-12">
                &nbsp;
                <list-loader :speed="2" v-if="!clients"></list-loader>
                <table class="table table-bordered" v-else>
                    <thead class="table-success font-weight-bold">
                        <tr>
                            <td colspan="7" class="text-primary">Client Count: ({{clients.length}}) </td>
                        </tr>
                        <tr>
                            <td colspan="7" class="text-primary">
                                <input type="text" class="form-control" placeholder="Search Transporter" v-model="searchClient">
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center">SN</td>
                            <td>Basic Details</td> 
                            <td>Other Information</td>
                            <td>Products</td> 
                            <td>Loading Sites</td> 
                            <td class="text-center">Actions</td>
                            
                        </tr>
                        <tr v-if="!clients">
                            <td colspan="7" class="text-danger text-center">No information has been recorded.</td>
                        </tr>
                    </thead>
                   
                    <transition-group enter-to-class="animated fadeIn" leave-to-class="animated fadeOut" tag="tbody" class="font-size-sm" mode="out-in">
                        <app-client v-for="(client, index) in filteredClient" :key="client.companyName" :sn="index +=1" :class="{'table-success' : index % 2 == 0}" :client="client"></app-client>
                    </transition-group>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
import Client from './Client.vue'
import { ListLoader } from 'vue-content-loader'

export default {
    data() {
        return {
            searchClient: '',
            companyName: ''
        }
    },

    computed: {
        clients() {
            return this.$store.getters.clientListings
        },

        filteredClient() {
            return this.clients.filter(client => {
                return client.companyName.match(this.searchClient)
            })
        }
    },

    components: {
        appClient: Client,
        ListLoader
    },

    created() {
        this.$store.dispatch('clients')
    }
}
</script>