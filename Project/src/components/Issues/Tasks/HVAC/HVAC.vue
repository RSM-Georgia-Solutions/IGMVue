<template>
    <v-container fluid>
    
        <v-layout row wrap v-for="hvac in hvacs" :key="hvac.Name">
    
            <v-flex xs7 lg10 mt-3>
    
                <v-card @click.native="NavigateToAccident(hvac.Binding)" dark :class="[hvac.Binding == 'Two' ? 'success' : hvac.Binding == 'Three'? 'error' : 'grey']">
    
                    <v-card-text class="px-2">{{hvac.Name}}</v-card-text>
    
                </v-card>
    
            </v-flex>
    
            <v-layout column xs5 lg2 mt-3>
    
                <v-radio-group v-model="hvac.Binding" row>
    
                    <v-flex xs4 ml-2>
    
                        <v-radio color="success" label="✓" value="Two"></v-radio>
    
                    </v-flex>
    
                    <v-flex ml-2>
    
                        <v-radio color="error" label="X" value="Three"></v-radio>
    
                    </v-flex>
    
                </v-radio-group>
    
            </v-layout>
    
         
    
        </v-layout>
    
    </v-container>
</template>

<script>
    export default {
    
        data() {
    
            return {
    
                hvacs: [{
    
                        Name: 'რეფუტოპის ტემპერატურა',
    
                        Binding: 'picked1',
    
                    },
    
                    {
    
                        Name: 'ქვაბების წნევვა',
    
                        Binding: 'picked2',
    
                    },
    
                    {
    
                        Name: 'ქვაბების ტემპერატურა',
    
                        Binding: 'picked3',
    
                    },

                     {
    
                        Name: 'ფანკოლის შემოწმება (ზაფხ)',
    
                        Binding: 'picked4',
    
                    },

                     {
    
                        Name: 'ავზის გაყვანილობა',
    
                        Binding: 'picked5',
    
                    },
    
                ],
    
                picked1: 'One',
    
                picked2: 'One',
    
                picked3: 'One',
    
                picked4: 'One',
    
                picked5: 'One',
    
                picked6: 'One',
    
                picked7: 'One',
    
            }
    
        },
    
        methods: {
    
            NavigateToAccident(picked) {
    
                if (picked == "Three") {
    
                    this.$router.push({
    
                        name: 'NewAccident'
    
                    });
    
                }
    
            }
    
        }
    
    }
</script>

<style>
    
</style>
