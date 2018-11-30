<template>
    <div>
    
        <v-toolbar flat color="white">
    
            <v-toolbar-title>Roles</v-toolbar-title>
    
            <v-divider class="mx-2" inset vertical></v-divider>
    
            <v-spacer></v-spacer>

            <v-btn small fab color="success" :to="{name:'NewRole'}">
                 <v-icon dark>add</v-icon>
            </v-btn>
    
        </v-toolbar>
    
        <v-data-table :headers="headers" :items="Roles" :search="search">
    
            <template slot="items" slot-scope="props"> 
    
                     <td  @click="NavigateToRoles"  class="text-xs-left">{{ props.item.id }}</td>
    
                     <td  @click="NavigateToRoles" class="text-xs-left">{{ props.item.role }}</td>
    
                    <td class="justify-center layout px-0">
    
              

                        <v-icon
    
                         small
    
                         @click="deleteItem(props.item)"
    
                       >
    
                        delete
    
                      </v-icon>
    
                     </td>
</template>

      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
       </v-data-table>
 </v-card>
 </div>
</template>

<script>
    import axios from 'axios';
    
    export default {
    
        created() {
    
            axios.get('https://localhost:44317/api/Roles')
    
                .then(res => {
                  
                    const RolesRes = res.data
                    

                    for (let key in RolesRes) {
    
                        const RolerRes = RolesRes[key]
                           
                        this.Roles.push(RolerRes)
    
                    }
                       console.log(this.Roles)
                })
    
                .catch(error => console.log(error))
    
        },
    
        data() {
    
            return {
    
                search: '',
    
                editedIndex: -1,
    
                editedItem: {
    
                    Id: '',
    
                    Role: ''
    
                },
    
                headers: [{
    
                        text: 'კოდი',
    
                        value: 'Code',
    
                    },
    
                    {
    
                        text: 'როლი',
    
                        value: 'Role'
    
                    }
    
                ],
    
                Roles: [],
    
            }
    
        },

        methods : {
             deleteItem(item) {
    
                const index = this.Roles.indexOf(item)
                console.log(item.id)
    
                var confirmed = confirm('Are you sure you want to delete this item?') && this.Roles.splice(index, 1)
    
                if (confirmed) {
    
                    axios.delete('https://localhost:44317/api/Roles', {
    
                            params: {
    
                                id: item.id
    
                            }
    
                        })
    
                        .then(res => console.log(res))
    
                        .catch(error => console.log('error'))
    
                }
    
            },

            
      NavigateToRoles() {
          console.log('aaa')
        this.$router.push({
  
          name: 'Role'
  
        });
  
      }
        }
    
    }
</script>

<style>
    
</style>
