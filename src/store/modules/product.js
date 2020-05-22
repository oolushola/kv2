import axios from 'axios'

const state = {
    products: null,
    details: null,
}

const mutations = {
    'PRODUCTS' (state, products) {
        state.products = products
    },

    'NEW_PRODUCT' (state, addProduct) {
        state.products.unshift(addProduct);
    },

    'PRODUCT_DETAILS'(state, response) {
        state.details = response
    },
    'UPDATED_PRODUCT' (state, response) {
        const products = state.products.find(product => product.id === response.id);
        if(products){
            products.productName = response.productName
            products.productCode = response.productCode
        }
    },
    'DELETED_PRODUCT' (state, productId) {
        const product = state.products.find(product => product.id === productId);
        state.products.splice(product, 1);
    }

}

const actions = {
    addNewProduct: ({ commit }, {productCode, productName }) => {
        const newProduct = {
            product_code: productCode,
            product_name: productName
        }
        axios.post('/products', newProduct).then(response => {
            const result = response.data.data;
            commit('NEW_PRODUCT', result);
        }).catch(error => {
            return error
        })
    },

    editProduct: ({ commit }, { productId }) => {
        axios.get('/products/'+productId).then(response => {
            const result = response.data.data
            
            commit('PRODUCT_DETAILS', result);
        }).catch(error => {
            return error
        })
    },

    updateProduct: ({ commit }, payload) => {
        const updateRecord = {
            product_code: payload.productCode,
            product_name: payload.productName
        }
        axios.put('/products/' + payload.productId, updateRecord)
            .then(response => {
                const result = response.data.data
                console.log(result);
                commit('UPDATED_PRODUCT', result)
            }).catch(error => { return error })
    },

    deleteProduct: ({ commit }, payload) => {
        axios.delete(`/products/${payload}`)
            .then(response => {
                console.log('Deleted')
                commit('DELETED_PRODUCT', payload)
            }).catch(error => {
                return error
            })
    },

    fetchAllProducts: ({ commit }) => {
        axios.get('/products')
        .then((response) => {
            const products = response.data.data
            commit('PRODUCTS', products)
        })
        .catch(error => {
            if(error) {
                return error
            }
        })
    },
}

const getters = {
    productsListing(state) {
        return state.products;
    },
    specificProductDetails(state) {
        return state.details
    }
}

export default {
    state, actions, mutations, getters
}