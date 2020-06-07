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
                                            <span class="error" v-if="!$v.formData.transporterName.alpha">Only alphabeths are allowed.</span>
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
                                            <input type="text" class="form-control" v-model.trim.number="formData.accountNo"  @blur="$v.formData.accountNo.$touch()" v-model.lazy.trim="$v.formData.accountNo.$model" :class="{'notificationLabel animated shake': $v.formData.accountNo.$error }" />
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
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Full Name</label>
                                            <select class="form-control">
                                                <option value="">Choose a client</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Guarantor Phone No.</label>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 font-weight-bold">
                                        <div class="form-group">
                                            <label>Address.</label>
                                        <input type="text" class="form-control"  />
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-3" id ="nextOfKin" :class="{'show': selected === 'Next of Kin', 'hidden' :selected !=='Next of Kin' }">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Full Name</label>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 font-weight-bold">
                                        <div class="form-group">
                                            <label>Phone No.</label>
                                        <input type="text" class="form-control"  />
                                        </div>
                                    </div>
                                    <div class="col-md-6 font-weight-bold">
                                        <div class="form-group">
                                            <label>Relationship.</label>
                                        <input type="text" class="form-control"  />
                                        </div>
                                    </div>
                                    <div class="col-md-12 font-weight-bold">
                                        <div class="form-group">
                                            <label>Address</label>
                                            <textarea class="form-control"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <legend class="font-weight-semibold"><i class="icon-stack mr-2"></i>Document Uploads</legend>
                                <div id="moreDocuments">
                                    <p style="font-size:10px; cursor:pointer" @click="addmore" class="text-danger-400">Add More Documents</p>
                                    <div class="form-group row" v-for="(document, index) in documents" :key="index">
                                        <input type="file" name="document[]" class="col-md-5" style="font-size:10px; top:5px;">
                                        <input type="text" name="description[]" class="" placeholder="Description" v-model.trim="document.value">
                                         <span class="icon-x mt-1 text-danger" @click="removeDocument(index)" v-if="index>0"></span>
                                    </div>
                                </div>

                                <div class="text-right">
                                    <span ref="loader"></span>    
                                        <button type="submit" class="btn btn-primary" :disabled="$v.$invalid" >Add Transporter<i class="icon-paperplane ml-2"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <h2>{{ staffs }}</h2>
            </div>
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
                nokAltNo: '',
                relationshipWithNok: '',
                nokAddress: ''
            }
        }
    },

    validations: {
        formData: {
            assignedStaff: {
                required,
            },
            transporterName: {
                required,
                alpha,
                
            },
            email: {
                required,
                email
            },
            phoneNo: {
                required,
                minLen: minLength(11),
                maxLen: maxLength(13),
                numeric
            },
            altPhoneNo: {
                minLen: minLength(11),
                maxLen: maxLength(13),
                numeric
            },
            address: {
                alphaNum,
                required
            },
            accountType: {
                required,
            },
            bankName: {
                required,
            },
            accountName: {
                required,
            },
            accountNo: {
                required,
                numeric,
                minLen: minLength(10),
                maxLen: maxLength(10)
            }
        }
    },

    computed: {
        staffs() {
            return this.$store.getters.staffs
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
        }
    },
    created() {
        this.$store.dispatch('fetchTransporters')
    }
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