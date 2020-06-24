<template>
    <div>

        <router-link :to="{ name: 'updateTrip', params: {id: 1872, clientName: 'golden-sugar-company'}, query: { tracker: 1}}" tag="button" class="btn btn-danger">
            Update...
        </router-link>
    </div>
</template>