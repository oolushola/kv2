<template>
    <div class="card">
        <div class="card-body">
            <form>
                &nbsp;
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Transporter</label>
                            <select class="form-control" 
                                v-model.trim="$v.formData.transporterId.$model" 
                                @blur="$v.formData.transporterId.$touch()" 
                                :class="{'notificationLabel animated shake': $v.formData.transporterId.$error }">
                                <option value="">Choose a transporter</option>
                                <option 
                                    v-for="transporter in transporters" 
                                    :key="transporter.transporterName"
                                    :value="transporter.transporterId">{{ transporter.transporterName }}</option>
                                
                            </select>
                            <p v-if="!$v.formData.transporterId.required" class="error">Choose a transporter</p>                            
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Truck Type</label>
                            <select class="form-control" 
                                v-model.trim="$v.formData.truckTypeId.$model" 
                                @blur="$v.formData.truckTypeId.$touch()" 
                                :class="{'notificationLabel animated shake' : $v.formData.truckTypeId.$error }">
                                <option value="">Choose Truck Type</option>
                                <option 
                                    v-for="truckType in truckTypes"
                                    :key="truckType.truckTypeId"
                                    :value="truckType.truckTypeId">{{ truckType.truckType }}</option>
                            </select>
                            <p v-if="!$v.formData.truckTypeId.required" class="error">A Truck Type is Required</p> 
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Truck No.</label>
                        <input type="text" class="form-control" 
                            v-model.trim="$v.formData.truckNo.$model" 
                            :class="{'notificationLabel': $v.formData.truckNo.$error }" 
                            @blur="$v.formData.truckNo.$touch()" />
                        <p v-if="!$v.formData.truckNo.required" class="error">Truck No is required.</p>
                        <p v-if="!$v.formData.truckNo.minLen" class="error">Truck No cannot be less than {{ $v.formData.truckNo.$params.minLen.min }} character.</p>
                        <p v-if="!$v.formData.truckNo.maxLen" class="error">Truck No cannot be greater than {{ $v.formData.truckNo.$params.maxLen.max }} character.</p>

                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <span ref="loader"></span>    
                        <button type="submit" v-if="!isEditing" class="btn btn-primary" @click.prevent="saveTruck" ref="save" >Save Truck<i class="icon-paperplane ml-2"></i></button>
                        
                        <button type="submit" v-else class="btn btn-primary" @click.prevent="updateTruck" ref="update" >Update Truck<i class="icon-paperplane ml-2"></i></button>
                </div>
                <div class="font-weight-bold error">{{ statusMessage }}</div>
            </form>
            {{ truckInfo }} 
        </div>
    </div>
</template>

<script>

import { required, numeric, minLength, maxLength } from 'vuelidate/lib/validators'
export default {   
    data() {
        return {
            formData: {
                transporterId: '',
                truckTypeId: '',
                truckNo: '',
            },
            isEditing: false,
            truckId: null,
            statusMessage: ''
        }
    },

    
    computed: {
        transporters() {
            return this.$store.getters.transporters
        },
        truckTypes() {
            return this.$store.getters.truckTypes
        },
        truckInfo() {
            const onEdit = this.$store.getters.truckInfo
            if(onEdit) {
                this.formData.transporterId = onEdit.transporterId
                this.formData.truckTypeId = onEdit.truckTypeId
                this.formData.truckNo = onEdit.truckNo
                this.isEditing = true
                this.truckId = onEdit.id
            }
        }
    },

    validations: {
        formData: {
            transporterId: {
                required
            },
            truckTypeId: {
                required
            },
            truckNo: {
                required,
                minLen: minLength(9),
                maxLen: maxLength(10),
            }
        }
    },

    methods: {
        saveTruck() {
            this.$v.$touch()
            if(this.$v.$invalid) {
                this.statusMessage = 'ERROR! Some required rules are missing.'
                return false
            } else {
                this.statusMessage = 'Saving...'
                this.$store.dispatch('addTruck', this.formData)
                this.statusMessage = 'Saved'
            }
        },
        updateTruck() {
            this.$v.$touch()
            if(this.$v.$invalid) {
                this.statusMessage = 'ERROR! Some required rules are missing.'
                return false
            }
            else{
                this.$store.dispatch('updateTruck', {
                    formData: this.formData,
                    truckId: this.truckId
                });
                this.statusMessage = 'Updated'
            }
        }
    }
}

</script>