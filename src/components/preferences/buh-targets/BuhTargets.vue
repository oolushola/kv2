<template>
    <div>
        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                    <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Home - Preference</span> - Unit Head Targets</h4>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-5">
                &nbsp;
                <app-buh-target-form></app-buh-target-form>
            </div>
            <div class="col-md-7">
                &nbsp;
                <table class="table table-bordered">
                    <thead class="table-success font-weight-bold">
                        <tr>
                            <td class="text-center">SN</td>
                            <td>Year</td>
                            <td>Month</td>
                            <td>Target</td>                            
                            <td class="text-center">Edit</td>
                            <td class="text-center">Delete</td>
                        </tr>
                    </thead>
                    <tbody style="font-size:11px;">
                        <app-buh-target></app-buh-target>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import BuhTargetForm from './BuhTargetForm.vue'
import BuhTarget from './BuhTarget.vue'

export default {
    data() {
        return {

            routeChecker: false
        }
    },
    

    components: {
        appBuhTargetForm: BuhTargetForm,
        appBuhTarget:BuhTarget
    },
    created() {
        // this.$store.dispatch('fetchAllLoadingSites')
    }
}
</script>