<template>
    <div>
        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                    <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Home - Transportation</span> Drivers</h4>
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
                <app-driver-form></app-driver-form>
                
                
            </div>
            <div class="col-md-7">
                &nbsp;
                <list-loader :speed="2" v-if="!drivers"></list-loader>
                <table class="table table-bordered" v-else>
                    <thead class="table-success font-weight-bold">
                        <tr>
                            <td colspan="7" class="text-primary">Drivers Count: ({{ drivers.length }}) </td>
                        </tr>
                        <tr>
                            <td colspan="7" class="text-primary">
                                <input type="text" class="form-control" placeholder="Search Driver by Name" v-model="searchDriverName" />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center">SN</td>
                            <td>Driver</td>
                            <td>Motor Boy</td>
                            <td class="text-center">Edit</td>
                            <td class="text-center">Delete</td>
                        </tr>
                    </thead>
                   
                   <tr v-if="drivers.length <= 0">
                        <td colspan="7" class="text-info font-size-sm">You currently do not have any driver information</td>
                   </tr>
                    <transition-group enter-to-class="animated fadeIn" leave-to-class="animated fadeOut" tag="tbody" class="font-size-sm" mode="out-in">
                        <app-driver 
                            v-for="(driver, index) in filteredDrivers" 
                            :key="driver.driver" 
                            :sn="index += 1" 
                            :driver="driver"
                            :class="{'table-success': index % 2 !=0 }"></app-driver>
                    </transition-group>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import Driver from './Driver.vue'
import DriverForm from './DriverForm.vue'
import { ListLoader } from 'vue-content-loader'

export default {
    data() {
        return {
            searchDriverName: ''
        }
    },
    computed: {
        drivers() {
            return this.$store.getters.drivers
        },
        filteredDrivers() {
            return this.drivers.filter(driverName => {
                return driverName.driver.match(this.searchDriverName);
            })
        }
    },

    components: {
        appDriver: Driver,
        appDriverForm: DriverForm,
        ListLoader
    },

    created() {
        this.$store.dispatch('fetchDrivers')
    }
}
</script>