<template>
    <v-container fluid>
    
        <v-layout row wrap>

            <role v-for="rol in roles" :Role=rol :key="rol.Role" ></role>
    
        </v-layout>
    
    </v-container>
</template>

<script>
    import Role from './Role.vue';
    export default {

          components: {
    
            Role,
    
        },
    
        methods: {
    
            // NavigateToRole(role) {
    
            //     console.log(role)
    
            //     if (role == 'New Role') {
    
            //         this.$router.push({
    
            //             name: 'NewRole'
    
            //         });
    
            //     } else {
                 
            //         this.$router.push({
    
            //             name: 'Role',
            //             id : 1
                       
            //         });
    
            //     }
    
            // }
    
        }
    
    }
</script>

<style>
    
</style>
