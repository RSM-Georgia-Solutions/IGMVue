<template>
    <v-container fluid>
    
        <v-layout column>
    
            <v-btn color="teal darken-2" dark class="mt-5" :to="{name:'Tasks'}">დავალებები</v-btn>
    
            <v-btn color="success" class="mt-4" :to="{name:'NewAccident'}">ინციდენტის დამატება</v-btn>
    
            <v-btn color="warning" class="mt-4" :to="{name:'OpenAccidents'}">ღია ინციდენტები</v-btn>
    
            <v-btn color="info" class="mt-4" :to="{name:'PlannedWorks'}">გეგმიური სამუშაოები</v-btn>
    
            <v-btn color="cyan" class="mt-4" :to="{name:'Inventory'}">მარაგები</v-btn>
    
            <v-btn color="pink" class="mt-4" :to="{name:'Vendors'}">ვენოდრები</v-btn>

            <v-btn color="purple" class="mt-4" :to="{name:'Users'}">მომხმარებლები</v-btn>
    
            <v-btn color="teal accent-3" class="mt-4" :to="{name:'Report'}" dark>რეპორტები</v-btn>

            <v-btn color="blue accent-3" class="mt-4" :to="{name:'Autorizations'}" dark>ავტორიზაციები</v-btn>
    
        </v-layout>
    
    </v-container>
</template>

<script>
    import axios from 'axios'
    
    export default {
    
        created() {
    
            axios.get(this.$store.state.baseUrl + '/Users',
    
                    {
    
                        'headers': {
    
                            Authorization:
    
                                'Bearer ' + this.$store.state.token
    
                        }
    
                    }
    
                )
    
                .then(res => console.log(res))
    
                .catch(error => {
    
                    console.log('error = ' + error)
    
                    // this.$router.push({
    
                    //     name: 'Login'
    
                    // })
    
                })
    
        },
    
        data() {
    
            return {
    
            }
    
        }
    
    }
</script>

<style>
    
</style>
