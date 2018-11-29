<template>
  <v-flex ma-2>
    <v-card>
      <v-img
        class="white--text"
        height="250px"
        :src="Building.image"
      >
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline"></span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
      <v-card-title>
        <div>
          <span class="grey--text">{{Building.branch}}</span><br>
          <span>Whitehaven Beach</span><br>
          <span>Whitsunday Island, Whitsunday Islands</span>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn  color="light-blue darken-2" dark>Edit</v-btn>           
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
    export default {    
        props:['Building']
    }

 
</script>

<style>
    
</style>
