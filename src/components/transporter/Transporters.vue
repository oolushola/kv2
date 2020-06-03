<template>
    <div>
        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                    <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Home - Transporters</span> </h4>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <router-view></router-view>
            </div>

            <div class="col-md-5">
                &nbsp;
                <app-transporter-form></app-transporter-form>
                
                
            </div>
            <div class="col-md-7">
                &nbsp;
                <list-loader :speed="2" v-if="!myData"></list-loader>
                <table class="table table-bordered">
                    <thead class="table-success font-weight-bold">
                        <tr>
                            <td colspan="6" class="text-primary">Total number of invoice subheading: </td>
                        </tr>
                        <tr>
                            <td class="text-center">SN</td>
                            <td>Client Name</td>
                            <td>Alt - S.O.</td> 
                            <td>Alt - Invoice No.</td>         
                            <td class="text-center">Edit</td>
                            <td class="text-center">Delete</td>
                        </tr>
                    </thead>
                   
                    <transition-group enter-to-class="animated fadeIn" leave-to-class="animated fadeOut" tag="tbody" class="font-size-sm">
                        <app-transporter></app-transporter>
                    </transition-group>
                </table>
            </div>
        </div>
        
    </div>
</template>

<script>
import Transporter from './Transporter.vue'
import TransporterForm from './TransportForm.vue'
import { ListLoader } from 'vue-content-loader'
import { ContentLoader } from 'vue-content-loader'
// or InstagramLoader | ListLoader | BullestlistLoader | CodeLoader

export default {
    data() {
        return {
            myData: null
        }
    },
    components: {
        appTransporter: Transporter,
        appTransporterForm: TransporterForm,
        ListLoader,
        ContentLoader
    }
}
</script>