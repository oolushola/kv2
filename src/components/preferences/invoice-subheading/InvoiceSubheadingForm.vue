<template>
    <div class="card">
        <div class="card-body">
            <form>
                &nbsp;
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Client Name</label>
                            <select class="form-control" v-model="formData.clientId">
                                <option value="">Choose a client</option>
                                <option v-for="client in clientListings" :value="client.id" :key="client.companyName">{{ client.companyName }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Alternate SO Number</label>
                            <input type="text" v-model="formData.alternateSONumber" class="form-control" />
                        </div>
                    </div>
                    <div class="col-md-6 font-weight-bold">
                        <div class="form-group">
                            <label>Alternate Invoice No.</label>
                           <input type="text" class="form-control" v-model="formData.alternateInvoiceNo" />
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <span ref="loader"></span>    
                        <button  v-if="!onEdit" type="submit" @click.prevent="addAlternateInvoiceSubheading"  class="btn btn-primary" >Save Invoice Subheading<i class="icon-paperplane ml-2"></i></button>

                        <button  v-else type="submit" @click.prevent="updateAlternateInvoiceSubheading"  class="btn btn-primary" >Update Invoice Subheading<i class="icon-paperplane ml-2"></i></button>
                </div>
                {{ invoiceSubheadingDetails }}
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {   
    props:['regionalState'], 
    data() {
        return {
            formData: {
                alternateSONumber: '',
                alternateInvoiceNo: '',
                clientId: '',
            },
            onEdit: false,
            recordId: null,
        }
    },

    computed: {
        clientListings() {
            return this.$store.getters.clients
        },
        

        invoiceSubheadingDetails() {
            const result = this.$store.getters.invoiceSubheadingSpecific
            if(result) {
                    this.formData.alternateSONumber = result.alternateSONumber
                    this.formData.alternateInvoiceNo = result.alternateInvoiceNo
                    this.formData.clientId = result.clientId
                    this.onEdit = true
                    this.recordId = result.id
            }
        }
    },

    methods: {
        addAlternateInvoiceSubheading() {
            this.$refs.loader.innerHTML = 'Please wait...';
            this.$store.dispatch('addInvoiceSubheading', {
                client_id: this.formData.clientId,
                alternate_sales_order_no: this.formData.alternateSONumber,
                alternate_invoice_no: this.formData.alternateInvoiceNo
            })
            this.$refs.loader.innerHTML = 'Saved'
            this.formData = {}
        },

        updateAlternateInvoiceSubheading() {
            this.$refs.loader.innerHTML = 'Please wait...'
            this.$store.dispatch('updateInvoiceSubheading', {
                client_id: this.formData.clientId,
                alternate_sales_order_no: this.formData.alternateSONumber,
                alternate_invoice_no: this.formData.alternateInvoiceNo,
                id: this.recordId
            })
            this.$refs.loader.innerHTML = 'Updated'
        }
    }
}

</script>