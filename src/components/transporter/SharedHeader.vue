<template>
    <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                    <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Home - </span>  Transporter</h4>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>

                <div class="header-elements d-none">
                    <div class="d-flex justify-content-center">
                        <router-link to="/transporters/new"  class="btn btn-link btn-float text-default">
                            <i class="icon-add text-primary"></i> 
                            <span>Add New Transporter</span>
                        </router-link>
                        <router-link to="/transporters" class="btn btn-link btn-float text-default">
                            <i class="icon-calculator text-warning"></i>
                            <span>View all Transtransporters</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
</template>