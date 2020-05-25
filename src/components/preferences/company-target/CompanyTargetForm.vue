<template>
    <div class="card">
        <div class="card-body">
            <form>
                <div class="row">
                    <div class="col-md-6 font-weight-bold">Current Year : <small class="text-primary font-weight-bold">2020</small></div>
                    <div class="col-md-6 font-weight-bold">Current Month : <small class="text-primary font-weight-bold">May</small></div>
                </div>
                &nbsp;
                <div class="form-group">
                    <label>Company Target</label>
                    <input type="text" class="form-control" placeholder="4000" v-model="target">
                </div>

                <div class="text-right">
                    <span id="loader"></span>    
                        <button type="submit" @click.prevent="addCompanyTarget"  class="btn btn-primary" >Add Loading Site<i class="icon-paperplane ml-2"></i></button>
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
            target: '',
            onEdit: false,
            testing: caseMe('I like what am seeing')
        }
    }
}

function caseMe(value) {
    console.log(value)
}
</script>