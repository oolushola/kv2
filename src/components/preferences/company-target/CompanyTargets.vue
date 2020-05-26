<template>
    <div>
        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                    <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Home - Preference</span> - Targets</h4>
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
                <app-target-form></app-target-form>
            </div>
            <div class="col-md-7">
                &nbsp;
                <table class="table table-bordered">
                    <thead class="table-success font-weight-bold">
                        <tr>
                            <td class="text-center">SN</td>
                            <td>Month</td>
                            <td>Target</td>                            
                            <td class="text-center">Edit</td>
                            <td class="text-center">Delete</td>
                        </tr>
                    </thead>
                    <tbody style="font-size:11px;">
                        <app-target v-for="(target, index) in companyTargetRecords" :key="index" :target="target" :sn="index+=1"></app-target>
                    </tbody>
                </table>
            </div>
            
        </div>
    </div>
</template>

<script>
import CompanyTargetForm from './CompanyTargetForm.vue'
import companyTarget from './CompanyTarget.vue'

export default {
    data() {
        return {
            routeChecker: false
        }
    },

    computed: {
        companyTargetRecords() {
            return this.$store.getters.companyTargets
        },
    },

    components: {
        appTargetForm: CompanyTargetForm,
        appTarget:companyTarget
    },
    created() {
        this.$store.dispatch('fetchAllCompanyTarget')
    }
}
</script>