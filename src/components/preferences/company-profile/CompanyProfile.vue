<template>
    <div>
        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                    <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Home - Preference</span> - Company Profile</h4>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-5">
                &nbsp;
                <app-company-profile-form @companyPreview="result=$event" :onEdit="onEdit"></app-company-profile-form>
            </div>
            <div class="col-md-7">
                &nbsp;
                 <table class="table table-condensed" v-if="profile != ''">
                    <thead class="table-success font-weight-bold text-primary">
                        <tr>
                            <td colspan="2">Preview Company Details</td>
                        </tr>
                    </thead>
                    <tbody style="font-size:11px;">
                        <tr>
                            <td class="font-weight-bold">Basic Information</td>
                            <td>
                                <h4 v-if="profile">{{ profile.companyName }}</h4>
                                <p v-if="profile">Phone Nos. {{ profile.phoneNumber }}, {{ profile.phoneNumberTwo }}</p>
                                <p v-if="profile">Email: {{ profile.email }} </p>
                                <p class="text-primary" v-if="profile">Website: {{ profile.website }}</p>
                            </td>
                            <td>
                                <div style="border:1px solid #000; width:50px; height:50px; margin:5px;"  v-if="profile">
                                    <img :src="'http://localhost:8000'+profile.logo" width="50" height="50">
                                   
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Bank Details</td>
                            <td>
                                <h4 v-if="profile">{{ profile.accountNo }}</h4>
                                <p v-if="profile">Bank Name: {{ profile.bankName }}</p>
                                <p v-if="profile">Account Name: {{ profile.accountName }}</p>
                                <p v-if="profile">Tax Identification No: {{ profile.tin }} </p>
                                <hr>
                                <p v-if="profile">Invoice Authorized Signatory: <span class="text-primary">{{ profile.signatory }}</span></p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <button class="btn btn-info" @click="setCompanyProfileDetails">Update Profile</button>
                                <button class="btn btn-danger" @click="deleteCompanyProfile">Delete Profile</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table class="table table-condensed" v-if="result && profile == ''">
                    <thead class="table-success font-weight-bold text-primary">
                        <tr>
                            <td colspan="2">Preview Company Details</td>
                        </tr>
                    </thead>
                    <tbody style="font-size:11px;" v-if="result">
                        <tr>
                            <td class="font-weight-bold">Basic Information</td>
                            <td>
                                <h4>{{ result.companyName }}</h4>
                                <p v-if="result.phoneNo1">Phone Nos. {{ result.phoneNo1 }}, {{ result.phoneNo2 }}</p>
                                <p v-if="result.email">Email: {{ result.email }} </p>
                                <p v-if="result.website" class="text-primary">Website: {{ result.website }}</p>
                                <p v-if="result.address">Address: {{ result.address}}</p>
                            </td>
                        </tr>
                        <tr v-if="result.bankName">
                            <td class="font-weight-bold">Bank Details</td>
                            <td>
                                <h4>{{ result.accountNo }}</h4>
                                <p v-if="result.bankName">Bank Name: {{ result.bankName }}</p>
                                <p v-if="result.accountName">Account Name: {{ result.accountName }}</p>
                                <p v-if="result.tin">Tax Identification No: {{ result.tin }} </p>
                                <hr v-if="result.signatory">
                                <p v-if="result.signatory">Invoice Authorized Signatory: <span class="text-primary">{{ result.signatory }}</span></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<style scoped>
    td > h4 {
        font-family: DIN Alternate;
        color:darkgoldenrod;
        padding:0;
        margin: 0;
    }
    p {
        font-family: DIN Alternate;
        padding:0px;
        margin: 0;
        font-size:11px;
        line-height: 20px;
    }
</style>

<script>
import CompanyProfileForm from './CompanyProfileForm.vue'

export default {
    data() {
        return {
            routeChecker: false,
            result: null,
            onEdit: false
            
        }
    },
    
    computed: {
        profile() {
            return this.$store.getters.showCompanyProfile
        },
    },

    methods: {
        setCompanyProfileDetails() {
            this.onEdit = true
        },

        deleteCompanyProfile() {
            const companyProfileId = this.$store.getters.showCompanyProfile.id
            this.$store.dispatch('deleteCompanyProfile', companyProfileId)
        }
     },

    components: {
        appCompanyProfileForm: CompanyProfileForm,
    },
    created() {
         this.$store.dispatch('companyProfile')
    }
}
</script>