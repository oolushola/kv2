<template>
    <tr>
        <td class="text-center">{{ sn }}</td>
        <td>{{ unitHeadTargets.fullName }}</td>
        <td>{{ unitHeadTargets.currentMonth }}</td>
        <td>{{ unitHeadTargets.target }} </td>
        <td class="text-center text-primary" @click="editUnitHeadTargets(unitHeadTargets.id)">
            <i class="icon-pencil"></i>
        </td>
        <td class="text-center text-danger" @click="deleteUnitHeadTarget(unitHeadTargets.id)">
            <i class="icon-trash"></i>
        </td>
    </tr>
</template>

<script>
export default {
    props:['unitHeadTargets', 'sn'],
    methods: {
        editUnitHeadTargets(unitHeadId) {
            this.$store.dispatch('showUnitHeadTarget', unitHeadId)
        },

        deleteUnitHeadTarget(unitHeadId) {
            this.$store.dispatch('removeUnitHeadTarget', unitHeadId)
        }
    }
}
</script>