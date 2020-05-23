<template>
    <div>
         <table class="table table-bordered">
            <thead class="table-success font-weight-bold">
                <tr>
                    <td class="text-primary" colspan="7">Total number of loading sites: </td>
                </tr>
                <tr>
                    <td class="text-center">SN</td>
                    <td>Code</td>
                    <td>State Domiciled</td>
                    <td>Loading Site</td>   
                    <td>Address</td>                         
                    <td class="text-center">Edit</td>
                    <td class="text-center">Delete</td>
                </tr>
            </thead>
            <tbody style="font-size:11px;">
                <tr v-for="(loadingSite, index) in loadingSites" :key="index">
                    <td>{{index += 1}}</td>
                    <td>{{ loadingSite.loadingSiteCode }}</td>
                    <td>
                        <span v-for="(state, index) in provinces" :key="index">
                            <span v-if="state.stateId === loadingSite.stateDomiciled">{{ state.stateName }}</span>
                        </span>
                    </td>
                    <td>{{ loadingSite.loadingSite }}</td>
                    <td>{{ loadingSite.address }}</td>
                    <td class="text-center">
                        <router-link :to="`/preferences/loading-sites/${loadingSite.id}/edit`">
                            <i class="icon-pen"></i>
                        </router-link>
                    </td>
                    <td class="text-center">
                        <i class="icon-trash text-danger" @click="deleteLoadingSite(loadingSite.id)"></i>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex'
export default {

    computed: {
        ...mapGetters([
            'loadingSites',
            'provinces'
        ])
    },
    created() {
        this.$store.dispatch('fetchAllLoadingSites')
    }
}
</script>