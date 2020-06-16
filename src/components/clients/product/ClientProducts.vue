<template>
    <tr>
        <td width="5%">{{ sn }}</td>
        <td>{{ clientProduct.productName }}</td>
        <td width="5%" class="text-center actionCursor text-danger">
            <i class="icon-trash" @click="removeProduct(clientProduct.id)"></i>
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
            clientProduct: {
                required: true,
                type: Object
            }
        },

        methods: {
            removeProduct(productId) {
                this.$store.dispatch('removeClientProduct', productId);
            }
        }
    }
</script>