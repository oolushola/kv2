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
                            <select v-model="user" class="form-control" @change="getUserName()">
                                <option value="">Choose a unit head</option>
                                <option v-for="(user, index) in businessUnitHeads" 
                                    :key="index" 
                                    :value="user.id"
                                    >{{ user.fullName }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 font-weight-bold">
                        <div class="form-group">
                            <label>Target</label>
                           <input type="text" v-model="target" class="form-control" />
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <span ref="loader"></span>    
                        <button type="submit" v-if="!onEdit" @click.prevent="addUnitHeadTarget"  class="btn btn-primary" >
                            Save Unit Head Target<i class="icon-paperplane ml-2"></i>
                        </button>

                        <button type="submit" v-else @click.prevent="updateUnitHeadTarget"  class="btn btn-primary" >
                            Update Unit Head Target<i class="icon-paperplane ml-2"></i>
                        </button>
                </div>
                {{ checkOnEdit }}
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
            user: '',
            target: '',
            onEdit: false,
            fullName: '',
            onEdit: false,
            recordId: ''
           
        }
    },
    computed: {
        businessUnitHeads() {
            return this.$store.getters.unitHeadUsersListing
        },
        checkOnEdit() {
           this.$store.getters.unitHeadRecordSpecific
           const result = this.$store.getters.unitHeadRecordSpecific
           if(result) {
               this.onEdit = true,
               this.target = result.target
               this.user = result.userId
               this.recordId = result.recordId
           }
        }
    },

    methods: {
        dataRequest() {
          const formData = {
                currentYear: new Date().getFullYear(),
                currentMonth: currentMonth(new Date().getMonth() + 1),
                unitHead: this.user,
                fullName: this.fullName,
                target: this.target,
                id: this.recordId
            }  
            return formData
        },
        addUnitHeadTarget() {
            const saveHeadRequest = this.dataRequest()
            this.$refs.loader.innerHTML = "Saving..."
            this.$store.dispatch('addBusinessUnitTarget', saveHeadRequest);
            this.$refs.loader.innerHTML = "<i class='icon-checkmark2'></i> Saved."
            this.target = ''
        },

        updateUnitHeadTarget() {
            const updateHeadRequest = this.dataRequest()
            this.$refs.loader.innerHTML = "Updating..."
            this.$store.dispatch('updateBusinessUnitTarget', updateHeadRequest)
            this.$refs.loader.innerHTML = "<i class='icon-checkmark2'></i> Updated."
            this.target = ''
        },

        getUserName($event) {
            console.log($event)
             //this.fullName = this.$refs.getName.title
        }
    }
}

function currentMonth(value) {
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