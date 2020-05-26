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
                    <span ref="loader"></span>    
                        <button type="submit" v-if="!onEdit" @click.prevent="addCompanyTarget"  class="btn btn-primary" >Add Target<i class="icon-paperplane ml-2"></i></button>

                        <button type="submit" v-else @click.prevent="updateCompanyTarget"  class="btn btn-primary" >Update Target<i class="icon-paperplane ml-2"></i></button>
                </div>
                 {{ onEditRecord }} 
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
            currentMonth: monthFormatter(new Date().getMonth()+1)
        }
    },
    computed: {
        onEditRecord() {
            const result = this.$store.getters.specificRecord
            if(result) {
                this.target = result.target
                this.onEdit = true
            }
        }
    },
    methods: {
        addCompanyTarget() {
            this.$store.dispatch('addNewCompanyTarget', {
                'currentYear': new Date().getFullYear(),
                'currentMonth': this.currentMonth,
                'target': this.target,
            });
            this.target = ''
        },
        updateCompanyTarget() {
            const target = this.$store.getters.specificRecord;
            this.$refs.loader.innerHTML = '<i class="spinner icon-spinner2"></i>Please wait..'
            this.$store.dispatch('updateCompanyTarget', {
                'currentYear': new Date().getFullYear(),
                'currentMonth': this.currentMonth,
                'target': this.target,
                'id' : target.id
            });
            this.target = ''
            this.$refs.loader.innerHTML = '<i class="icon-checkmark2"></i>Updated successfully'
        },
    }
}

function monthFormatter(value) {
    let response = ''
    switch(value) {
        case 1: 
            response = 'January'
            break;
        case 2: 
            response = 'February'
            break;
        case 3:
            response = 'March'
            break;
        case 4:
            response = 'April'
            break;
        case 5:
            response = 'May'
            break;
        case 6:
            response = 'June'
            break;
        case 7:
            response = 'July'
            break;
        case 8:
            response = 'August'
            break;
        case 9:
            response = 'September'
            break;
        case 10:
            response = 'October'
            break;
        case 11:
            response = 'November'
            break;
        case 12: 
            response = 'December'
            break
        default:
            response = 'NA'
    }   

    return response;
}
</script>