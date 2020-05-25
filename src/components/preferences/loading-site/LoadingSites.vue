<template>
    <div>
        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                    <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Home - Preference</span> - Loading Site</h4>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>

                <div class="header-elements d-none">
                    <div class="d-flex justify-content-center">
                        <router-link to="/preferences/loading-sites"  class="btn btn-link btn-float text-default">
                            <i class="icon-add text-primary"></i> 
                            <span class="font-weight-semibold">Add Loading Site</span>
                        </router-link>
                        <router-link to="/preferences/loading-sites/view-all" class="btn btn-link btn-float text-default">
                            <i class="icon-folder text-warning"></i>
                            <span class="font-weight-semibold">Show all loading site</span>
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
                <app-loading-site-frm :regionalState="provinces"></app-loading-site-frm>
            </div>
            <div class="col-md-7">
                &nbsp;
                <table class="table table-bordered">
                    <thead class="table-success font-weight-bold">
                        <tr>
                            <td class="text-primary" colspan="6">Total number of loading sites: </td>
                        </tr>
                        <tr>
                            <td class="text-center">SN</td>
                            <td>Code</td>
                            <td>Loading Site</td>                            
                            <td class="text-center">Edit</td>
                            <td class="text-center">Delete</td>
                        </tr>
                    </thead>
                    <tbody style="font-size:11px;">
                        <app-loading-site 
                            v-for="(loadingSite, index) in loadingSites" 
                            :key="index" 
                            :sn="index += 1" 
                            :loadingSite="loadingSite"></app-loading-site>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import LoadingSiteFrm from './LoadingSiteForm.vue'
import LoadingSite from './LoadingSite.vue'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {

            routeChecker: false
        }
    },
    computed: {
        ...mapGetters([
            'loadingSites',
            'provinces'
        ])
    },

    components: {
        appLoadingSiteFrm: LoadingSiteFrm,
        appLoadingSite:LoadingSite
    },
    created() {
        this.$store.dispatch('fetchAllLoadingSites')
    }
}
</script>