<template>
    <div>
    <!-- Main navbar -->
        <div class="navbar navbar-expand-md navbar-dark">
            <p style="font-size:20px; margin:0; padding:0; margin-top:8px;">Káyá Africa Technology</p>
            

            <div class="d-md-none">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
                    <i class="icon-tree5"></i>
                </button>
                <button class="navbar-toggler sidebar-mobile-main-toggle" type="button">
                    <i class="icon-paragraph-justify3"></i>
                </button>
            </div>

            <div class="collapse navbar-collapse" id="navbar-mobile">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="#" class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
                            <i class="icon-paragraph-justify3"></i>
                        </a>
                    </li>
                </ul>

                <span class="badge bg-success ml-md-3 mr-md-auto">V1.1.8</span>

                <ul class="navbar-nav">
                    

                    <li class="nav-item dropdown">
                        <a href="#" class="navbar-nav-link dropdown-toggle caret-0" data-toggle="dropdown">
                            <i class="icon-bubbles4"></i>
                            <span class="d-md-none ml-2">Messages</span>
                            <span class="badge badge-pill bg-warning-400 ml-auto ml-md-0"></span>
                        </a>
                        
                        <div class="dropdown-menu dropdown-menu-right dropdown-content wmin-md-350">
                            <div class="dropdown-content-header">
                                <span class="font-weight-semibold">Messages</span>
                                <a href="#" class="text-default"><i class="icon-compose"></i></a>
                            </div>

                            <div class="dropdown-content-body dropdown-scrollable">
                                <ul class="media-list">
                                    <li class="media">
                                        <div class="mr-3 position-relative">
                                            <img src="" width="36" height="36" class="rounded-circle" alt="">
                                        </div>

                                        <div class="media-body">
                                            <div class="media-title">
                                                <a href="#">
                                                    <span class="font-weight-semibold">James Alexander</span>
                                                    <span class="text-muted float-right font-size-sm">04:58</span>
                                                </a>
                                            </div>

                                            <span class="text-muted">who knows, maybe that would be the best thing for me...</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div class="dropdown-content-footer justify-content-center p-0">
                                <a href="#" class="bg-light text-grey w-100 py-2" data-popup="tooltip" title="Load more"><i class="icon-menu7 d-block top-0"></i></a>
                            </div>
                        </div>
                    </li>

                    <li class="nav-item dropdown dropdown-user">
                        <a href="#" class="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown">
                                <span class="icon-user" style="font-size:20px;"></span>
                            <span>Olushola Damilare</span>
                        </a>

                        <div class="dropdown-menu dropdown-menu-right">
                            <a href="#uploadPhotoBox" data-toggle="modal" class="dropdown-item">
                                <i class="icon-file-picture"></i> Upload Photo
                            </a>
                            <a href="#changePassword" data-toggle="modal" class="dropdown-item">
                                <i class="icon-lock"></i>Change Password
                            </a>
                            <!-- <a href="#" class="dropdown-item"><i class="icon-comment-discussion"></i> Messages <span class="badge badge-pill bg-blue ml-auto">58</span></a> -->
                            <div class="dropdown-divider"></div>
                            <span class="dropdown-item" @click="signOff"><i class="icon-switch2"></i> Logout</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
	<!-- /main navbar -->
    </div>
</template>

<script>
export default {
    methods: {
        signOff() {
            this.$store.dispatch('logout')
        }
    }
}
</script>