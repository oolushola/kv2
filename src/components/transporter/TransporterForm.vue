<template>
    <div>
        <section class="row">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <form>
                            &nbsp;
                            <i class="icon-stack toggle" :class="{'text-primary': basicForm, 'text-danger': !basicForm }" @click="toggleForm" title="Upload bulk transporters details"></i>
                            
                            <div v-if="!basicForm">
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Choose a CSV file</label>
                                            <input type="file">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <button class="btn btn-primary mt-3">Upload CSV</button>
                                    </div>
                                </div>                
                            </div>
                            <div v-else> 
                                <ul>
                                    <li class="menus" :class="[selected === tabs.tabName ? 'selectedClass' : '']" :href="`#${tabs.id}`"  v-for="(tabs, index) in menuTabs" @click="showTab(tabs.tabName)" :key="index">{{ tabs.tabName }}</li>
                                </ul>

                                <div class="row mt-3" id="basicInformation" :class="{'show': selected === 'Basic Information', 'hidden': selected !== 'Basic Information' }">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Assigned Staff</label>
                                            <select class="form-control" 
                                                v-model.number="$v.formData.assignedStaff.$model" 
                                                @blur="$v.formData.assignedStaff.$touch()"
                                                :class="{'notificationLabel animated shake': $v.formData.assignedStaff.$error }"
                                            >
                                                <option value="">Choose a client</option>
                                                <option v-for="(staff, index) in staffs" :key="index" :value="staff">
                                                    {{ staff.firstName }} {{ staff.lastName }}
                                                </option>
                                            </select>
                                            <p v-if="$v.formData.assignedStaff.$error" class="error">Assigned Staff is required.</p>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Transporter Name</label>
                                            <input type="text" class="form-control" 
                                                v-model.lazy="$v.formData.transporterName.$model" 
                                                @blur="$v.formData.transporterName.$touch()"
                                                :class="{'notificationLabel animated shake ': $v.formData.transporterName.$error}"  />
                                            <span class="error" v-if="!$v.formData.transporterName.required">Transporter name is required.</span>
                                        </div>
                                    </div>

                                    <div class="col-md-6 font-weight-bold">
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="text" class="form-control" 
                                                v-model.trim.lazy="$v.formData.email.$model" 
                                                :class="{'notificationLabel animated shake' : $v.formData.email.$error }" 
                                                @blur="$v.formData.email.$touch()"   />
                                            <p class="error" v-if="!$v.formData.email.required">Email is required.</p>
                                            <p class="error" v-if="!$v.formData.email.email">Only valid email is required.</p>
                                        </div>
                                    </div>

                                    <div class="col-md-6 font-weight-bold">
                                        <div class="form-group">
                                            <label>Phone Number</label>
                                            <input type="text" class="form-control" v-model.lazy.trim="$v.formData.phoneNo.$model" @blur="$v.formData.phoneNo.$touch()" :class="{'notificationLabel animated shake': $v.formData.phoneNo.$error }"  />
                                        
                                            <p class="error" v-if="!$v.formData.phoneNo.numeric">Only numbers are allowed.</p>
                                            <p class="error" v-if="!$v.formData.phoneNo.required">Phone No. is required.</p>
                                            <p class="error" v-if="!$v.formData.phoneNo.minLen">
                                                Minimum number of characters allowed is {{ $v.formData.phoneNo.$params.minLen.min }}
                                            </p>
                                            <p class="error" v-if="!$v.formData.phoneNo.maxLen">
                                                maximum number of characters allowed is {{ $v.formData.phoneNo.$params.maxLen.max }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="col-md-6 font-weight-bold">
                                        <div class="form-group">
                                            <label>Alternative Phone Number</label>
                                            <input type="text" class="form-control" 
                                                v-model.lazy.trim="$v.formData.altPhoneNo.$model" 
                                                @blur="$v.formData.altPhoneNo.$touch()" 
                                                :class="{'notificationLabel animated shake' : $v.formData.altPhoneNo.$error }"  />
                                            <p class="error" v-if="!$v.formData.altPhoneNo.numeric">Only numbers are allowed.</p>
                                             <p class="error" v-if="!$v.formData.altPhoneNo.minLen">
                                                Minimum number of characters allowed is {{ $v.formData.altPhoneNo.$params.minLen.min }}
                                            </p>
                                            <p class="error" v-if="!$v.formData.altPhoneNo.maxLen">
                                                maximum number of characters allowed is {{ $v.formData.altPhoneNo.$params.maxLen.max }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="col-md-12 font-weight-bold">
                                        <div class="form-group">
                                            <label>Address</label>
                                            <textarea class="form-control" v-model.lazy="$v.formData.address.$model" @blur="$v.formData.address.$touch()" :class="{'notificationLabel animated shake': $v.formData.address.$error}"></textarea>
                                            <p class="error" v-if="!$v.formData.address.required">Address is required</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row mt-3" id="bankDetails" :class="{'show': selected === 'Bank Details', 'hidden' :selected !=='Bank Details' }">

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Account Type</label>
                                            <span class="d-block">
                                                <input type="radio" value="Savings Account" v-model="formData.accountType" name="accountType" /> Savings 
                                                <input type="radio" value="Current Account" v-model="formData.accountType" name="accountType" class="ml-4" /> Current 
                                            </span>
                                            <p v-if="$v.formData.accountType.$error" class="error">Account type is required.</p>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Bank Name</label>
                                            <input type="text" class="form-control" v-model.lazy="$v.formData.bankName.$model" @blur="$v.formData.bankName.$touch()" :class="{'notificationLabel animated shake': $v.formData.bankName.$error }" />
                                            <p v-if="!$v.formData.bankName.required" class="error">Bank name is required</p>
                                        </div>
                                    </div>

                                    <div class="col-md-6 font-weight-bold">
                                        <div class="form-group">
                                            <label>Account Name</label>
                                        <input type="text" class="form-control" v-model.lazy="$v.formData.accountName.$model" @blur="$v.formData.accountName.$touch()" :class="{'animated shake notificationLabel' : $v.formData.accountName.$error }"  />
                                        <p v-if="!$v.formData.accountName.required" class="error">Account name is required</p>
                                        </div>
                                    </div>

                                    <div class="col-md-6 font-weight-bold">
                                        <div class="form-group">
                                            <label>Account No</label>
                                            <input type="text" class="form-control" v-model.trim.number.lazy="formData.accountNo"  @blur="$v.formData.accountNo.$touch()" v-model.lazy.trim="$v.formData.accountNo.$model" :class="{'notificationLabel animated shake': $v.formData.accountNo.$error }" />
                                            <p class="error" v-if="!$v.formData.accountNo.required">Account No. is required.</p>
                                            <p class="error" v-if="!$v.formData.accountNo.numeric">Only numbers are allowed.</p>
                                            <p class="error" v-if="!$v.formData.accountNo.minLen">
                                                Minimum number of characters allowed is {{ $v.formData.accountNo.$params.minLen.min }}
                                            </p>
                                            <p class="error" v-if="!$v.formData.accountNo.maxLen">
                                                Maximum number of characters allowed is {{ $v.formData.accountNo.$params.maxLen.max }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-3" id="guarantor" :class="{'show': selected === 'Guarantor', 'hidden' :selected !=='Guarantor' }">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Full Name</label>
                                            <input type="text" class="form-control" placeholder="Optional" v-model.lazy="formData.guarantor"  />
                                            
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Guarantor Phone No.</label>
                                            <input type="text" class="form-control" placeholder="Optional" v-model.lazy="$v.formData.guarantorPhoneNo.$model"  :class="{'notificationLabel animated shake' : $v.formData.guarantorPhoneNo.$error }" @blur="$v.formData.guarantorPhoneNo.$touch()"  />
                                            <p v-if="!$v.formData.guarantorPhoneNo.numeric" class="error">Only numbers are allowed.</p>
                                            <p v-if="!$v.formData.guarantorPhoneNo.minLen" class="error">
                                                Minimum phone numbers allowed is {{ $v.formData.guarantorPhoneNo.$params.minLen.min }}
                                            </p>
                                            <p v-if="!$v.formData.guarantorPhoneNo.maxLen" class="error">
                                                Maximum phone numbers allowed is {{ $v.formData.guarantorPhoneNo.$params.maxLen.max }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Alternate Phone No.</label>
                                            <input type="text" class="form-control" placeholder="Optional" 
                                                v-model.lazy="$v.formData.gurantorAltPhoneNo.$model"  
                                                :class="{'notificationLabel animated shake' : $v.formData.gurantorAltPhoneNo.$error }" @blur="$v.formData.gurantorAltPhoneNo.$touch()"  />
                                            <p v-if="!$v.formData.gurantorAltPhoneNo.numeric" class="error">Only numbers are allowed.</p>
                                            <p v-if="!$v.formData.gurantorAltPhoneNo.minLen" class="error">
                                                Minimum phone numbers allowed is {{ $v.formData.gurantorAltPhoneNo.$params.minLen.min }}
                                            </p>
                                            <p v-if="!$v.formData.gurantorAltPhoneNo.maxLen" class="error">
                                                Maximum phone numbers allowed is {{ $v.formData.gurantorAltPhoneNo.$params.maxLen.max }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="col-md-6 font-weight-bold">
                                        <div class="form-group">
                                            <label>Address</label>
                                            <input type="text" class="form-control" placeholder="Optional" v-model="formData.guarantorAddress"  />
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-3" id ="nextOfKin" :class="{'show': selected === 'Next of Kin', 'hidden' :selected !=='Next of Kin' }">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Full Name</label>
                                            <input type="text" class="form-control" v-model.lazy="formData.nextOfKin" />
                                        </div>
                                    </div>

                                    <div class="col-md-6 font-weight-bold">
                                        <div class="form-group">
                                            <label>Phone No.</label>
                                            <input type="text" class="form-control"
                                                v-model="$v.formData.nokPhoneNo.$model"
                                                @blur="$v.formData.nokPhoneNo.$touch()"
                                                :class="{'notificationLabel animated shake': $v.formData.nokPhoneNo.$error }"  />
                                                
                                            <p v-if="!$v.formData.nokPhoneNo.numeric" class="error">Only numbers are allowed.</p>
                                            <p v-if="!$v.formData.nokPhoneNo.minLen" class="error">
                                                Minimum phone numbers allowed is {{ $v.formData.nokPhoneNo.$params.minLen.min }}
                                            </p>
                                            <p v-if="!$v.formData.nokPhoneNo.maxLen" class="error">
                                                Maximum phone numbers allowed is {{ $v.formData.nokPhoneNo.$params.maxLen.max }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="col-md-6 font-weight-bold">
                                        <div class="form-group">
                                            <label>Phone No.</label>
                                            <input type="text" class="form-control"
                                                v-model="$v.formData.nokAltPhoneNo.$model"
                                                @blur="$v.formData.nokAltPhoneNo.$touch()"
                                                :class="{'notificationLabel animated shake': $v.formData.nokAltPhoneNo.$error }"  />
                                                
                                            <p v-if="!$v.formData.nokAltPhoneNo.numeric" class="error">Only numbers are allowed.</p>
                                            <p v-if="!$v.formData.nokAltPhoneNo.minLen" class="error">
                                                Minimum phone numbers allowed is {{ $v.formData.nokAltPhoneNo.$params.minLen.min }}
                                            </p>
                                            <p v-if="!$v.formData.nokAltPhoneNo.maxLen" class="error">
                                                Maximum phone numbers allowed is {{ $v.formData.nokAltPhoneNo.$params.maxLen.max }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="col-md-6 font-weight-bold">
                                        <div class="form-group">
                                            <label>Relationship.</label>
                                            <input type="text" class="form-control" 
                                                v-model="$v.formData.relationshipWithNok.$model"
                                                :class="{'notificationLabel animated shake': $v.formData.relationshipWithNok.$error}"
                                                @blur="$v.formData.relationshipWithNok.$touch()"  />
                                                <p v-if="!$v.formData.relationshipWithNok.alpha" class="error">Only alphabeths are allowed.</p>
                                        </div>
                                    </div>
                                    <div class="col-md-12 font-weight-bold">
                                        <div class="form-group">
                                            <label>Address</label>
                                            <textarea class="form-control" v-model="formData.nokAddress"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <legend class="font-weight-semibold"><i class="icon-stack mr-2"></i>Document Uploads</legend>
                                <div id="moreDocuments">
                                    <p style="font-size:10px; cursor:pointer" @click="addmore" class="text-danger-400">Add More Documents</p>
                                    <div class="form-group row" v-for="(document, index) in documents" :key="index">
                                        <input type="file" name="document[]" class="col-md-5" style="font-size:10px; top:5px;">

                                        <input type="text" name="description[]" placeholder="Description" 
                                            v-model.lazy="$v.documents.$each[index].value.$model"
                                            @blur="$v.documents.$each[index].$touch()"
                                            :class="{ 'notificationLabel animated shake':$v.documents.$each[index].$error }" />
                                         <span class="icon-x mt-1 text-danger" @click="removeDocument(index)" v-if="index > 0"></span>
                                        <span v-if="!$v.documents.$each[index].value.alpha" class="error"> - Only alphabeths are allowed.</span>

                                    </div>
                                    
                                </div>

                                <div class="text-right">
                                    <span ref="loader" class="error"></span>    
                                        <button type="submit" class="btn btn-primary" :disabled="$v.$invalid" @click.prevent="addTransporter" v-if="!onEdit">Add Transporter<i class="icon-paperplane ml-2" ></i></button>

                                        <button type="submit" class="btn btn-primary" @click.prevent="updateTransporter" v-else>Update Transporter<i class="icon-paperplane ml-2" ></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <div>
                    <table class="table table-bordered" v-if="formData.assignedStaff">
                        <tbody>
                            <tr v-if="formData.assignedStaff">
                                <td class="font-weight-bold" colspan="2">Basic Information</td>
                            </tr>
                            <tr v-if="formData.assignedStaff">
                                <td>
                                    <h6 class="text-primary">{{ formData.transporterName }}</h6>
                                    <span>{{ formData.email }}</span>
                                </td>
                                <td>
                                    <span class="d-block">{{ formData.phoneNo}}</span>
                                    <span class="d-block">{{ formData.altPhoneNo}}</span>
                                    <span class="d-block text-danger">{{ formData.address }}</span>
                                </td>
                            </tr>
                            <tr v-if="formData.accountType">
                                <td class="font-weight-bold" colspan="2">Bank Details</td> 
                            </tr>
                            <tr v-if="formData.accountType">
                                <td>
                                    <span v-if="formData.accountType">Account Type: {{ formData.accountType }}</span>
                                    <h6 class="text-primary">{{ formData.accountNo }}</h6>
                                </td>
                                <td>
                                    <span class="d-block">{{ formData.accountName }}</span>
                                    <span class="d-block text-danger">{{ formData.bankName }}</span>
                                </td>
                            </tr>
                            
                            <tr v-if="formData.guarantor">
                                <td class="font-weight-bold" colspan="2">Guarantor</td> 
                            </tr>
                            <tr v-if="formData.guarantor">
                                <td>
                                    <h6 class="text-primary">{{ formData.guarantor }}</h6>
                                    <span class="d-block text-danger">{{ formData.guarantorAddress }}</span>
                                </td>
                                <td>
                                    <span class="d-block">{{ formData.guarantorPhoneNo }} </span>
                                    <span class="d-block">{{ formData.gurantorAltPhoneNo }}</span>
                                </td>
                            </tr>
                            <tr v-if="formData.nextOfKin"> 
                                <td class="font-weight-bold" colspan="2">Next of Kin</td>         
                            </tr>
                            <tr v-if="formData.nextOfKin">
                                <td>
                                    <h6 class="text-primary">{{ formData.nextOfKin }}</h6>
                                    <span v-if="formData.relationshipWithNok">Relationship: {{ formData.relationshipWithNok }}</span>
                                </td>
                                <td>
                                    <span class="d-block">{{ formData.nokPhoneNo }} </span>
                                    <span class="d-block">{{ formData.nokAltPhoneNo }}</span>
                                    <span class="d-block text-danger">{{ formData.nokAddress }}</span>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            {{ transporterDetails }}
        </section>
    </div>
</template>

<script>
import { required, numeric, minLength, maxLength, alpha, email, alphaNum } from 'vuelidate/lib/validators'
export default {   
    data() {
        return {
            menuTabs: [
                { tabName: 'Basic Information', id: 'basicInformation', },
                { tabName: 'Bank Details', id: 'bankDetails' },
                { tabName: 'Guarantor', id: 'gurantor' },
                { tabName: 'Next of Kin', id: 'nextOfKin' },
            ],
            selected: 'Basic Information',
            basicForm: true,
            documents: [{id:1, value: ''}],
            formData: {
                assignedStaff: '',
                transporterName: '',
                email: '',
                phoneNo: '',
                altPhoneNo: '',
                address: '',
                bankName: '',
                accountName: '',
                accountType: '',
                accountNo: '',
                guarantor: '',
                guarantorPhoneNo: '',
                gurantorAltPhoneNo: '',
                guarantorAddress: '',
                nextOfKin: '',
                nokPhoneNo: '',
                nokAltPhoneNo: '',
                relationshipWithNok: '',
                nokAddress: ''
            },
            onEdit: false,
            transporterId: null
        }
    },

    validations: {
        formData: {
            assignedStaff: { required },
            transporterName: { required },
            email: { required,  email },
            phoneNo: { required, minLen: minLength(11), maxLen: maxLength(13), numeric },
            altPhoneNo: { minLen: minLength(11), maxLen: maxLength(13), numeric },
            address: { required },
            accountType: { required  },
            bankName: { required },
            accountName: { required },
            accountNo: { required, numeric, minLen: minLength(10), maxLen: maxLength(10) },
            guarantorPhoneNo: { numeric, minLen: minLength(11), maxLen: maxLength(13) },
            gurantorAltPhoneNo: { numeric, minLen: minLength(11), maxLen: maxLength(13) },
            nokPhoneNo: { numeric, minLen: minLength(11), maxLen: maxLength(13) },
            nokAltPhoneNo: { numeric, minLen: minLength(11), maxLen: maxLength(13) },
            relationshipWithNok: { alpha },
        },
        documents: {
            $each: {
                value: {
                    alpha
                }
            }
        }
    },

    computed: {
        staffs() {
            return this.$store.getters.staffs
        },

        transporterDetails() {
            const record = this.$store.getters.transporter;
            if(record) {
                const staff = this.staffs.find(element => element.userId === record.userId)
                
                this.formData.assignedStaff = staff,
                this.formData.transporterName = record.transporter,
                this.formData.email = record.email
                this.formData.phoneNo = record.phoneNumber
                this.formData.altPhoneNo = record.phoneNumberTwo
                this.formData.address = record.address
                this.formData.bankName = record.bankName
                this.formData.accountName = record.accountName
                this.formData.accountType = record.accountType
                this.formData.accountNo = record.accountNo
                this.formData.guarantor = record.guarantor
                this.formData.guarantorPhoneNo = record.guarantorPhoneNo,
                this.formData.gurantorAltPhoneNo = record.guarantorPhoneNoTwo,
                this.formData.guarantorAddress = record.guarantorAddress
                this.formData.nextOfKin = record.nextOfKin
                this.formData.nokPhoneNo = record.nokPhoneNo
                this.formData.nokAltPhoneNo = record.nokPhoneNoTwo,
                this.formData.relationshipWithNok = record.relationship,
                this.formData.nokAddress = record.nokAddress
                this.transporterId = record.id

            }
            
        }
        
    },

    methods: {
        showTab(particularCell) {
            for(let i=0; i < this.menuTabs.length;  i++) {
                if(particularCell === this.menuTabs[i].tabName) {
                    this.selected = particularCell
                }
            }
        },
        toggleForm() {
            this.basicForm = !this.basicForm
        },

        addmore() {
            const count = this.documents.length + 1
            this.documents.push({ id: count, value:''});
        },

        removeDocument(index) {
            this.documents.splice(index, 1);
        },

        addTransporter() {
            this.$refs.loader.innerHTML = 'Saving...'
            this.$store.dispatch('addTransporter', this.formData);
            this.$refs.loader.innerHTML = 'Saved Successfully'
            this.formData = {};
            this.formData.assignedStaff = ''
        },

        updateTransporter() {
            this.$v.$touch();
            if(this.$v.$invalid) {
                this.$refs.loader.innerHTML = '<i class="icon-x"></i>One or more error is preventing the update. Please check again'
                return false
            }
            else {
                this.$refs.loader.innerHTML = 'Updating, Please wait...'
                this.$store.dispatch('updateTransporter', {
                    formData: this.formData,
                    transporterId: this.transporterId
                })
                this.$refs.loader.innerHTML = '<i class="icon-checkmark2"></i> Updated'
            }
        }
    },

    watch: {
        '$route' : function() {
           if(this.$route.params.id) {
            this.$store.dispatch('transporterDetails', this.$route.params.id)
            this.onEdit = true
           } 
        }
    },

    created() {
        this.$store.dispatch('fetchTransporters')
        if(this.$route.params.id) {
            this.$store.dispatch('transporterDetails', this.$route.params.id)
            this.onEdit = true
        }
    },
}

</script>

<style scoped>
    ul {
        margin:0;
        padding: 0;
    }

    ul > li {
        font-size:13px;
        font-family: DIN Alternate;
        list-style-type: none;
        display: inline-block;
        cursor: pointer;
        padding:5px;
        margin:5px auto
    }
    ul > li:hover {
        border-bottom: 1px solid #ccc; 
        padding:6px;
    }
    .selectedClass {
        border-bottom: 3px solid #ccc; 
        font-size: 16px;
        color:red;  
    }
    .toggle {
        cursor: pointer;
    }

</style>