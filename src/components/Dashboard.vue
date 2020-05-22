<template>
    <div>
        <h1>Dashboard : Welcome {{ user.last_name }}, {{ user.first_name }}</h1>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    computed: {
        user() {
            return this.$store.getters.userDetails
        }
    },
    created() {
        this.$store.dispatch('fetchUserDetails')
    }
}
</script>