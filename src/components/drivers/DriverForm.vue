<template>
    <div class="card">
        <div class="card-body">
            <form>
                &nbsp;

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>First Name</label>
                            <input type="text" class="form-control" 
                                v-model.trim="$v.formData.firstName.$model"
                                :class="{'notificationLabel animated shake': $v.formData.firstName.$error}"
                                @blur="$v.formData.firstName.$touch()">
                            <p class="error" v-if="$v.formData.firstName.$error">Drivers first name is required.</p>
                        </div>
                    </div>
                    <div class="col-md-6 font-weight-bold">
                        <div class="form-group">
                            <label>Last Name</label>
                            <input type="text" class="form-control" v-model.trim="formData.lastName"  />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Driver Phone Number</label>
                            <input type="text" class="form-control" v-model.trim="$v.formData.driverPhoneNo.$model"
                                :class="{'notificationLabel animated shake' : $v.formData.driverPhoneNo.$error }"
                                @blur="$v.formData.driverPhoneNo.$touch()"
                             />
                             <p class="error" v-if="!$v.formData.driverPhoneNo.required">Driver Phone number is required</p>
                              <p class="error" v-if="!$v.formData.driverPhoneNo.maxLen">Sorry, Phone number can not exceed 13 characters</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Driver Alternate Phone Number</label>
                            <input type="text" class="form-control" placeholder="Optional" v-model="formData.driverAltNo" />
                        </div>
                    </div>
                    <legend class="font-weight-semibold"><i class="icon-people mr-2"></i> Motor Boy Information</legend>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>First Name</label>
                            <input type="texts" v-model="formData.motorBoyFirstName" class="form-control" placeholder="Optional"  />
                        </div>
                    </div>
                    <div class="col-md-6 font-weight-bold">
                        <div class="form-group">
                            <label>Last Name</label>
                        <input type="text" class="form-control" v-model="formData.motorBoyLastName" placeholder="Optional"   />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="text" class="form-control" placeholder="Optional"  v-model="formData.motorBoyNo" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Motor Boy Alternate Number</label>
                            <input type="text" class="form-control" placeholder="Optional" v-model="formData.motorBoyAltNo" />
                        </div>
                    </div>
                </div>

                <div class="text-right">
                        <button type="submit" class="btn btn-primary"  
                        :disabled="$v.$invalid" 
                        @click.prevent="addDriver" v-if="!onEdit">Save<i class="icon-paperplane ml-2"></i></button>

                        <button type="submit" class="btn btn-primary"  
                        :disabled="$v.$invalid" 
                        @click.prevent="updateDriver" v-else>Update<i class="icon-paperplane ml-2"></i></button>
                </div>
            
            </form>
            <p class="error" id="statusMessage">{{ statusMessage }}</p>
            {{ driverInfo }}
        </div>
    </div>
</template>

<script>
import { required, maxLength, numeric } from 'vuelidate/lib/validators'
export default {   
    data() {
        return {
           formData: {
                firstName: '',
                lastName: '',
                driverPhoneNo: '',
                driverAltNo: '',
                motorBoyFirstName: '',
                motorBoyLastName: '',
                motorBoyNo: '',
                motorBoyAltNo: '',
            },
            statusMessage: '',
            onEdit: false,
            driverId: null
        }
    },
    validations: {
        formData: {
            firstName: {
                required
            },
            driverPhoneNo: {
                required,
                maxLen: maxLength(13),
                numeric
            }
        }
    },
    computed: {
        driverInfo() {
            const driver = this.$store.getters.driverInfo
            if(driver) {
                let driverName = driver.driver.split(' ')
                let motorBoy = driver.motorBoy.split(' ')
                this.formData.firstName = driverName[0]
                this.formData.lastName = driverName[1]
                this.formData.driverPhoneNo = driver.driverPhoneNo,
                this.formData.driverAltNo = driver.driverAltNo
                this.formData.motorBoyFirstName = motorBoy[0]
                this.formData.motorBoyLastName = motorBoy[1]
                this.formData.motorBoyNo = driver.motorBoyNo
                this.formData.motorBoyAltNo = driver.motorBoyAltNo 
                this.onEdit = true
                this.driverId = driver.id
                this.onEdit = true
            }
        }
    },
    methods: {
        addDriver() {
            this.statusMessage = 'Saving...'
            this.$store.dispatch('addDriver', this.formData);
            this.statusMessage = 'Saved'
            this.delayResponse()
        },
        updateDriver() {
            this.statusMessage = 'Updating...'
            this.$store.dispatch('updateDriver', {
                formData: this.formData,
                driverId: this.driverId
            })
            this.statusMessage = 'Updated'
            this.delayResponse()
        },

        delayResponse() {
            const message = document.getElementById('statusMessage')
            setInterval(() => {
                message.style.opacity -= 1 
            }, 3000)
            message.style.opacity += 1
        }

    }
}


</script>