<template>
    <tr>
        <td class="text-center">{{ sn }}</td>
        <td>{{ truckType.truckTypeCode }}</td>
        <td>{{ truckType.truckType }}</td>
        <td class="text-center">{{ truckType.tonnage }}</td>
        <td class="text-center">
            <router-link :to="`/preferences/truck-types/${truckType.id}/edit`">
                <i class="icon-pen"></i> 
            </router-link>
        </td>
        <td class="text-center">
            <i class="icon-trash text-danger" @click="deleteTruckType(truckType.id)"></i>
        </td>
    </tr>
    
</template>


<script>
export default {
    props: ['truckType', 'sn'],
    methods: {
        deleteTruckType(truckTypeId) {
            this.$store.dispatch('deleteTruckType', truckTypeId)
        }
    }
}
</script>