<template>
    <tr>
        <td class="text-center">{{ sn }}</td>
        <td>
            {{ driver.driver}}
            <span class="d-block text-primary font-size-sm">{{ driver.driverPhoneNo }}, {{driver.driverAltNo }}</span>
        </td>
        <td>
            {{ driver.motorBoy}}
            <span class="d-block text-primary font-size-sm">{{ driver.motorBoyNo }}, {{driver.motorBoyAltNo }}</span>
        </td>
        <td class="text-primary text-center actionCursor">
            <i class="icon-pencil" @click="editDriver(driver.id)"></i>
        </td>
        <td class="text-primary text-danger actionCursor">
            <i class="icon-trash" @click="deleteDriver(driver.id)"></i>
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
        driver: {
            required: true,
            type: Object
        },
        sn: {
            type: Number,
            required: true
        }
    },
    methods: {
        editDriver(driverId) {
            this.$store.dispatch('editDriver', driverId)
        },

        deleteDriver(driverId) {
            this.$store.dispatch('deleteDriver', driverId)
        }
    }
}
</script>