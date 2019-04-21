<template>
  <v-app>
    <v-container row wrap>
      <v-layout v-for="group in Groups" :key="group.groupName">
        <v-flex>
          <v-btn dark :to="{name:'Group', params:{id:group.id}}" block light :style="group.style">
            <span style="position:fixed; text-color white">{{group.groupName}}</span>
            <span
              style="margin-left: 750px;"
            >{{group.tasksNoProblemCount}} / {{group.tasksProblemCount}} / {{group.tasksNotCheckedCount}}</span>
          </v-btn>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs12>
          <v-btn :to="{name:'NewGroup'}" color="primary" class="mt-4 pa-1">ახალი ჯგუფი</v-btn>
        </v-flex>

        <v-flex xs6 offset-lg8>
          <v-btn :to="{name:'NewTask'}" color="primary" class="mt-4 pa-1">ახალი დავალება</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import uniq from "lodash/uniq";
export default {
  data() {
    return {
      Tasksxx: [
        {
          Name: "შლაგბაუმის სისტემა",

          Progress: "7/8",

          color: "grey",

          colorH1: "color : grey"
        }
      ],

      Tasks: [],
      tasks: [],
      Groups: [],
      TasksHistory: []
    };
  },

  async created() {
    this.CreateHistory();
  },

  computed: {
    unicGroups() {
      return uniq(this.Groups.map(g => g.groupId && g.groupName));
    }
  },

  methods: {
    AddNewGroup() {
      this.Tasks.push({});
    },

    CreateHistory() {
      return this.axios
        .get(this.$store.state.baseUrl + "/TaskDailyHistory/GetTaskHistory")
        .then(res => {
          this.getGroups();
        });
    },

    getGroups() {
      this.axios
        .get(this.$store.state.baseUrl + "/taskgroups")
        .then(res => {
          const GroupsRes = res.data;
          console.log(res.data)
          for (let key in GroupsRes) {
            const GroupRes = GroupsRes[key];
            // console.log(GroupRes.tasksProblemCount/GroupRes.tasksCount * 100)
            // console.log(GroupRes.tasksNoProblemCount/GroupRes.tasksCount * 100)
            // console.log(GroupRes.tasksNotCheckedCount/GroupRes.tasksCount * 100)
            GroupRes.style =
              "background: linear-gradient(-60deg, red 0% redPercent%, green redPercent%, green greenPercent%, gray greenPercent%, gray grayPercent%);";
            GroupRes.style = GroupRes.style.replace("redPercent", GroupRes.tasksProblemCount/GroupRes.tasksCount * 100);
            GroupRes.style = GroupRes.style.replace("redPercent", GroupRes.tasksProblemCount/GroupRes.tasksCount * 100);
            GroupRes.style = GroupRes.style.replace("greenPercent", GroupRes.tasksNoProblemCount/GroupRes.tasksCount * 100);
            GroupRes.style = GroupRes.style.replace("greenPercent", GroupRes.tasksNoProblemCount/GroupRes.tasksCount * 100);
            GroupRes.style = GroupRes.style.replace("grayPercent", GroupRes.tasksNotCheckedCount/GroupRes.tasksCount * 100);     
            GroupRes.style = GroupRes.style.replace("grayPercent", GroupRes.tasksNotCheckedCount/GroupRes.tasksCount * 100);     
            this.Groups.push(GroupRes);     
          }        
        })
        .catch(err => {});
    },

    getHistory(groupId) {
      this.axios
        .get(this.$store.state.baseUrl + "/TaskGroups/" + groupId)
        .then(res => {
          const tasksRes = res.data.tasks;
          for (let key in tasksRes) {
            const taskRes = tasksRes[key];
            taskRes.createDate = new Date().toISOString().substr(0, 10);
            //  taskRes.taskDailyId = taskRes.id;
            taskRes.taskGroupId = groupId;
            this.tasks.push(taskRes);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    paint(groupId) {
      var x = this.tasks;
      console.log(x, "xxxxxxxxxxx");
    }
  }
};
</script>

<style>
.x {
  background: linear-gradient(-60deg, red 20%, rgb(12, 241, 12) 50%, gray 100%);
}
</style>
