<template>
    <div>
    
        <v-toolbar flat color="white">
    
            <v-toolbar-title>WareHouses</v-toolbar-title>
    
            <v-divider class="mx-2" inset vertical></v-divider>
    
            <v-spacer></v-spacer>
    
        </v-toolbar>
    
        <v-data-table :headers="headers" :items="whsJournal" :search="search">
    
            <template slot="items" slot-scope="props"> 
    
                         <td  class="text-xs-left">{{ props.item.id }}</td>    
                         <td  class="text-xs-left">{{ props.item.wareHosueId }}</td> 
                         <td  class="text-xs-left">{{ props.item.wareHosueBranch }}</td> 
                         <td  class="text-xs-left">{{ props.item.itemMasterDataId }}</td> 
                         <td  class="text-xs-left">{{ props.item.itemMasterDataName }}</td> 
                         <td  class="text-xs-left">{{ props.item.postingDate }}</td> 
                         <td  class="text-xs-left">{{ props.item.systemDate }}</td> 
                         <td  class="text-xs-left">{{ props.item.quantity }}</td> 
                         <td  class="text-xs-left">{{ props.item.userName }}</td> 
                         <td  class="text-xs-left">{{ props.item.cumulativeQuantity }}</td> 
    
                         <td class="justify-center layout px-0">  
                </td>
</template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
       </v-data-table>
    
    </div>
</template>

<script>
 import axios from 'axios'; 
     
    export default {
        created() {
            axios.get(this.$store.state.baseUrl  + '/WareHouseJournal', {
                'headers': {
    
                        Authorization:
    
                            'Bearer ' + localStorage.token
    
                    }
    
            })
            .then(res=>{

                 const entriesRes = res.data
    
                    for (let key in entriesRes) {
    
                        const entryRes = entriesRes[key]
    
                        this.whsJournal.push(entryRes)
    
                    }
            })
            .catch(err=>{
                console.log(err)
            })
        },

        data(){
            return{
                search: '',
                whsJournal: [],
                headers: [
                    {
                       text : 'გატარების ნომერი',
                       value : 'id' 
                    },
                    {
                       text : 'საწყობის კოდი',
                       value : 'wareHosueId' 
                    },
                    {
                       text : 'ბრენჩი',
                       value : 'wareHosueBranch' 
                    },
                    {
                       text : 'სქონლის კოდი',
                       value : 'itemMasterDataId' 
                    },
                    {
                       text : 'საქონლის დასახელება',
                       value : 'itemMasterDataName' 
                    },
                    {
                       text : 'დაპოსტვის თარაიღი',
                       value : 'postingDate' 
                    },
                    {
                       text : 'გატარების თარიღი',
                       value : 'systemDate' 
                    },
                    {
                       text : 'რაოდენობა',
                       value : 'quantity' 
                    },
                    {
                       text : 'მომხმარებელი',
                       value : 'userName' 
                    },
                    {
                       text : 'cumulativeQuantity',
                       value : 'cumulativeQuantity' 
                    },
                ]
            }
        }
    }

</script>

<style>
    
</style>
