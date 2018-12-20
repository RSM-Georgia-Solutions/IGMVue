<template>
    <v-container fluid>
    
        <v-layout align-space-around justify-space-around column fill-height>
            <v-autocomplete :items="itemMasterData" item-text="itemName" item-value="itemName"  label="ტიპი" placeholder="არჩევა..." required @change="getWhs"></v-autocomplete>
        </v-layout>
    
    </v-container>
</template>

<script>
    import axios from 'axios';
    export default {
        created() {
            axios.get(this.$store.state.baseUrl + '/itemMasterData')
            .then(res=> {
                 const itemMasterDataRes = res.data
                 for(let key in itemMasterDataRes){
                     const item = itemMasterDataRes[key]
                     this.itemMasterData.push(item)
                 }
            })
            .catch(err=>{
                console.log(err)
            })
            
        },

        data(){
            return {
                itemMasterData : [],
                wareHouses : [],
            }
        },

        methods : {
            getWhs(){
                 axios.get(this.$store.state.baseUrl + '/warehouse')
                 .then(res=>{
                     const wareHousesRes = res.data
                     for(let key in wareHousesRes){
                     const whs = wareHousesRes[key]
                     this.wareHouses.push(whs)
                    }
                 })
                 .catch(err=>{
                     console.log(err)
                 })

                 console.log(this.wareHouses)
            }
        }
    }
</script>

<style>
    
</style>
