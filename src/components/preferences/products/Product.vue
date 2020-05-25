<template>
    <tr>
        <td>{{ sn   }}</td>
        <td>{{ product.productCode }}</td>
        <td>{{ product.productName }}</td>
        <td class="text-center">
            <router-link :to="'/products/' + product.id +'/edit'">
                <a><i class="icon-pencil"></i></a>
            </router-link>
        </td>
        <td class="text-center"><i class="icon-trash" @click="removeProduct(product.id)"></i></td>
    </tr>

</template>

<script>
export default {
    props: ['product', 'sn'],
    methods: {
        removeProduct(productId) {
            this.$store.dispatch('deleteProduct', productId);
        }
    }
}
</script>