<template>
    <v-container fluid>
    
        <v-layout justify-space-between column fill-height>
    
            <v-flex v-for="inventoryItem in inventory" :key="inventoryItem.name" xs12 text-xs-center mt-5>
    
                <v-card color="#00bfff" dark :to="{name : inventoryItem.route}">
    
                    <v-card-text class="px-2 bold">{{inventoryItem.name}}</v-card-text>
    
                </v-card>
    
            </v-flex>
    
        </v-layout>
    
    </v-container>
</template>

<script>
    export default {
    
        data() {
    
            return {
    
                inventory: [{
    
                        name: 'მარაგის შეძენის მოთხოვნა',
    
                        route: 'GoodsIssueRequest'
    
                    },
    
                    {
    
                        name: 'მარაგის მიღება',
    
                        route: 'GoodsReciept'
    
                    },
    
                    {
    
                        name: 'მარაგის ჩამოწერა ',
    
                        route: 'GoodsIssue'
    
                    },
    
                    {
    
                        name: 'ტრანზაქციების ისტორია',
    
                        route: 'WhsJournal'
    
                    }, 
    
                    {
    
                        name: 'საქონლის სია',
    
                        route: 'ItemsMasterData'
    
                    },

                      {
    
                        name: 'საწყობები',
    
                        route: 'WareHouses'
    
                    },
                    
    
                ]
    
            }
    
        }
    
    }
</script>

<style>
    
</style>
