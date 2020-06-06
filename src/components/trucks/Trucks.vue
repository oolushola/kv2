<template>
    <div>
        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                    <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Home - Transportation</span> Trucks</h4>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <router-view></router-view>
            </div>

            <div class="col-md-5">
                &nbsp;
                <app-truck-form></app-truck-form>
                
                
            </div>
            <div class="col-md-7">
                &nbsp;
                <list-loader :speed="2" v-if="!trucks"></list-loader>
                <table class="table table-bordered" v-else>
                    <thead class="table-success font-weight-bold">
                        <tr>
                            <td colspan="4" class="text-primary">Truck Count: ({{trucks.length}}) </td>
                            <td colspan="2">
                                <input type="text" class="form-control" placeholder="Search Truck No" v-model="searchTruck">
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center">SN</td>
                            <td>Transporter</td>
                            <td>Truck Type</td> 
                            <td>Truck No</td>         
                            <td class="text-center">Edit</td>
                            <td class="text-center">Delete</td>
                        </tr>
                    </thead>
                    <tr>
                        <td colspan="6" v-if="trucks.length <= 0" >No truck has been added.</td>
                    </tr>
                    
                    <transition-group enter-to-class="animated fadeIn" leave-to-class="animated fadeOut" speed="3" tag="tbody" class="font-size-sm" mode="in-out">
                        <app-truck 
                            v-for="(truck, index) in filteredTrucks" 
                            :key="truck.truckNo" 
                            :truck="truck" 
                            :sn="index+=1" 
                            :class="{'table-success':index %2 !=0}"></app-truck>
                    </transition-group>
                </table>
            </div>
        </div>
        
    </div>
</template>

<script>
import Truck from './Truck.vue'
import TruckForm from './TruckForm.vue'
import { ListLoader } from 'vue-content-loader'

export default {
    data() {
        return {
            searchTruck: ''
        }
    },
    computed: {
        trucks() {
            return this.$store.getters.trucks
        },
        filteredTrucks() {
            return this.trucks.filter(truck => {
                return truck.truckNo.match(this.searchTruck.toUpperCase())
            })
        }
    },
    components: {
        appTruck: Truck,
        appTruckForm: TruckForm,
        ListLoader
    },
    created() {
        this.$store.dispatch('trucks')
    }
}
</script>