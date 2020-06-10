<template>
    
    <tr>
        <td class="text-center">{{ sn }}</td>
        <td>
            <span>Assigned Staff: {{ transporter.ownedBy }}</span>
            <h6 class="text-primary">{{ transporter.transporter}}</h6>
            <span class="d-block">{{ transporter.phoneNumber}} {{ transporter.phoneNumberTwo}}</span>
            <span class="d-block text-danger">{{ transporter.address }}</span>
        </td>
        <td>
            <span>Account Type: {{ transporter.accountType }}</span>
            <h6 class="text-primary">{{ transporter.accountNo }}</h6>
            <span class="d-block">{{ transporter.accountName }}</span>
            <span class="d-block text-danger">{{ transporter.bankName }}</span>
        </td>
        <td>
            <h6 class="text-primary">{{ transporter.guarantor }}</h6>
            <span class="d-block">{{ transporter.guarantorPhoneNo }} {{ transporter.guarantorPhoneNoTwo }}</span>
            <span class="d-block text-danger">{{ transporter.guarantorAddress }}</span>
        </td>
        
        <td>
            <span v-if="transporter.relationship">Relationship: {{ transporter.relationship }}</span>
            <h6 class="text-primary">{{ transporter.nextOfKin }}</h6>
            <span class="d-block">{{ transporter.nokPhoneNo }} {{ transporter.nokPhoneNoTwo }}</span>
            <span class="d-block text-danger">{{ transporter.nokAddress }}</span>
        </td>
        <td class="actionCursor text-primary text-center">
            <router-link :to="{ name: 'editTransporter', params: { id: transporter.id }}">
                <i class="icon-pencil"></i>
            </router-link>
        </td>
        <td class="actionCursor text-danger text-center">
            <i class="icon-trash" @click="removeTransporter(transporter.id)"></i>
        </td>
    </tr>
    
</template>

<script>
export default {
   props: {
       sn: {
           required: true,
           type: Number
       },
       transporter: {
           type: Object,
           required: true
       }
   },

   methods: {
       removeTransporter(id) {
           this.$store.dispatch('removeTransporter', id)
       }
   }
}
</script>

<style scoped>
    tr > td > span {
        font-size:11px;
        font-family:DIN Alternate;
    }
    h6 {
        padding: 0;
        margin: 0;
    }
</style>