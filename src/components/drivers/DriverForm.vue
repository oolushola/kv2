<template>
    <div class="card">
        <div class="card-body">
            <form>
                &nbsp;

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>First Name</label>
                            <select class="form-control">
                                <option value="">Choose Truck Type</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 font-weight-bold">
                        <div class="form-group">
                            <label>Last Name</label>
                        <input type="text" class="form-control"  />
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="text" class="form-control" />
                        </div>
                    </div>
                    <legend class="font-weight-semibold"><i class="icon-people mr-2"></i> Motor Boy Information</legend>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>First Name</label>
                            <select class="form-control">
                                <option value="">Choose Truck Type</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 font-weight-bold">
                        <div class="form-group">
                            <label>Last Name</label>
                        <input type="text" class="form-control"  />
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="text" class="form-control" />
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