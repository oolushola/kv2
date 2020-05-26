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
                            <td>Full Name</td>
                            <td>Month</td>
                            <td>Target</td>                            
                            <td class="text-center">Edit</td>
                            <td class="text-center">Delete</td>
                        </tr>
                    </thead>
                        <tr v-if="unitHeadTargets.length <=0 ">
                            <td colspan="7">There are no targets available yet.</td>
                        </tr>
                        <transition-group tag="tbody" 
                            enter-to-class="animated fadeIn" 
                            leave-to-class="animated fadeOut" 
                            style="font-size:11px; font-family:DIN Alternate" 
                            >
                            <app-buh-target 
                                v-for="(targets, index) in unitHeadTargets" 
                                :key="targets.id" :unitHeadTargets="targets" 
                                :sn="index+=1" :class="{'table-success': index % 2 == 0}"></app-buh-target>
                        </transition-group>
                    
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import BuhTargetForm from './BuhTargetForm.vue'
import BuhTarget from './BuhTarget.vue'

export default {
    computed: {
        unitHeadTargets() {
            return this.$store.getters.allBusinessUnitHeadTargets
        }
    },
    components: {
        appBuhTargetForm: BuhTargetForm,
        appBuhTarget:BuhTarget
    },

    created() {
        this.$store.dispatch('fetchAllUnitHeadTargets')
    }
}
</script>