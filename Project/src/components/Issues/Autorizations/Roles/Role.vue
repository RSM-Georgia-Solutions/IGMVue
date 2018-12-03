<template>    
    
        <v-flex xs4>
    
            <v-avatar size="80">
    
                <img :src=Role.image @click="NavigateToRole(Role.role)">
    
            </v-avatar>
    
            <p style="font-size:140%;margin-left: 5%;">{{Role.role}}</p>
    
        </v-flex>
    
  
</template>
 
<script>
    export default { 
    
        props: ['Role'],
    
        methods: {
    
            NavigateToRole() {
                
    
                if (this.Role.role == 'New Role') {
    
                    this.$router.push({
    
                        name: 'NewRole'
    
                    });
    
                } else {
    
                    this.$router.push({
    
                        name: 'RoleSingle',
                        params: {id:this.Role.id}
                        
    
                    });
                
                }
    
            }
    
        }
    
    }
    
    // @click="NavigateToRole(rol.role)"
</script>
 
<style>
    
</style>
 