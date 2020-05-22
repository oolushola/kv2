<template>
    <div>
        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                    <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Home - Preference</span> - Truck Types</h4>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>

                <div class="header-elements d-none">
                    <div class="d-flex justify-content-center">
                        <router-link to="/preferences/truck-types"  class="btn btn-link btn-float text-default">
                            <i class="icon-add text-primary"></i> 
                            <span>Add Truck Type</span>
                        </router-link>
                        <router-link to="/preferences/truck-types/view-all" class="btn btn-link btn-float text-default">
                            <i class="icon-calculator text-warning"></i>
                            <span>View Truck Types</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <router-view></router-view>
            </div>
            <div class="col-md-5">
                &nbsp;
                <app-truck-type-form></app-truck-type-form>
            </div>
            <div class="col-md-7">
                &nbsp;
                <table class="table table-bordered">
                    <thead class="table-success font-weight-bold">
                        <tr>
                            <td class="text-primary" colspan="6">Total number of truck types: </td>
                        </tr>
                        <tr>
                            <td class="text-center">SN</td>
                            <td>Code</td>
                            <td>Truck Type </td>
                            <td class="text-center">Tonnage</td>
                            <td class="text-center">Edit</td>
                            <td class="text-center">Delete</td>
                        </tr>
                    </thead>
                    <tbody style="font-size:11px;">
                        <app-truck-type 
                            v-for="(truckType, index) in truckTypes" 
                            :sn="index += 1" 
                            :key="index" 
                            :truckType="truckType" 
                            :class="{'table-warning':index % 2 == 0}"></app-truck-type>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import TruckTypeForm from './TruckTypeForm.vue'
import TruckType from './TruckType.vue'
export default {
    props: ['testing'],
    computed: {
        truckTypes() {
            return this.$store.getters.viewTruckTypes;
        }
    },
    components: {
        AppTruckTypeForm: TruckTypeForm,
        AppTruckType: TruckType
    },
    created() {
        this.$store.dispatch('getAllTruckTypes')
    }
}
</script>