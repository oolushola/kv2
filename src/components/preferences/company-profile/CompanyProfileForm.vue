<template>
    <div class="card">
        <div class="card-body">
            <form>
                <div class="row">
                    <ul>
                        <li @click="basicInformation">Basic Information</li>
                        <li @click="bankDetails">Bank Details</li>
                        <li @click="authorizedSignatory">Authorized Signatory</li>
                    </ul>
                </div>
                &nbsp;
                <div class="row" :class="{hidden: !showBasicInformation}">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Company Name</label>
                            <input type="text" v-model="formData.companyName" class="form-control" placeholder="Kaya World" @input="showPreview" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Official Email</label>
                            <input type="text" v-model="formData.email" class="form-control" placeholder="johndoe@kaya-world.com" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Phone No.</label>
                            <input type="text" v-model="formData.phoneNo1" class="form-control" placeholder="23480********" />
                        </div>
                    </div>
                    <div class="col-md-6 font-weight-bold">
                        <div class="form-group">
                            <label>Phone No. (2)</label>
                           <input type="text" class="form-control" v-model="formData.phoneNo2" placeholder="Optional" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Website Url</label>
                            <input type="text" v-model="formData.website" class="form-control" placeholder="https://www.kaya-world.com" />
                        </div>
                    </div>
                    <div class="col-md-6 font-weight-bold">
                        <div class="form-group">
                            <label>Address</label>
                           <textarea class="form-control" v-model="formData.address" placeholder="Optional"></textarea>
                        </div>
                    </div>
                    <div class="col-md-6 font-weight-bold">
                        <div class="form-group">
                            <label>Company Logo</label>
                           <input type="file" name="logo" ref="fileInput" @input="pickFile" placeholder="Optional" style="font-size:10px" />
                           <div class="imagePreview" :style="{'background-image': `url(${previewImage})`}"></div>
                        </div>
                    </div>
                </div>

                <div class="row" :class="{hidden: !showBankDetails}">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Bank Name</label>
                            <input type="text" v-model="formData.bankName" class="form-control" placeholder="Kaya World" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Account Name</label>
                            <input type="text" v-model="formData.accountName" class="form-control" placeholder="johndoe@kaya-world.com" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Account No.</label>
                            <input type="text" v-model="formData.accountNo" class="form-control" placeholder="23480********" />
                        </div>
                    </div>
                    <div class="col-md-6 font-weight-bold">
                        <div class="form-group">
                            <label>Tax Identification No. (TIN)</label>
                           <input type="text" class="form-control" v-model="formData.tin" placeholder="Optional" />
                        </div>
                    </div>
                </div>

                 <div class="row" :class="{hidden: !authorizedSection}">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Authorised Person</label>
                            <select class="form-control" v-model="formData.signatory">
                                <option value="">Choose Authorized Person</option>
                                <option v-for="(user, index) in users" :value="user.firstName+' '+user.lastName" :key="index">
                                    {{ user.firstName }} {{ user.lastName }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Signature</label>
                            <input type="file" ref="signatory" name="signature" @input="pickSignatory" accept="image/jpeg,png,gif,svg">
                            <div class="imagePreview" :style="{'background-image': `url(${previewSignatory})`}"></div>
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <span id="loader"></span>    
                        <button type="submit" 
                            @click.prevent="addCompanyProfile"
                            v-if="!onEdit"  
                            class="btn btn-primary">Save Details
                            <i class="icon-paperplane ml-2"></i>
                        </button>

                        <button type="submit" 
                            @click.prevent="updateCompanyProfile"
                            v-if="onEdit"  
                            class="btn btn-primary">Update Details
                            <i class="icon-paperplane ml-2"></i>
                        </button>
                </div>
            </form>
        </div>
        {{ setCompanyDetails }} 
    </div>
</template>

<style scoped>
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    ul > li {
        font-family: DIN Alternate;
        display: inline-block;
        padding: 10px;
        cursor:pointer;
        background: coral
    }
    .imagePreview {
        width:50px; height: 50px; float:right; position:relative; top:-30px; left:40px; background-size:contain
    }
</style>

<script>

export default {   
    props:['onEdit'], 
    data() {
        return {
            formData: {
                companyName:'',
                email: '',
                phoneNo1: '',
                phoneNo2: '',
                website: '',
                address: '',
                bankName: '',
                accountName: '',
                accountNo: '',
                tin: '',
                signatory: '',
                logo: null,
                signature: null ,
                id:null,
            },
            showBasicInformation: true,
            showBankDetails: false,
            showAuthorizedSignatory: false,
            authorizedSection: false,
            previewImage: null,
            previewSignatory: null,
            id: null
        }
    },

    computed: {
        users() {
            return this.$store.getters.showSignatories
        },
        setCompanyDetails() {
            if(this.onEdit===true) {
                console.log('here');
                const companyDetails = this.$store.getters.showCompanyProfile
                this.formData.companyName = companyDetails.companyName
                this.formData.email = companyDetails.email
                this.formData.phoneNo1 = companyDetails.phoneNumber
                this.formData.phoneNo2 = companyDetails.phoneNumberTwo
                this.formData.website = companyDetails.website
                this.formData.address = companyDetails.address
                this.formData.bankName = companyDetails.bankName
                this.formData.accountName = companyDetails.accountName
                this.formData.accountNo = companyDetails.accountNo
                this.formData.tin = companyDetails.tin
                this.formData.signatory = companyDetails.signatory
                this.formData.id = companyDetails.id
            }
        }
    },

    methods: {
        pickFile() {
            let input = this.$refs.fileInput
            let file = input.files;
            if(file && file[0]) {
                let reader = new FileReader
                reader.onload = event => {
                    this.previewImage = event.target.result
                }
                reader.readAsDataURL(file[0]);
                this.formData.logo = file[0];
            }
        },

        pickSignatory() {
            let input = this.$refs.signatory
            let file = input.files;
            
            if(file && file[0]) {
                let reader = new FileReader
                reader.onload = event => {
                    this.previewSignatory = event.target.result
                }
                reader.readAsDataURL(file[0]);
                this.formData.signature = file[0];
            }
        },

        showPreview() {
            this.$emit('companyPreview', this.formData)
        },

        basicInformation() {
            this.showBankDetails = false
            this.showBasicInformation = true,
            this.authorizedSection = false
        },
        bankDetails() {
            this.showBankDetails = true
            this.showBasicInformation = false,
            this.authorizedSection = false
        },
        authorizedSignatory() {
           this.showBankDetails = false
            this.showBasicInformation = false,
            this.authorizedSection = true
        },

        addCompanyProfile() {
            this.$store.dispatch('addCompanyProfile', this.formData)
        },

        updateCompanyProfile() {            
            this.$store.dispatch('updateCompanyProfile', this.formData)        
        }
    }
}

</script>