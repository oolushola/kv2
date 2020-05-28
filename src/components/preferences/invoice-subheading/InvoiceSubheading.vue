<template>
    <tr style="font-family:DIN Alternate; font-size:11px">
        <td>{{ sn }}</td>
        <td>{{ subheadings.companyName }}</td>
        <td>{{ subheadings.alternateSONumber}}</td>
        <td>{{ subheadings.alternateInvoiceNo }}</td>
        <td class="text-center">
            <i class="text-primary icon-pencil text-center actionCursor" @click="updateInvoiceSubheading(subheadings.id)"></i>
        </td>
        <td class="text-center">
            <i class="text-danger icon-trash text-center actionCursor" @click="deleteInvoiceSubheading(subheadings.id)"></i>    
        </td>
    </tr>
</template>

<script>
export default {
    props: ['subheadings', 'sn'],
    methods: {
        updateInvoiceSubheading(invoiceSubheadingId) {
            this.$store.dispatch('showInvoiceSubheading', invoiceSubheadingId)
        },

        deleteInvoiceSubheading(invoiceSubheadingId) {
            this.$store.dispatch('removeInvoiceSubheading', invoiceSubheadingId)
        }
    }
    

}

</script>