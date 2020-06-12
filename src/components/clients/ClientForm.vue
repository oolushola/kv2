<template>
    <div>
        <section class="row">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <form method="POST" enctype="multipart/form-data">
                           &nbsp;
                             
                            <div class="row mt-3">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="text-primary">Does this client has a parent company?</label>
                                        <span class="d-block">
                                            <input type="radio" 
                                                @blur="$v.formData.hasParentCompany.$touch()" 
                                                v-model="$v.formData.hasParentCompany.$model"
                                                name="parentCompany" value="1"  /> Yes
                                            <input type="radio" 
                                                @blur="$v.formData.hasParentCompany.$touch()" 
                                                v-model="$v.formData.hasParentCompany.$model"
                                                name="parentCompany"  value= "0"  class="ml-4" /> No
                                        </span>
                                        <span class="error" v-if="$v.formData.hasParentCompany.$error">Parent Company Remark is required.</span>
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="formData.hasParentCompany == 1">
                                    <div class="form-group">
                                        <label>Parent Company </label>
                                        <select class="form-control" 
                                            v-model="$v.formData.parentCompany.$model" @blur="$v.formData.parentCompany.$touch()">
                                            <option value="">Choose parent company</option>
                                            <option :value="company.companyName" v-for="(company, index) in clients" :key="index">
                                                {{company.companyName }}
                                            </option>
                                        </select>
                                    </div>
                                    <span v-if="$v.formData.parentCompany.$error" class="error">Parent Company is required.</span>
                                </div>

                                <div class="col-md-6 font-weight-bold">
                                    <div class="form-group">
                                        <label>Client Name </label>
                                        <input type="text" class="form-control" 
                                            v-model="$v.formData.companyName.$model"
                                            :class="{'notificationLabel animated shake': $v.formData.companyName.$error }"
                                            @blur="$v.formData.companyName.$touch()" />
                                    </div>
                                    <span class="error" v-if="$v.formData.companyName.$error">Client name is required</span>
                                </div>
                                 <div class="col-md-6 font-weight-bold">
                                    <div class="form-group">
                                        <label>Person of Contact </label>
                                        <input type="text" class="form-control" 
                                            v-model="$v.formData.personOfContact.$model"
                                            @blur="$v.formData.personOfContact.$touch()"
                                            :class="{'notificationLabel animated shake': $v.formData.personOfContact.$error }" />
                                    </div>
                                    <span class="error" v-if="$v.formData.personOfContact.$error">Person of contact is required</span>
                                </div>
                                <div class="col-md-6 font-weight-bold">
                                    <div class="form-group">
                                        <label>Phone Number </label>
                                        <input type="text" class="form-control" 
                                            v-model.lazy="$v.formData.phoneNo.$model"
                                            @blur="$v.formData.phoneNo.$touch()"
                                            :class="{'notificationLabel animated shake' : $v.formData.phoneNo.$error}"  />
                                    </div>
                                    <span class="error" v-if="$v.formData.phoneNo.$error">Phone number is required</span>
                                    <span class="error" v-if="!$v.formData.phoneNo.numeric">Only numberical values are allowed.</span>
                                    <span class="error" v-if="!$v.formData.phoneNo.minLen">
                                        Minimum character allowed is {{ $v.formData.phoneNo.$params.minLen.min }}
                                    </span>
                                    <span class="error" v-if="!$v.formData.phoneNo.maxLen">
                                        Maximum character allowed is {{ $v.formData.phoneNo.$params.maxLen.max }}
                                    </span>
                                </div>
                                <div class="col-md-6 font-weight-bold">
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input type="text" class="form-control" 
                                            v-model.lazy.trim="$v.formData.email.$model"
                                            :class="{'notificationLabel animated shake': $v.formData.email.$error }"
                                            @blur="$v.formData.email.$touch()" />
                                    </div>
                                    <span v-if="$v.formData.email.$error" class="error">Email is required.</span>
                                    <span v-if="!$v.formData.email.email" class="error">Only valid email is allowed.</span>
                                </div>
                                <legend class="font-weight-semibold"><i class="icon-people mr-2"></i> Other Information</legend>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Country </label>
                                        <select class="form-control" 
                                            v-model.lazy.trim="$v.formData.country.$model"
                                             @change="fetchState(formData.country.countryId)"
                                             @blur="$v.formData.country.$touch()"
                                             :class="{'notificationLabel animated shake': $v.formData.country.$error }"
                                             >
                                            <option value="">Choose Country</option>
                                            <option v-for="(country, index) in countries" :key="index" :value="country"
                                                >{{ country.country }}</option>
                                        </select>
                                        <span class="error" v-if="$v.formData.country.$error">Country is required.</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>State / Province </label>
                                        <select class="form-control" 
                                            v-model.lazy.trim="$v.formData.state.$model"
                                            @blur="$v.formData.state.$touch()"
                                            :class="{ 'notificationLabel animated shake': $v.formData.state.$error }"
                                            >
                                            <option value=''>Choose State</option>
                                            <option v-for="(state, index) in states" :value="state" :key="index">{{ state.state }}</option>
                                        </select>
                                        <span class="error" v-if="$v.formData.state.$error">State is required.</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Address</label>
                                        <textarea class="form-control" 
                                            v-model="$v.formData.address.$model" rows="2"
                                            :class="{'notificationLabel animated shake': $v.formData.address.$error}"
                                            @blur="$v.formData.address.$touch()"
                                            ></textarea>
                                    </div>
                                    <span class="error" v-if="$v.formData.address.$error">Address is required.</span>
                                </div>
                                <div class="col-md-6"> 
                                    <div class="form-group">
                                        <label>Client Logo</label>
                                        <input type="file" ref="logo" @input="pickLogo" accept="image/png, image/jpeg, image/jpg" v-if="!onEdit"  />
                                        <input type="file" ref="logo" @input="pickLogo" accept="image/png, image/jpeg, image/jpg" v-else :disabled="!changeImage"  />
                                        <span class="font-size-sm text-primary actionCursor" v-if="onEdit" @click="changeImage = !changeImage">Change Logo</span>
                                        <!--<div class="imagePreview" :style="{'background-image': `url(${previewLogo})`}" ></div> -->
                                    </div>
                                </div>

                            </div>
                            
                            <div class="text-right">
                                <span ref="loader" class="error"></span>    
                                <button type="submit" v-if="!onEdit" ref="saveClient" @click.prevent="addClient" class="btn btn-primary" :disabled="$v.$invalid">Add Client<i class="icon-paperplane ml-2"></i></button>

                                <button type="submit" v-else @click.prevent="updateClient" class="btn btn-primary">Update Client<i class="icon-paperplane ml-2" ></i></button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                {{ clientDetails }}
                <div>
                    <table class="table table-bordered" v-if="formData.companyName">
                        <tbody>
                            <tr v-if="formData.companyName">
                                <td class="font-weight-bold" colspan="2">Basic Information</td>
                            </tr>
                            <tr v-if="formData.companyName">
                                <td style="border-right:none">
                                    <h4 class="text-danger">{{ formData.parentCompany }}</h4>
                                    <h6 class="text-primary">{{ formData.companyName }}</h6>
                                    <span>{{ formData.personOfContact }}</span>
                                    <span>{{ formData.phoneNo }}</span>
                                    <span>{{ formData.email }}</span>
                                </td>
                                <td style="border-left:none">
                                    <div style="height:100px; width:100px; border-radius:100%; float:right; background-size:contain;" :style="{'background-image': `url(${previewLogo})`}" v-if="!onEdit"></div>

                                    <div style="height:100px; width:100px; border-radius:100%; float:right; background-size:contain;" :style="{'background-image': `url(${logoPath})`}" v-else></div>
                                </td>
                            </tr>
                            <tr v-if="formData.country">
                                <td class="font-weight-bold" colspan="2">Other Information</td> 
                            </tr>
                            <tr v-if="formData.country">
                                <td colspan="2">
                                    <span v-if="formData.country">Country: {{ formData.country.country }}</span>
                                    <h6 class="text-primary">State: {{ formData.state.state }}</h6>
                                     <span class="d-block">{{ formData.address }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { required, numeric, minLength, maxLength, alpha, email, requiredUnless } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {   
    data() {
        return {
            formData: {
                hasParentCompany: '',
                parentCompany: '',
                companyName: '',
                personOfContact: '',
                phoneNo: '',
                email: '',
                country: '',
                state: '',
                address: '',
                logo: '',
            },
            previewLogo:null,
            onEdit: false,
            clientId: null,
            changeImage: false,
            logoPath: ''
        }
    },


    computed: {
        ...mapGetters({
            clients : 'clientListings',
            countries: 'countries',
            states: 'clientStateListings'
        }),
        clientDetails() {
            const record = this.$store.getters.clientDetails
            if(record) {
                Object.assign(this.formData, record)
                const choosenCountry = this.countries.find(country => country.country === record.country)
                this.formData.country = choosenCountry
                axios.get(`/country-states/${this.formData.country.countryId}`)
                .then(response => {
                    return Object.assign(this.states, response.data.states)
                })
                .catch(error => { return error })
                 let choosenState = this.states.find(state => state.state === record.state)
                this.formData.state = choosenState
                this.onEdit = true
                this.clientId = record.id
                this.logoPath = axios.defaults.baseURL+'/'+record.logo

            }
        },
    },

    validations: {
        formData: {
            hasParentCompany: { required },
            parentCompany: { required: requiredUnless(this.hasParentCompany == 1) },
            companyName: { required,  },
            personOfContact: { required },
            phoneNo: { numeric, required, minLen: minLength(11), maxLen: maxLength(13)  },
            email: { required, email },
            country: { required },
            state: { required },
            address: { required },
        }
    },

    methods: {
        addClient() {
            this.$refs.loader.innerHTML = 'Please wait, saving...' 
            this.$store.dispatch('newClient', this.formData)
            this.$refs.loader.innerHTML = 'Saved.'
        },

        updateClient() {
            this.$refs.loader.innerHTML = 'Please wait, updating...'
            this.$store.dispatch('updateClient', {
                formData: this.formData,
                clientId: this.clientId,
                imageChecker: this.changeImage
            })
            this.$refs.loader.innerHTML = 'Updated. Please reload your browser to see full changes'
            Object.assign(this.formData,  {})
            this.formData.parentCompany = ''
            this.formData.country = ''
            this.formData.state = ''
            this.onEdit = false
        },

        fetchState(country) {
            this.$store.dispatch('fetchStates', country)
        },

        pickLogo() {
            let input = this.$refs.logo
            let file = input.files;
            if(file && file[0]) {
                let reader = new FileReader
                reader.onload = event => {
                    this.previewLogo = event.target.result
                }
                reader.readAsDataURL(file[0]);
                this.formData.logo = file[0];
            }
        }
    },

    watch: {
        '$route' : function() {
            if(this.$route.params.id) {
            this.$store.dispatch('fetchClient', this.$route.params.id)
            this.onEdit = true
            }
        }
    },

    created() {
        this.$store.dispatch('clients')
    },
    mounted() {
         if(this.$route.params.id) {
            this.$store.dispatch('fetchClient', this.$route.params.id)
            this.onEdit = true
        }
    }
}

</script>

<style scoped>
     .imagePreview {
        width: 50px; 
        height: 50px; 
        float:right; 
        position:relative; 
        top:-30px; 
        left:40px; 
        background-size:contain
    }
    input, select, textarea {
        border-radius:15px
    }
    input[type="file"] {
        font-size: 10px;
        border-radius: 0px;
    }
</style>