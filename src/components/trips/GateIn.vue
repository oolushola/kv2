<template>
    <div>
         <div class="card">
            <div class="card-body">
                <h5>Initiate Trip</h5>
            </div>
        </div>
        <div class="row">
            <section class="col-md-6 col-lg-6 col-sm-12">
                <div class="card">
                    <div class="card-body row">
                        <legend class="font-weight-semibold"><i class="icon-people mr-2"></i> Client Details</legend>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Client *</label>
                                <select class="form-control">
                                    <option value="">Choose Client</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Loading Site *</label>
                                <select class="form-control">
                                    <option value="">Loading Site</option>
                                </select>
                            </div>
                        </div>
                        
                        <legend class="font-weight-semibold"><i class="icon-truck mr-2"></i> Truck Details</legend>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Truck No *</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Truck Type *</label>
                                <select class="form-control">
                                    <option value="">Loading Site</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Tonnage *</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Product *</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <legend class="font-weight-semibold"><i class="icon-train mr-2"></i>Who is the transporter? </legend>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Transporter *</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Transporter Phone No *</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            <div class="form-group">
                                <label>Driver's first Name </label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            <div class="form-group">
                                <label>Driver's last name </label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            <div class="form-group">
                                <label>Driver's Phone No. *</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            <div class="form-group">
                                <label>Motorboy's first Name </label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            <div class="form-group">
                                <label>Motoroboy's last name </label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            <div class="form-group">
                                <label>Motorboy's Phone No. *</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <legend class="font-weight-semibold"><i class="icon-train mr-2"></i>Where is this truck going to? </legend>

                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>State/Province of Exact Destination *</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Exact Destination *</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                    </div>

                </div>

                <div class="card" v-if="this.$route.query.tracker >= 1">
                    <div class="card-body row">
                        <legend class="font-weight-semibold"><i class="icon-people mr-2"></i> Arrival At Loading Details</legend>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Arrial at loading bay *</label>
                                <input type="datetime-local" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card" v-if="this.$route.query.tracker >= 2">
                    <div class="card-body row">
                        <legend class="font-weight-semibold"><i class="icon-people mr-2"></i> Loading Details</legend>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Loading Start *</label>
                                <input type="datetime-local" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Loading Ended *</label>
                                <input type="datetime-local" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card" v-if="this.$route.query.tracker >= 3">
                    <div class="card-body row">
                        <legend class="font-weight-semibold"><i class="icon-people mr-2"></i>Departed Loading Bay</legend>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Loading Start *</label>
                                <input type="datetime-local" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Loading Ended *</label>
                                <input type="datetime-local" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card" v-if="this.$route.query.tracker >= 4">
                    <div class="card-body row">
                        <legend class="font-weight-semibold"><i class="icon-people mr-2"></i>Gate Out Information</legend>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Customers Name *</label>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Customers Number *</label>
                                <input type="number" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            <div class="form-group">
                                <label>Loaded Weight *</label>
                                <input type="number" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            <div class="form-group">
                                <label>Quantity *</label>
                                <input type="number" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            <div class="form-group">
                                <label>Address *</label>
                                <textarea class="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary">Register Trip</button>
            </section>

                

            <section class="col-md-6 col-lg-6 col-sm-12">
                <div class="card"></div>
            </section>
            

        </div>
        
    </div>
</template>


<script>
import { required } from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            formData: {
                clientId: '',
                loadingSiteId: ''
            }
        }
    },

    computed: {
        clients() {
            return this.$store.getters.ordersClient
        }
    },

    validations: {
        formData: {
            clientId: {
                required
            }
        }
    },

    created() {
        this.$store.dispatch('fetchClients')
    }
}
</script>

<style scoped>
input, select, textarea {
        border-radius:15px
    }
</style>