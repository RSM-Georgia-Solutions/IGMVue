<template>
    <div>
    
        <v-toolbar flat color="white">
    
            <v-toolbar-title>WareHouses</v-toolbar-title>
    
            <v-divider class="mx-2" inset vertical></v-divider>
    
            <v-spacer></v-spacer>
    
            <v-dialog v-model="dialog" max-width="500px">
    
                <v-btn slot="activator" color="primary" dark class="mb-2">საწყობის დამატება</v-btn>
    
                <v-card>
    
                    <v-card-title>
    
                        <span class="headline">{{ formTitle }}</span>
    
                    </v-card-title>
    
                    <v-card-text>
    
                        <v-container grid-list-md>
    
                            <v-layout wrap>
                                
                             
                                <v-flex xs12 sm12 md12>
    
                                    <v-text-field v-model="editedItem.code" placeholder="კოდი" label="კოდი"  :disabled="editedIndex != -1"></v-text-field>
    
                                </v-flex>
                             
                                <v-flex xs12 sm12 md12>
    
                                    <v-text-field v-model="editedItem.branch" placeholder="დასახელება" label="დასახელება" required :rules="itemNameRules"></v-text-field>
    
                                </v-flex>
    
                            </v-layout>
    
                        </v-container>
    
                    </v-card-text>
    
                    <v-card-actions>
    
                        <v-spacer></v-spacer>
    
                        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
    
                        <v-btn color="blue darken-1" flat @click.native="save" :disabled="!formIsValid">Save</v-btn>
    
                    </v-card-actions>
    
                </v-card>
    
            </v-dialog>
    
        </v-toolbar>
    
        <v-data-table :headers="headers" :items="WareHouses" :search="search">
    
            <template slot="items" slot-scope="props"> 
    
                     <td  class="text-xs-left">{{ props.item.code }}</td>
    
                     <td    class="text-xs-left">{{ props.item.branch }}</td> 
    
                     <td class="justify-center layout px-0">
    
           <v-icon small class="mr-2" @click="editItem(props.item)">
    
            edit
    
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
    
            axios.get(this.$store.state.baseUrl + '/warehouse', {
    
                    'headers': {
    
                        Authorization:
    
                            'Bearer ' + localStorage.token
    
                    }
    
                })
    
                .then(res => {
    
                    console.log(res)
    
                    const itemsRes = res.data
    
                    for (let key in itemsRes) {
    
                        const itemRes = itemsRes[key]
    
                        this.WareHouses.push(itemRes)
    
                    }
    
                    console.log(this.WareHouses)
    
                })
    
                .catch(error => console.log(error))
    
        },
    
        computed: {
    
            formTitle() {
    
                return this.editedIndex === -1 ? 'საქონლის დამატება' : 'საქონლის კორეკტირება'
    
            },
    
            formIsValid() {
    
                return (
    
                    this.editedItem.branch
    
                )
    
            }
    
        },
    
        watch: {
    
            dialog(val) {
    
                val || this.close()
    
            }
    
        },
    
        data() {
    
            return {
    
                itemNameRules: [
    
                    v => !!v || 'branch is required'
    
                ],
    
                itemCodeRules: [
    
                    v => !!v || 'Code is required'
    
                ],
    
                search: '',
    
                dialog: false,
    
                editedIndex: -1,
    
                editedItem: {
    
                    branch: '',
    
                    code: ''
    
                },
    
                defaultItem: {
    
                     branch: '',
    
                     code: ''
    
                },
    
                headers: [{
    
                        text: 'საწყობის კოდი',
    
                        value: 'code',
    
                    },
    
                    {
    
                        text: 'საწყობის ფილიალი',
    
                        value: 'branch'
    
                    }
    
                ],
    
                WareHouses: [],
    
            }
    
        },
    
        methods: {
    
            editItem(item) {
    
                this.editedIndex = this.WareHouses.indexOf(item)
    
                this.editedItem = Object.assign({}, item)
    
                this.dialog = true
    
            },
    
            close() {
    
                this.dialog = false
    
                setTimeout(() => {
    
                    this.editedItem = Object.assign({}, this.editItem)
    
                    this.editedIndex = -1
    
                }, 300)
    
            },
    
            save() {
    
                if (this.editedIndex > -1) {
    
                    
    
                    axios.put(this.$store.state.baseUrl + '/WareHouse/', this.editedItem)
    
                        .then(res => {
    
                            Object.assign(this.WareHouses[this.editedIndex], this.editedItem)
                            this.close()
                        })
    
                        .catch(error => console.log(error))
    
                } else {
    
                    axios.post(this.$store.state.baseUrl + '/WareHouse/', this.editedItem)
    
                        .then(res => {
    
                            console.log(res.status == '200')
    
                            if (res.data.isSuccess == 'false') {
    
                                console.log(res.data)
    
                            } else {
    
                                this.WareHouses.push(this.editedItem)
    
                                this.close()
    
                            }
    
                        })
    
                        .catch(error => console.log("eeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrrorrr" + error))
    
                }
    
            },
    
        }
    
    }
</script>

<style>
    
</style>
