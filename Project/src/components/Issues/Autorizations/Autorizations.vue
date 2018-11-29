<template>
    <v-container justify-center>
    
        <v-layout  justify-center column fill-height mt-5>
    
            <v-btn color="teal darken-2" dark class="mt-5" :to="{name:'Roles'}">როლები</v-btn>
    
            <v-btn color="success" class="mt-4" :to="{name:'Permissions'}">უფლებები</v-btn>
    
        </v-layout>
    
    </v-container>
</template>

<script>
    export default {
    
    }
</script>

<style>
    
</style>
