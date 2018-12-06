<template>
    <v-container grid-list-xs>
    
        <v-layout row wrap>
    
            <v-flex xs8 offset-xs2 mt-5>
    
                <h1>Login</h1>
    
                <v-text-field :rules="emailRules" v-model="credentials.username" label="Email" placeholder="Email"></v-text-field>
    
                <v-text-field :rules="passwordlRules" v-model="credentials.password" label="Password" placeholder="Password" type="Password" autocomplete="new-password" id="id"></v-text-field>
    
            </v-flex>
    
            <v-flex xs8 offset-xs2 text-xs-center mt-3>
    
                <v-btn class="success" @click="authenticate" dark align-center>
    
                    <v-icon left>account_circle</v-icon>
    
                    Login</v-btn>
    
            </v-flex>
    
        </v-layout>
    
    </v-container>
</template>

<script>
    import axios from 'axios';
    
    export default {
    
  

        data() {
    
            return {
    
                credentials: {
    
                    username: "",
    
                    password: ""
    
                },
    
                emailRules: [
    
                    v => !!v || 'E-mail is required',
    
                    v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(v) || 'E-mail must be valid'
    
                ],
    
                passwordlRules: [
    
                    v => !!v || 'Password is required'
    
                ]
    
            }
    
        },
    
           mutations : {
                storeToken(state, token){
                    state.token = token
                }
            },

        methods: {

         
    
            authenticate() {
    
                axios.post('https://localhost:44317/api/Users/authenticate', this.credentials)
    
                    .then(
    
                        res => {
    
                            localStorage.token = res.data.token
                            this.$router.push({
    
                                name: 'Accidents'
    
                            });
    
                        }
    
                    )
    
                    .catch(err => console.log(err))
     
    
            }
    
        }
    
    }
</script>

<style>
    
</style>
