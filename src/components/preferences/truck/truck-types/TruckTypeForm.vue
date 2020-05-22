<template>
    <div class="card">
        <div class="card-header header-elements-inline">
            <h5 class="card-title">Add Truck Type</h5>
        </div>
        
        <div class="card-body">
            <form>
                <div class="form-group">
                    <label>Truck Type Code</label>
                    <input type="text" class="form-control" placeholder="C45" v-model="truckTypeCode" maxlength="4">
                </div>

                <div class="form-group">
                    <label>Truck Type</label>
                    <input type="text" class="form-control" placeholder="Covered | Box-Body" v-model="truckType">
                </div>

                <div class="form-group">
                    <label>Tonnage</label>
                    <input type="text" class="form-control" placeholder="30T" v-model="tonnage" maxlength="2">
                </div>

                <div class="text-right">
                    <span id="loader"></span>    
                        <button ref="addNewProduct" type="submit" @click.prevent="addNewTruckType"  class="btn btn-primary" >Save Truck Type <i class="icon-paperplane ml-2"></i></button>
                </div>
            </form>
            {{ truckDetails }}
        </div>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
    
    props:['response'],
    data() {
        return {
            truckTypeCode: '',
            truckType: '',
            tonnage: '',
            onEdit: false,
        }
    },

    computed: {
        truckDetails(event) {
            const response = this.$store.getters.truckTypeInformation
            if(response !== null && this.onEdit === true) {
                this.truckTypeCode = response.truckTypeCode
                this.tonnage = response.tonnage
                this.truckType = response.truckType
            }
        }   
    },

    methods: {
        addNewTruckType() {
            const truckTypeRequest = {
                truckTypeCode:this.truckTypeCode,
                truckType:this.truckType,
                tonnage:this.tonnage
            }
            this.$store.dispatch('addTruckType', truckTypeRequest)
        },
    },

    watch: {
        '$route': function(from, to) {
            let tripId = this.$route.params.id
            this.$store.dispatch('specificTruckType', tripId)
            this.onEdit = true
        }
    }

}
</script>