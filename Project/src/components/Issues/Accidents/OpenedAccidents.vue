<template>
  <v-card>
  
    <v-card-title>
  
      Accidents
  
      <v-spacer></v-spacer>
  
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
  
    </v-card-title>
  
    <v-data-table :headers="headers" :items="AccidentsFull" :search="search">
  
      <template slot="items" slot-scope="props">
  
                    <!-- <td>{{ props.item.Building }}</td> -->
  
                    <td @click="NavigateToAccident" class="text-xs-left">{{ props.item.branch }}</td>
  
                    <td  @click="NavigateToAccident" class="text-xs-left">{{ props.item.floorNumber }}</td>
  
                    <td @click="NavigateToAccident" class="text-xs-left">{{ props.item.id }}</td>
  
                    <td @click="NavigateToAccident" class="text-xs-left">{{ props.item.priority }}</td>
  
                    <td  @click="NavigateToAccident" class="text-xs-left">{{ props.item.type }}</td>
  
                    <td  @click="NavigateToAccident" class="text-xs-left">{{ props.item.username }} </td>
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
  
        this.wtf()
  
      }).catch(err => {
  
        console.log(err)
  
      })
  
    },
  
    data() {
  
      return {
  
        search: '',
  
        Accidents: [],

        AccidentsFull: [],

        buildingDetails: [],
  
        headers: [
          
          
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
  
      wtf() {
  
        for (let index = 0; index < this.Accidents.length; index++) {
  
          const element = this.Accidents[index];  
          axios.get(this.$store.state.baseUrl + '/floors/' + element.sectorId, {
            'headers': {
              Authorization :
               'Bearer ' + localStorage.token
            }
          }).then(res=>{
            const AccidentsFull = res.data
            for (let key in AccidentsFull) {
               const AccidentFull = AccidentsFull[key]
               this.AccidentsFull.push(AccidentFull)
            }
          }).catch(err=>{
            console.log(err)
          })
            
          
        }

        console.log(this.AccidentsFull)
      
  
      },
  
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
