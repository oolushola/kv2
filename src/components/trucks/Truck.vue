<template>
    <tr>
        <td>{{ sn }}</td>
        <td>{{ truck.transporter }}</td>
        <td>{{ truck.truckType }}</td>
        <td>{{ truck.truckNo }}</td>
        <td class="text-center text-primary actionCursor">
            <i class="icon-pencil" @click="updateTruckDetails(truck.id)"></i>
        </td>
        <td class="text-danger text-center actionCursor">
            <i class="icon-trash" @click="removeTruck(truck.id)"></i>
        </td>
        
    </tr>
    
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        sn: {
            type: Number,
            required: true
        },
        truck: {
            type: Object,
            required: true
        }
    },
    methods: {
        updateTruckDetails(truckId) {
            this.$store.dispatch('editTruck', truckId)
        },
        removeTruck(truckId) {
            this.$store.dispatch('deleteTruck', truckId)
        }
    }
}
</script>