<template>
    <div class="card">
        <div class="card-body">
            <form>
                &nbsp;

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Transporter</label>
                            <select class="form-control">
                                <option value="">Choose a transporter</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Truck Type</label>
                            <select class="form-control">
                                <option value="">Choose Truck Type</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 font-weight-bold">
                        <div class="form-group">
                            <label>Truck No.</label>
                        <input type="text" class="form-control"  />
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <span ref="loader"></span>    
                        <button type="submit" class="btn btn-primary" >Save Truck<i class="icon-paperplane ml-2"></i></button>
                </div>
            
            </form>
        </div>
    </div>
</template>

<script>
export default {   
    data() {
        return {
           
        }
    },
}

</script>