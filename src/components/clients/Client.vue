<template>
    <tr>
        <td class="text-center">{{ sn }}</td>
        <td class="logo-placeholder" width="30%">
            <img :src="api+`/${client.logo}`" width="50" height="50" alt="client.companyName" :title="client.companyName" class="mb-3" />
            <div style="display: inline-table;">
                <h4 class="text-primary ml-1">{{ client.companyName }}</h4>
                <span class="d-block ml-1">Phone No: {{ client.phoneNo }} </span>
                <span class="d-block ml-1">email: {{ client.email }}</span>
            </div>
            <span class="d-block ml-1 text-danger">Address: {{ client.address }}</span>
        </td>
        <td>
            <p class="text-primary ml-1">Person of Contact: {{ client.personOfContact }}</p>
            <span class="d-block ml-1">Country of Operation: {{ client.country }}</span>
            <span class="d-block ml-1 text-danger">State / Province: {{ client.state }}</span>
        </td>
        <td width="12%">
            <span class="badge bg-primary mb-1 ml-1">MAIZE</span>
            <span class="badge bg-primary mb-1 ml-1">FLOUR</span>
            <span class="badge bg-primary mb-1 ml-1">CONTAINER</span>
            
        </td>
         <td width="12%">
            <span class="badge bg-primary mb-1">GPF APAPA</span>
            <span class="badge bg-primary mb-1">GSC - APAPA</span>
        </td>
        <td class="text-center actionCursor">
            <router-link to="">
                <i class="icon-basket text-primary mr-1 mb-2" title="Add Product"></i>
            </router-link>

            <i class="icon-lab mr-1 mb-2" title="Assign Loading Site"></i>
            <i class="icon-coins text-info mr-1 mb-2" title="Add Route Pricing"></i>
            <router-link :to="'/clients/'+client.id+'/edit'">
                <i class="icon-pencil3 text-primary mr-1 mb-2" title="Edit Client Information"></i>
            </router-link>

            <i class="icon-trash text-danger mr-1 mb-2" :title="`Delete ${client.companyName}`"></i>
        </td>
    </tr>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            api: axios.defaults.baseURL
        }
    },
    props: {
        sn: {
            type: Number,
            required: true
        },
        client: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
    td {
        font-family: DIN Alternate;
    }
    .logo-placeholder {
        background: #fbfbfb;
        margin:auto;
    }
    img {
        border-radius: 100%;
        cursor: pointer;
        position: relative;
        top:18px;
    }
    h4, p {
        margin: 0;
        padding: 0;
    }
</style>
