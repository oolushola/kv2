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
                            <input type="text" v-model="companyName" class="form-control" placeholder="Kaya World" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Official Email</label>
                            <input type="text" v-model="companyEmail" class="form-control" placeholder="johndoe@kaya-world.com" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Phone No.</label>
                            <input type="text" v-model="phoneNo1" class="form-control" placeholder="23480********" />
                        </div>
                    </div>
                    <div class="col-md-6 font-weight-bold">
                        <div class="form-group">
                            <label>Phone No. (2)</label>
                           <input type="text" class="form-control" v-model="alternateInvoiceNo" placeholder="Optional" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Website Url</label>
                            <input type="text" v-model="phoneNo1" class="form-control" placeholder="https" />
                        </div>
                    </div>
                    <div class="col-md-6 font-weight-bold">
                        <div class="form-group">
                            <label>Phone No. (2)</label>
                           <input type="text" class="form-control" v-model="alternateInvoiceNo" placeholder="Optional" />
                        </div>
                    </div>
                    <div class="col-md-6 font-weight-bold">
                        <div class="form-group">
                            <label>Company Logo</label>
                           <input type="file" placeholder="Optional" style="font-size:10px" />
                        </div>
                    </div>
                </div>

                <div class="row" :class="{hidden: !showBankDetails}">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Bank Name</label>
                            <input type="text" v-model="companyName" class="form-control" placeholder="Kaya World" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Account Name</label>
                            <input type="text" v-model="companyEmail" class="form-control" placeholder="johndoe@kaya-world.com" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Account No.</label>
                            <input type="text" v-model="phoneNo1" class="form-control" placeholder="23480********" />
                        </div>
                    </div>
                    <div class="col-md-6 font-weight-bold">
                        <div class="form-group">
                            <label>Tax Identification No. (TIN)</label>
                           <input type="text" class="form-control" v-model="alternateInvoiceNo" placeholder="Optional" />
                        </div>
                    </div>
                </div>

                 <div class="row" :class="{hidden: !authorizedSection}">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Authorised Person</label>
                            <select class="form-control" v-model="authorizedPerson">
                                <option value="">Choose Authorized Person</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <span id="loader"></span>    
                        <button type="submit" @click.prevent="addAlternateInvoiceSubheading"  class="btn btn-primary">Save Details<i class="icon-paperplane ml-2"></i></button>
                </div>
            </form>
        </div>
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
</style>

<script>
import { mapGetters } from 'vuex'
export default {   
    props:['regionalState'], 
    data() {
        return {
            alternateSONumber: '',
            alternateInvoiceNo: '',
            clientId: '',
            authorizedPerson: '',
            onEdit: false,
            showBasicInformation: true,
            showBankDetails: false,
            showAuthorizedSignatory: false,
            authorizedSection: false,
        }
    },
    methods: {
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
        addAlternateInvoiceSubheading() {
            
        }
    }
}

</script>