<template>
    <div class="card">
        <div class="card-body">
            <form>
                <div class="row">
                    <div class="col-md-6 font-weight-bold">Current Year : <small class="text-primary font-weight-bold">2020</small></div>
                    <div class="col-md-6 font-weight-bold">Current Month : <small class="text-primary font-weight-bold">May</small></div>
                </div>
                &nbsp;
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Client Name</label>
                            <select class="form-control" v-model="clientId">
                                <option value="">Choose a client</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Alternate SO Number</label>
                            <input type="text" v-model="alternateSONumber" class="form-control" />
                        </div>
                    </div>
                    <div class="col-md-6 font-weight-bold">
                        <div class="form-group">
                            <label>Alternate Invoice No.</label>
                           <input type="text" class="form-control" v-model="alternateInvoiceNo" />
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <span id="loader"></span>    
                        <button type="submit" @click.prevent="addAlternateInvoiceSubheading"  class="btn btn-primary" >Save Loading Site<i class="icon-paperplane ml-2"></i></button>
                </div>
                {{ testing }}
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {   
    props:['regionalState'], 
    data() {
        return {
            alternateSONumber: '',
            alternateInvoiceNo: '',
            clientId: '',
            onEdit: false,
           
        }
    },
    methods: {
        addAlternateInvoiceSubheading() {

        }
    }
}

</script>