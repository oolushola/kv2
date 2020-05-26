<template>
    <tr>
        <td>{{ sn }}</td>
        <td>{{ target.currentMonth }}</td>
        <td>{{ target.target }}</td>
        <td class="text-center">
            <i class="icon-pencil text-primary" @click="editCompanyTarget(target.id)"  v-if="currentMonth === target.currentMonth"></i>
        </td>
        <td class="text-center">
            <i class="icon-trash text-danger" @click="deleteTarget(target.id)" v-if="currentMonth === target.currentMonth"></i>
        </td>
        
    </tr>
</template>

<style scoped>
    .text-primary, .text-danger {
        cursor: pointer;
    }
</style>

<script>
export default {
    props: ['target', 'sn'],
    data() {
        return {
            currentMonth: monthFormatter(new Date().getMonth()+1)
        }
    },
    methods: {
        editCompanyTarget(targetId) {
         this.$store.dispatch('specificCompanyTarget', targetId )   
        },
        deleteTarget(targetId) {
            this.$store.dispatch('removeCompanyTarget', targetId)
        }
    }
}
function monthFormatter(value) {
    let response = ''
    switch(value) {
        case 1: 
            response = 'January'
            break;
        case 2: 
            response = 'February'
            break;
        case 3:
            response = 'March'
            break;
        case 4:
            response = 'April'
            break;
        case 5:
            response = 'May'
            break;
        case 6:
            response = 'June'
            break;
        case 7:
            response = 'July'
            break;
        case 8:
            response = 'August'
            break;
        case 9:
            response = 'September'
            break;
        case 10:
            response = 'October'
            break;
        case 11:
            response = 'November'
            break;
        case 12: 
            response = 'December'
            break
        default:
            response = 'NA'
    }   

    return response;
}
</script>