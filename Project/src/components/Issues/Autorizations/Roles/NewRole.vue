<template>
    <v-layout row wrap>
    
        <v-flex xs8 offset-xs2 sm6 md6 mt-3>
    
            <v-text-field label="როლი" placeholder="როლი" v-model="postItem.role"></v-text-field>
    
        </v-flex>
    
        <v-flex v-for="perm in permissions" :key=perm.id xs3 ml-4 >
    
            <v-checkbox :label="perm.permission" v-model="selected" :value="perm.id" ></v-checkbox>
    
        </v-flex>
    
        
    <v-flex xs6 offset-xs4>
            <v-btn color="blue" class="mt-5" right @click="sendreq">დამახსოვრება</v-btn>  
              
            <p>{{this.selected}}</p>       
            <p>{{this.postItem.role}}</p>       
    </v-flex>
    
      
    </v-layout>
</template>

<script>
    import axios from 'axios';
    
    export default {
    
        data() {
    
            return {
    
                selected: [],
    
                permissions: [],

                postItem: {
                    role: '',
                    permissionRoles:[]
                }
    
            }
    
        },

        methods: {

            sendreq(){
                this.AddPermission()
                this.SaveRole()
            },
           
            SaveRole(){ 
                 console.log(this.postItem)
                axios.post(this.$store.state.baseUrl + '/Roles', this.postItem)
                .then(res=>{
                    console.log(res)
                            this.postItem.permissionRoles = null
                            this.selected = null
                            this.postItem.role = null
                })
                .catch(err=>{
                    console.log(err)
                           this.postItem.permissionRoles = null
                           this.selected = null
                           this.postItem.role = null
                })

         
            },

            AddPermission(){                 
               
                for(i=0; i<this.selected.length; i++){
                   let item = {
                        permissionId : this.selected[i]
                    }
              
                    this.postItem.permissionRoles.push(item)
                }

                 console.log(this.postItem)
            }
        },
    
        created() {
    
            console.log(this.$store.state.baseUrl)
    
            axios.get(this.$store.state.baseUrl + '/Premissions')
    
                .then(res => {
    
                    const permissionsRes = res.data
    
                    for (let key in permissionsRes) {
    
                        const permissionRes = permissionsRes[key]
    
                        const permis = {
    
                            id: permissionRes.id,
    
                            permission: permissionRes.permission
    
                        }
    
                        this.permissions.push(permis)
    
                    }
    
                    console.log(this.permissions)
    
                })
    
        },
    
    }
</script>

<style>
    
</style>
