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
  export default {
  
    data() {
  
      return {
  
        search: '',
  
        Accidents: [{
  
            priority: 'Hige',
  
            floor: 1,
  
            type: 'ნათურა დამწვარია',
  
            Building: 'ვაჟა',
  
            sector: 'A',
  
            Owner: 'Beqa'
  
          },
  
          {
  
            priority: 'Hige',
  
            floor: 2,
  
            type: 'კანდინციონერია დამწვარია',
  
            Building: 'ქავთარაძე',
  
            sector: 'c',
  
            Owner: 'Beqa'
  
          },
  
          {
  
            priority: 'Hige',
  
            floor: 4,
  
            type: 'შენობას სახე აეხა',
  
            Building: 'ვაჟა',
  
            sector: 'x',
  
            Owner: 'Beqa'
  
          },
  
          {
  
            priority: 'Low',
  
            floor: 16,
  
            type: 'ფანჯრები გაწმინდეთ ბლინ',
  
            Building: 'ვაჟა',
  
            sector: 'z',
  
            Owner: 'Temo'
  
          },
  
          {
  
            priority: 'Hige',
  
            floor: 1,
  
            type: 'ჩასარეცხია',
  
            Building: 'ქავთარაძე',
  
            sector: 'b',
  
            Owner: 'Beqa'
  
          },
  
          {
  
            priority: 'Medium',
  
            floor: 1,
  
            type: 'ჩასარეცხია',
  
            Building: 'ქავთარაძე',
  
            sector: 'b',
  
            Owner: 'Beqa'
  
          },
  
          {
  
            priority: 'Hige',
  
            floor: 13,
  
            type: 'ჩასარეცხია',
  
            Building: 'ქავთარაძე',
  
            sector: 'b',
  
            Owner: 'Beqa'
  
          },
  
        ],
  
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
