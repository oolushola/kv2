<template>
    <div>
        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                    <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Home - </span>  Transporter</h4>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>

                <div class="header-elements d-none">
                    <div class="d-flex justify-content-center">
                        <router-link to="/transporters/new"  class="btn btn-link btn-float text-default">
                            <i class="icon-add text-primary"></i> 
                            <span>Add New Transporter</span>
                        </router-link>
                        <router-link to="/transporters" class="btn btn-link btn-float text-default">
                            <i class="icon-calculator text-warning"></i>
                            <span>View all Transtransporters</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <router-view></router-view>
        
        <div class="row">
            <div class="col-md-12">
                <table class="table table-bordered">
                    <thead class="table-success font-weight-bold">
                        <tr>
                            <td colspan="7" class="text-primary">Transport Count: ({{ transporters.length }}) </td>
                        </tr>
                        <tr>
                            <td colspan="7" class="text-primary">
                                <input type="text" class="form-control" placeholder="Search Transporter" v-model="searchTransporter">
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center">SN</td>
                            <td>Basic Information</td>
                            <td>Bank Details</td> 
                            <td>Guarantor</td>  
                            <td>Next of Kin</td>         
                            <td class="text-center">Edit</td>
                            <td class="text-center">Delete</td>
                        </tr>
                        <tr v-if="transporters.length <= 0">
                            <td colspan="7" class="text-danger text-center">No information has been recorded.</td>
                        </tr>
                    </thead>
                   
                    <transition-group enter-to-class="animated fadeIn" leave-to-class="animated fadeOut" tag="tbody" class="font-size-sm" mode="out-in">
                        
                        <app-transporter v-for="(transporter, index) in filteredTransporters" :key="transporter.transporter" :sn="index += 1" :transporter="transporter"></app-transporter>
                    </transition-group>
                </table>
                
            </div>
        </div>
        
    </div>
</template>

<script>
import Transporter from './Transporter.vue'
import { ListLoader } from 'vue-content-loader'

export default {
    data() {
        return {
            myData: null,
            searchTransporter: ''
        }
    },

    computed: {
        transporters() {
            return this.$store.getters.transporterList
        },

        filteredTransporters() {
            return this.transporters.filter(transporter => {
                return transporter.transporter.match(this.searchTransporter);
            })
        }
    },

    components: {
        appTransporter: Transporter,
        ListLoader,
    },

    created() {
        this.$store.dispatch('fetchTransporters')
    }
   
}
</script>