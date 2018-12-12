<template>
    <v-layout row wrap>
    
        <v-flex xs12 sm6 md4>
    
            <v-menu :close-on-content-click="false" v-model="menu2" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
    
                <v-text-field slot="activator" v-model="date" label="Picker without buttons" prepend-icon="event" readonly></v-text-field>
    
                <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
    
            </v-menu>
    
        </v-flex>
    
    </v-layout>
</template>
<script>
    export default {
    
        data: () => ({
    
            date: new Date().toISOString().substr(0, 10), 
    
            menu2: false
    
        })
    
    }
</script>