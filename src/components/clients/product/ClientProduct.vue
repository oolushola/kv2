<template>
    <div class="row">
        <section class="col-md-5 col-sm-12">
            &nbsp;
            <div class="card">
                <div class="card-body">
                    <h2 class="text-primary">{{ $route.params.client.replace(/-/g, ' ').toUpperCase() }}</h2>
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="text-primary">Product *</label>
                                <select class="form-control" v-model="$v.formData.clientProduct.$model" 
                                    :class="{'notificationLabel animated shake': $v.formData.clientProduct.$error}"
                                    @blur="!$v.formData.clientProduct.$touch()"
                                    >
                                    <option value="">Choose product</option>
                                    <option v-for="(product, index) in products" :key="index" :value="product">{{ product.productName }}</option>
                                </select>
                                <span class="error" v-if="!$v.formData.clientProduct.required">Product is required.</span>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                        <label>&nbsp;</label>
                        <div class="text-right">
                            <button type="submit" class="btn btn-primary" @click="addProduct">Add<i class="icon-paperplane ml-2"></i></button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="col-md-7 col-sm-12">
            &nbsp;
            <div class="table-responsive">
                <list-loader :speed="3" v-if="!clientProducts"></list-loader>
                <table class="table table-bordered" v-else>
                    <thead class="table-success">
                        <tr>
                            <td colspan="4">Total products assigned: {{ clientProducts.length }}</td>
                        </tr>
                        <tr>
                            <td>SN</td>
                            <td>Product</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tr v-if="clientProducts.length <= 0">
                        <td colspan="4" class="text-danger">You currently do not have any product assigned.</td>
                    </tr>
                    <transition-group mode="out-in" enter-to-class="animated fadeIn" leave-to-class="animated fadeOut" tag="tbody">
                        <app-client-product v-for="(clientProduct, index) in clientProducts" 
                            :key="clientProduct.productName" 
                            :sn="index+1" 
                            :clientProduct="clientProduct"></app-client-product>
                    </transition-group>
                </table>
            </div>
        </section>
    </div>
</template>

<script>
import ClientProducts from './ClientProducts.vue'
import { required, maxLength, numeric } from 'vuelidate/lib/validators'
import { ListLoader } from 'vue-content-loader'
import { mapActions } from 'vuex'

export default {   
    data() {
        return {
           formData: {
               clientProduct: ''
           }
        }
    },
    validations: {
        formData: {
            clientProduct: {
                required,
            }
        }
    },
    computed: {
        products() {
           return this.$store.getters.fetchProducts 
        },
        clientProducts() {
            return this.$store.getters.fetchClientProducts
        }
    },
    methods: {
        addProduct() {
            let client = { clientId:this.$route.params.id };
            Object.assign(this.formData, client);
            this.$store.dispatch('addClientProduct', this.formData)
        }
    },
    components: {
        ListLoader,
        appClientProduct: ClientProducts
    },
    created() {
       this.$store.dispatch('products');
       this.$store.dispatch('fetchClientProducts', this.$route.params.id)
    },

    watch: {
        '$route': function() {
            if(this.$route.params.id) {
                 this.$store.dispatch('fetchClientProducts', this.$route.params.id)
            }
        }
    }
}
</script>

<style scoped>
    input, select, textarea {
        border-radius:15px
    }
</style>