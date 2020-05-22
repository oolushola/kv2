<template>
    <div>
        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                    <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Home - Global Operation</span> - Products</h4>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>

                <div class="header-elements d-none">
                    <div class="d-flex justify-content-center">
                        <a href="#" class="btn btn-link btn-float text-default"><i class="icon-calculator text-primary"></i> <span>View Products</span></a>
                        <a href="#" class="btn btn-link btn-float text-default"><i class="icon-calendar5 text-primary"></i> <span>Product Categories</span></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-5">
                &nbsp;
                <!-- Basic layout-->
                <div class="card">
                    <div class="card-header header-elements-inline">
                        <h5 class="card-title">Add New Product</h5>
                    </div>
                    
                    <div class="card-body">
                        <form id="frmProducts" action="">
                            
                            <div class="form-group">
                                <label>Product Code</label>
                                <input type="text" class="form-control" placeholder="sug" v-model="productCode" >
                            </div>

                            <div class="form-group">
                                <label>Product Name</label>
                                <input type="text" class="form-control" placeholder="Sugar" v-model="productName">
                            </div>

                            <div class="text-right">
                                <span id="loader"></span>    
                                    <button v-if="! onEdit" ref="addNewProduct" type="submit" @click.prevent="addNewProduct" :disabled="!productCode || !productName" class="btn btn-primary" >Save Product <i class="icon-paperplane ml-2"></i></button>

                                    <button v-else type="submit" @click.prevent="updateProduct" :disabled="!productCode || !productName" class="btn btn-primary" >Update Product <i class="icon-paperplane ml-2"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /basic layout -->

            </div>
            <div class="col-md-7">
                &nbsp;
                <table class="table table-bordered">
                    <thead class="table-success font-weight-bold">
                        <tr>
                            <td class="text-center">SN</td>
                            <td>Product Code</td>
                            <td>Product Name</td>
                            <td class="text-center">Edit</td>
                            <td class="text-center">Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        <app-product v-for="(product, index) in products" 
                            :key="product.productName" :product="product" 
                            :sn="index += 1" 
                            :class="{'table-primary' : index % 2 == 0, 'table-danger' : index % 2 !== 0 }">
                        </app-product>
                    </tbody>
                </table>
            </div>
        </div>
        {{ specificProduct }}
    </div>
</template>

<script>
import Product from './Product.vue'
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            productCode: '',
            productName: '',
            onEdit: null,
            status: '',
        }
    },
    watch: {
       '$route' : function(from, to) {
            this.onEdit = this.$route.params.id
            //console.log(this.onEdit)
            if(this.onEdit) {
                const parameters = {
                    productId: this.onEdit
                }
                this.$store.dispatch('editProduct', parameters)
                
            }
        }
    },
    computed: {
        products() {
            return this.$store.getters.productsListing
        },
        specificProduct() {
            const response = this.$store.getters.specificProductDetails
            if(this.onEdit !== null){
                //console.log(response)
                this.productCode = response.product_code
                this.productName = response.product_name
            }
        }
    },
    components: {
        AppProduct: Product
    },
    methods:{
        addNewProduct() {
            const newProductRequest = {
                productCode: this.productCode,
                productName: this.productName,
            }
            
            this.productCode = ''
            this.productName = ''
            this.$store.dispatch('addNewProduct', newProductRequest)
        },

        updateProduct() {
            const updateProductRequest = {
                productCode: this.productCode,
                productName: this.productName,
                productId: this.$route.params.id
            }
            this.productCode = ''
            this.productName = ''
            this.$store.dispatch('updateProduct', updateProductRequest)
            this.$router.push('/products')
        }
    },

    created() {
        this.$store.dispatch('fetchAllProducts', this.$store.getters.activeToken)
    },
    
}
</script>