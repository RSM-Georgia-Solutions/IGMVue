<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs8 text-xs-center mt-5>
                <v-card color="primary" dark text-xs-center> 
                    <v-card-text  class="px-2">გეგმიური სამუშაო N1</v-card-text> 
                </v-card>
            </v-flex>

                 <v-radio-group v-model="picked1" row >
    
                    <v-flex xs4 ml-2 mt-5>
    
                        <v-radio color="success" label="✓" value="Two"></v-radio>
    
                    </v-flex>
    
                    <v-flex ml-2 mt-5>
    
                        <v-radio color="error" label="X" value="Three"></v-radio>
    
                    </v-flex>
    
                </v-radio-group>

            <v-flex xs8 text-xs-center mt-5>
                <v-card color="primary" dark> 
                    <v-card-text  class="px-2">გეგმიური სამუშაო N2</v-card-text> 
                </v-card>
            </v-flex>
             <v-radio-group v-model="picked1" row >
    
                    <v-flex xs4 ml-2 mt-5>
    
                        <v-radio color="success" label="✓" value="Two"></v-radio>
    
                    </v-flex>
    
                    <v-flex ml-2 mt-5>
    
                        <v-radio color="error" label="X" value="Three"></v-radio>
    
                    </v-flex>
    
                </v-radio-group>
            <v-flex xs8 text-xs-center mt-5>
                <v-card  color="primary" dark> 
                    <v-card-text  class="px-2">გეგმიური სამუშაო N3</v-card-text> 
                </v-card>
            </v-flex>
 <v-radio-group v-model="picked1" row >
    
                    <v-flex xs4 ml-2 mt-5>
    
                        <v-radio color="success" label="✓" value="Two"></v-radio>
    
                    </v-flex>
    
                    <v-flex ml-2 mt-5>
    
                        <v-radio color="error" label="X" value="Three"></v-radio>
    
                    </v-flex>
    
                </v-radio-group>
            <v-flex xs8 text-xs-center mt-5>
                <v-card color="primary" dark> 
                    <v-card-text  class="px-2">გეგმიური სამუშაო N4</v-card-text> 
                </v-card>
            </v-flex>
 <v-radio-group v-model="picked1" row >
    
                    <v-flex xs4 ml-2 mt-5>
    
                        <v-radio color="success" label="✓" value="Two"></v-radio>
    
                    </v-flex>
    
                    <v-flex ml-2 mt-5>
    
                        <v-radio color="error" label="X" value="Three"></v-radio>
    
                    </v-flex>
    
                </v-radio-group>
            <v-flex xs8  mt-5>
                <v-card color="primary" dark> 
                    <v-card-text  class="px-2">გეგმიური სამუშაო N5</v-card-text> 
                </v-card>
            </v-flex>
             <v-radio-group v-model="picked1" row >
    
                    <v-flex xs4 ml-2 mt-5>
    
                        <v-radio color="success" label="✓" value="Two"></v-radio>
    
                    </v-flex>
    
                    <v-flex ml-2 mt-5>
    
                        <v-radio color="error" label="X" value="Three"></v-radio>
    
                    </v-flex>
    
                </v-radio-group>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            picked1: 'One',
        }
    }
}
</script>

<style>

</style>
