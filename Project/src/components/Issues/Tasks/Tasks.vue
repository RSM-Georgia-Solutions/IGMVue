<template>
  <v-app>
    <v-container grid-list-md>
      <v-layout v-for="task in Tasks" :key="task.groupName" ustify-space-around>
        <v-flex xs12>
          <v-btn
            :to="{name:'HVAC'}"
            block
            :color="task.color"
            light
            class="mt-4;"
          >{{task.groupName}}</v-btn>
        </v-flex>

        <v-flex xs2>
          <h1 :style="task.colorH1">{{task.Progress}}</h1>
        </v-flex>
      </v-layout>

      <v-layout align-end justify-space-around>
        <v-btn color="warning" class="mt-5" right>ისტორია</v-btn>

        <v-btn :to="{name:'NewTask'}" color="success" class="mt-5" right>ახალი</v-btn>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      Tasksxx: [
        {
          Name: "HVAC",

          Progress: "10/9",

          color: "grey",

          colorH1: "color : grey"
        },

        {
          Name: "სახანძრო სისტმები",

          Progress: "0/6",

          color: "grey",

          colorH1: "color : grey"
        },

        {
          Name: "ინტერიერი",

          Progress: "4/9",

          color: "grey",

          colorH1: "color : grey"
        },

        {
          Name: "გარე ტეროტპროა",

          Progress: "1/7",

          color: "grey",

          colorH1: "color : grey"
        },

        {
          Name: "საპირფარეშო",

          Progress: "4/9",

          color: "grey",

          colorH1: "color : grey"
        },

        {
          Name: "შლაგბაუმის სისტემა",

          Progress: "7/8",

          color: "grey",

          colorH1: "color : grey"
        }
      ],

      Tasks: []
    };
  },

  created() {
    axios
      .get(this.$store.state.baseUrl + "/taskgroups", {
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
      .then(res => {
        const tasksRes = res.data;
        for (let key in tasksRes) {
          const taskRes = tasksRes[key];
          taskRes.color = "grey";
          this.Tasks.push(taskRes);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    AddNewGroup() {
      this.Tasks.push({});
    }
  }
};
</script>

<style>
</style>
