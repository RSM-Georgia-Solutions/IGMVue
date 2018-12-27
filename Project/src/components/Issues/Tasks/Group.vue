<template>
  <v-container fluid>
    <v-layout row wrap v-for="task in tasks" :key="task.id">
      <v-flex xs7 lg10 mt-3>
        <v-card
          @click.native="NavigateToAccident(task.Binding)"
          dark
          :class="[task.Binding == 'Two' ? 'success' : task.Binding == 'Three'? 'error' : 'grey']"
        >
          <v-card-text class="px-2">{{task.task}}</v-card-text>
        </v-card>
      </v-flex>
      <v-layout column xs5 lg2 mt-3>
        <v-radio-group v-model="task.Binding" row>
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
import axios from "axios";
export default {
  
  data() {
    return {
      tasks: []
    };
  },

  methods: {
    NavigateToAccident(picked) {
      if (picked == "Three") {
        this.$router.push({
          name: "NewAccident"
        });
      }
    }
  },

  created() {
    axios
      .get(this.$store.state.baseUrl + "/TaskGroups/" + this.$route.params.id, {
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
      .then(res => {
        const tasksRes = res.data.tasks;
        for (let key in tasksRes) {
          const taskRes = tasksRes[key];
          this.tasks.push(taskRes);
        }
        console.log(this.tasks);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>
