<template>
  <div id="app">

<div v-if="isAuth">
  <app-main-header></app-main-header>
  
	<div class="page-content">
		<app-navigations></app-navigations>
		<div class="content-wrapper">
      <div class="content">
        <transition enter-active-class="animated zoomIn" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
		  <app-main-footer></app-main-footer>
		</div>
	</div>
  
  </div>
    <div v-if="!isAuth">
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
import MainHeader from './components/shared/MainHeader.vue'
import Navigations from './components/shared/Navigations.vue'
import MainFooter from './components/shared/MainFooter.vue'

export default {
  name: 'app',
  data () {
    return {
      networkConnection: true
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.activeUserState
    }
  },
  components: {
    appMainHeader: MainHeader,
    appNavigations: Navigations,
    appMainFooter: MainFooter
  },
  created() {
    this.$store.dispatch('autoLogin');
  }
}
</script>

<style>
  .actionCursor {
    cursor: pointer;
  }
  .error {
    color: red;
    font-family:tahoma;
    font-size: 11px;
    padding-top:3px;
    font-weight: normal;
  }
  .notificationLabel {
      border:1px solid red;
  }
   input, select, textarea {
        border-radius:15px
    }
    
  body {
    font-family:DIN Alternate;
  }
</style>


