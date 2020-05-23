<template>
   <tr>
        <td class="text-center">{{ sn }}</td>
        <td>{{ loadingSite.loadingSiteCode }}</td>
        <td>{{ loadingSite.loadingSite}}</td>
        <td class="text-center">
            <router-link :to="link">
                <i class="icon-pen"></i>
            </router-link>
        </td>
        <td class="text-center">
            <i class="icon-trash text-danger" @click="deleteLoadingSite(loadingSite.id)"></i>
        </td>
   </tr>
</template>

<script>
export default {
    props:['loadingSite', 'sn'],
    data() {
        return  {
            link: `/preferences/loading-sites/${this.loadingSite.id}/edit`
        }
    },
    components: {
        deleteLoadingSite(loadingSiteId) {
            // do the needful here...
        }
    }
}
</script>

<style scoped>
    .text-danger {
        cursor: pointer;
    }
</style>