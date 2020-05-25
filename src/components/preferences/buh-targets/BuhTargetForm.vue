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
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Choose Unit Head</label>
                            <select v-model="unitHead" class="form-control">
                                <option value="">Choose a unit head</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 font-weight-bold">
                        <div class="form-group">
                            <label>Target</label>
                           <input type="text" class="form-control" />
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <span id="loader"></span>    
                        <button type="submit" @click.prevent="addUnitHeadTarget"  class="btn btn-primary" >Save Loading Site<i class="icon-paperplane ml-2"></i></button>
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
            unitHead: '',
            onEdit: false,
           
        }
    }
}

</script>