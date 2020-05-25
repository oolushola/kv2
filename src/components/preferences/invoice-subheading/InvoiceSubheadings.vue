<template>
    <div>
        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                    <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Home - Preference</span> - Invoice Subheading</h4>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <router-view></router-view>
            </div>

            <div class="col-md-5">
                &nbsp;
                <app-invoice-subheading-form></app-invoice-subheading-form>
            </div>
            <div class="col-md-7">
                &nbsp;
                <table class="table table-bordered">
                    <thead class="table-success font-weight-bold">
                        <tr>
                            <td class="text-center">SN</td>
                            <td>Client Name</td>
                            <td>Alternate - S.O.</td> 
                            <td>Alternate - Invoice No.</td>         
                            <td class="text-center">Edit</td>
                            <td class="text-center">Delete</td>
                        </tr>
                    </thead>
                    <tbody style="font-size:11px;">
                        <app-invoice-subheading></app-invoice-subheading>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import InvoiceSubheading from './InvoiceSubheading.vue'
import invoiceSubheadingForm from './InvoiceSubheadingForm.vue'

export default {
    data() {
        return {
            routeChecker: false
        }
    },

    components: {
        appInvoiceSubheadingForm: invoiceSubheadingForm,
        appInvoiceSubheading:InvoiceSubheading
    },
    created() {
        // this.$store.dispatch('fetchAllLoadingSites')
    }
}
</script>