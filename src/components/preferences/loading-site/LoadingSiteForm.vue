<template>
    <div class="card">
        <div class="card-header header-elements-inline">
            <h5 class="card-title">Add Loading Site</h5>
        </div>
        
        <div class="card-body">
            <form>
                <div class="form-group">
                    <label>State Domiciled</label>
                    <select v-model="stateDomiciled" class="form-control"> 
                        <option value="">Choose a loading Site</option>
                        <option v-for="(state, index) in regionalState" :key="index"  :value="state.stateId">{{ state.stateName}}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Loading Site Code</label>
                    <input type="text" class="form-control" placeholder="GPF" v-model="loadingSiteCode">
                </div>

                <div class="form-group">
                    <label>Loading Site</label>
                    <input type="text" class="form-control" placeholder="GPF-APAPA" v-model="loadingSite">
                </div>

                <div class="form-group">
                    <label>Loading Site Address</label>
                    <textarea class="form-control" rows="5" v-model="address"></textarea>
                </div>

                <div class="text-right">
                    <span id="loader"></span>    
                        <button v-if="!$route.params.id" type="submit" @click.prevent="addLoadingSite"  class="btn btn-primary" >Save Loading Site <i class="icon-paperplane ml-2"></i></button>

                        <button v-if="$route.params.id" type="submit" @click.prevent="updateLoadingSite"  class="btn btn-primary" >Updated Loading Site <i class="icon-paperplane ml-2"></i></button>
                </div>
                {{ loadingSiteDetails }}
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {   
    props:['regionalState'], 
    data() {
        return {
            stateDomiciled: '',
            loadingSiteCode: '',
            loadingSite: '',
            address: '',
            onEdit: false,
        }
    },

    computed: {
        ...mapGetters(['loadingSiteInfo']),

        loadingSiteDetails() {
            if(this.loadingSiteInfo !== null && this.onEdit === true) {
                const info = this.loadingSiteInfo;
                this.stateDomiciled = info.stateDomiciled
                this.loadingSiteCode = info.loadingSiteCode
                this.loadingSite = info.loadingSite
                this.address = info.address
            }
            
        }
    },

    methods: {
        addLoadingSite(event) {
            const payload = {
                state_domiciled: this.stateDomiciled,
                loading_site_code: this.loadingSiteCode,
                loading_site: this.loadingSite,
                address: this.address
            }
            this.$store.dispatch('addLoadingSite', payload);
        },
        updateLoadingSite() {
            const payload = {
                stateDomiciled: this.stateDomiciled,
                loadingSiteCode: this.loadingSiteCode,
                loadingSite: this.loadingSite,
                address: this.address, 
                loadingSiteId: this.$route.params.id
            }
            this.$store.dispatch('updateLoadingSite', payload);
        }
    },

    watch: {
        '$route': function(to, from) {
            const requestedId = this.$route.params.id
            this.$store.dispatch('loadingSiteDetails', requestedId)
            this.onEdit = true
        }
    }
}
</script>