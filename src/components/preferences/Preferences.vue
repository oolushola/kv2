<template>
    <div>
        <div class="row">
            <div class="col-md-1 col-sm-4 col-xs-3 text-danger" style="top:10px;">
                <h5>Preferences: </h5>
            </div>
            <div class="col-md-11">
                 <ul class="row">
                    <li class="col-md-2 text-center" v-for="(preference, index) in preferences" :key="index">
                        <router-link :to="`/preferences/${preference.uri}`" tag="button" class="btn btn-default" activeClass="active">
                            <a>{{ preference.name }}</a>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        
       

        <router-view></router-view>
    </div>
</template>

<style scoped>
    h5, li {
        font-family: DIN Alternate;
    }
    ul {
        padding: 0;
        margin: 0;
    }
    ul > li, a  {
        padding:3px;
        list-style: none;
        margin-bottom: 3px;
        color:#000;
    }
    a:hover,
    a:focus,
    a:active {
        color: coral;
        
    }
</style>

<script>
export default {
    data() {
        return {
            preferences: [
                { name: 'Kaya Profile', uri: 'company-profile'},
                { name: 'Products', uri: 'products'},
                { name: 'Truck Types', uri: 'truck-types'},
                { name: 'Loading Sites', uri: 'loading-sites'},
                { name: 'Targets', uri: 'company-target'},
                { name: 'Invoice Subheading', uri: 'invoice-subheading'},
                { name: 'Unit Head Targets', uri: 'unit-head-targets'},
                
            ]
        }
    }
}
</script>