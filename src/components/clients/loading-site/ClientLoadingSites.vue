<template>
    <div class="row">
        <section class="col-md-4 col-sm-12">
            &nbsp;
            <div class="card">
                <div class="card-body">
                    <h2 class="text-primary">{{ $route.params.client.toUpperCase().replace(/-/g, ' ') }}</h2>
                    <div class="row mt-3">
                        <div class="col-12">
                            <div class="form-group">
                                <label class="text-primary">State / Province*</label>
                                <select class="form-control" v-model="formData.stateId">
                                    <option value="">Choose State</option>
                                    <option v-for="(state, index) in states" :key="index" :value="state.stateId">{{state.state}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="col-md-3 col-sm-12">
            &nbsp;
            <div class="card">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead class="table-success font-size-sm">
                            <tr>
                                <td colspan="2">Total Loading Site ({{filterLoadingSite.length}})</td>
                            </tr>
                            <tr>
                                <th width="5%"><input type="checkbox" v-model="checkAll" ></th>
                                <th>Select all loading site</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(loadingSite, index) in filterLoadingSite" :key="index" :class="{'table-success': index % 2 !== 0}">
                                <td>
                                    <input type="checkbox" :checked="checkAll" v-model="formData.loadingSites" :value="loadingSite.id">
                                    </td>
                                <td class="font-weight-bold" style="font-size:11px">{{ loadingSite.loadingSite }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <section class="col-md-2">
            <div class="text-center">
                <button class="btn btn-primary mt-5 mb-3" @click="assignClientLoadingSite">Assign Loading Site</button>
                <button class="btn btn-danger" @click="removeClientLoadingSite">Remove Loading Site</button>
            </div>
        </section>

        <section class="col-md-3 col-sm-12">
            &nbsp;
            <div class="table-responsive">
                <!--<list-loader :speed="2"></list-loader>-->
                <table class="table table-bordered">
                    <thead class="table-success">
                        <tr>
                            <td colspan="4">Total loading site assigned : (0) </td>
                        </tr>
                        <tr>
                            <td width="5%">SN</td>
                            <td>All assigned loading site</td>
                        </tr>
                    </thead>
                    <tr v-if="assignedLoadingSites.length <= 0">
                        <td colspan="4" class="text-danger">No loading site assgined</td>
                    </tr>
                    <tr v-else v-for="(assignedSite, index) in assignedLoadingSites" :key="index" :class="{'table-success': index % 2 !== 0}">
                        <td><input type="checkbox" v-model="formData.assignLoadingSites" :value="assignedSite.id"></td>
                        <td class="font-weight-bold" style="font-size:11px">{{ assignedSite.loadingSite }}</td>
                    </tr>
                </table>
            </div>
        </section>
    </div>
</template>

<script>
import { required, maxLength, numeric } from 'vuelidate/lib/validators'
import { ListLoader } from 'vue-content-loader'

export default {   
    data() {
        return {
            checkAll: false,
            formData: {
                loadingSites: [],
                stateId: '',
                clientId: this.$route.params.id,
                assignLoadingSites: []
            },
        }
    },
    validations: {
        
    },
    computed: {
        states() {
            return this.$store.getters.clientStateListings
        },

        clientLoadingSites() {
            return this.$store.getters.fetchClientLoadingSites
        },

        filterLoadingSite() {
            return this.clientLoadingSites.filter(loadingSite => {
                return String(loadingSite.stateDomiciled).match(String(this.formData.stateId))
            })
        },

        assignedLoadingSites() {
            return this.$store.getters.fetchAssignedLoadingSites
        }
    },

    methods: {
        assignClientLoadingSite() {
            this.$store.dispatch('assignClientLoadingSite', this.formData)
            this.formData.loadingSites = []
            this.formData.stateId = ''
        },

        removeClientLoadingSite() {
            this.$store.dispatch('deleteClientLoadingSite', this.formData);
        }
    },
    
    components: {
        ListLoader,
    },

    watch: {
        '$route' : function() {
            this.$store.dispatch('viewAssignedLoadingSite', this.$route.params.id)
        }
    },

    created() {
        this.$store.dispatch('statesListings')
        this.$store.dispatch('clientLoadingSites')
        this.$store.dispatch('viewAssignedLoadingSite', this.$route.params.id)
    }
    
}
</script>

<style scoped>
    input, select, textarea {
        border-radius:15px
    }
</style>