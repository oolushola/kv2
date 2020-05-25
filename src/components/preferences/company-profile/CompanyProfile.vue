<template>
    <div>
        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                    <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Home - Preference</span> - Unit Head Targets</h4>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-5">
                &nbsp;
                <app-company-profile-form></app-company-profile-form>
            </div>
            <div class="col-md-7">
                &nbsp;
                <table class="table table-condensed">
                    <thead class="table-success font-weight-bold text-primary">
                        <tr>
                            <td colspan="2">Company Details</td>
                        </tr>
                    </thead>
                    <tbody style="font-size:11px;">
                        <tr>
                            <td class="font-weight-bold">Basic Information</td>
                            <td>
                                <h4>Kaya Africa Technologies</h4>
                                <p>Phone Nos. 2348022440810, 2348022334455</p>
                                <p>Email: info@kayaafrica.co, support@kayaafrica.co </p>
                                <p class="text-primary">Website: https://www.kayaafrica.co  </p>
                            </td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Bank Details</td>
                            <td>
                                <h4>3045490401</h4>
                                <p>Bank Name: Sterling Bank Nigeria Plc.</p>
                                <p>Account Name: Kaya Africa Technology Nigeria Ltd.</p>
                                <p>Tax Identification No: 112311234421341 </p>
                                <hr>
                                <p>Invoice Authorized Signatory: <span class="text-primary">Gbenga Mayowa</span></p>
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
            routeChecker: false
        }
    },
    

    components: {
        appCompanyProfileForm: CompanyProfileForm,
    },
    created() {
        // this.$store.dispatch('fetchAllLoadingSites')
    }
}
</script>