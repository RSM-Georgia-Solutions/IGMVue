<template> 
  <v-card>
  
    <v-card-title>
  
      Accidents
  
      <v-spacer></v-spacer>
  
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
  
    </v-card-title>
  
    <v-data-table :headers="headers" :items="Accidents" :search="search">
  
      <template slot="items" slot-scope="props">
  
                <td>{{ props.item.Building }}</td>
  
                <td @click="NavigateToAccident" class="text-xs-left">{{ props.item.Building }}</td>
  
                <td  @click="NavigateToAccident" class="text-xs-left">{{ props.item.floor }}</td>
  
                <td @click="NavigateToAccident" class="text-xs-left">{{ props.item.sector }}</td>
  
                <td @click="NavigateToAccident" class="text-xs-left">{{ props.item.type }}</td>
  
                <td  @click="NavigateToAccident" class="text-xs-left">{{ props.item.priority }}</td>
  
                <td  @click="NavigateToAccident" class="text-xs-left">{{ props.item.Owner }} </td>
</template>

      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
       </v-data-table>
 </v-card>
</template>

<script>
  import axios from 'axios';
  
  export default {
  
    created() {
  
      axios.get(this.$store.state.baseUrl + '/accidents', {
  
        'headers': {
  
          Authorization:
  
            'Bearer ' + localStorage.token
  
        }
  
      }).then(res => {
  
        const accidentsRes = res.data
        for (let key in accidentsRes) {
    
          const accidentRes = accidentsRes[key]
    
          this.Accidents.push(accidentRes)
    
          }
    
        console.log(res.data)

      }).catch(err => {
  
        console.log(err)
  
      })
  
    },
  
    data() {
  
      return {
  
        search: '',
  
        Accidents: [],
  
        headers: [{
  
            text: 'Select',
  
            align: 'left',
  
            sortable: false,
  
          },
  
          {
  
            text: 'ბრენჩი',
  
            value: 'Building'
  
          },
  
          {
  
            text: 'სართული',
  
            value: 'floor'
  
          },
  
          {
  
            text: 'სექტორი',
  
            value: 'sector'
  
          },
  
          {
  
            text: 'პრიორიტეტი',
  
            value: 'priority'
  
          },
  
          {
  
            text: 'ტიპი',
  
            value: 'type'
  
          },
  
          {
  
            text: 'პასუხისმგებელი პირი',
  
            value: 'Owner'
  
          }
  
        ],
  
      }
  
    },
  
    methods: {
  
      NavigateToAccident() {
  
        this.$router.push({
  
          name: 'Accident'
  
        });
  
      }
  
    }
  
  }
</script>

<style>
  
</style>
