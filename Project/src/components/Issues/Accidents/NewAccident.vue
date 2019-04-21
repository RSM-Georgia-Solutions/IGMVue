<template>
  <v-container fluid>
    <v-layout align-space-around justify-space-around column fill-height>
      <v-form ref="form">
        <v-autocomplete
          :items="Types"
          item-text="task"
          item-value="task"
          v-model="Accident.type"
          label="ტიპი"
          placeholder="არჩევა..."
          :rules="TypeRule"
          required
        ></v-autocomplete>

        <v-autocomplete
          :items="buildings"
          item-text="branch"
          item-value="id"
          v-model="defaultBranch"
          label="შენობა"
          placeholder="არჩევა..."
          required
          :rules="buildingsRule"
          @change="onBuildingChange"
        ></v-autocomplete>

        <v-autocomplete
          :items="buildingFloors"
          label="სართული"
          placeholder="არჩევა..."
          required
          v-model="defaultFloor"
          :rules="floorRule"
          @change="onFloorChange"
        ></v-autocomplete>

        <v-autocomplete
          v-if="false"
          :items="floorSectors"
          item-text="name"
          item-value="id"
          v-model="Accident.SectorId"
          label="სექტორი"
          placeholder="არჩევა..."
          :rules="sectorRule"
          required
        ></v-autocomplete>

        <!-- <v-autocomplete
          :items="Priority"
          item-text="Name"
          item-value="id"
          v-model="Accident.Priority"
          label="პრიორიტეტი"
          placeholder="არჩევა..."
          :rules="priorityRule"
          required
        ></v-autocomplete>-->

        <v-autocomplete
          :items="users"
          item-text="username"
          item-value="id"
          v-model="Accident.userId"
          label="პასუხისმგებელი პირი"
          placeholder="არჩევა..."
          :rules="userRule"
          required
        ></v-autocomplete>

        <v-autocomplete
          :items="Status"
          v-model="Accident.Status"
          label="სტატუსი"
          placeholder="არჩევა..."
          :rules="statusRule"
          required
        ></v-autocomplete>

        <v-menu
          :close-on-content-click="false"
          v-model="menu2"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="Accident.DueDate"
            label="შესრულების თარიღი"
            readonly
          ></v-text-field>

          <v-date-picker v-model="Accident.DueDate" @input="menu2 = false"></v-date-picker>
        </v-menu>

        <v-textarea placeholder="კომენტარი" v-model="Accident.Comment"></v-textarea>

        <v-content>
          <v-container fluid>
            <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
              <img :src="imageUrl" height="150" v-if="imageUrl">
              <v-text-field
                label="Select Image"
                @click="pickFile"
                v-model="imageName"
                prepend-icon="attach_file"
              ></v-text-field>
              <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                :rules="imageRule"
                @change="onFilePicked"
              >
            </v-flex>
          </v-container>
        </v-content>
      </v-form>

      <v-btn
        :disabled="disabledButton"
        :loading="dialog"
        color="success"
        @click="dialog2 = true; AddAccident()"
      >ინციდენტის დამატება</v-btn>

      <v-dialog v-model="dialog2" hide-overlay persistent max-width="590">
        <v-card color="blue-grey lighten-1" dark>
          <v-card-text>
            მიმდინარეობს დამატება
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog" hide-overlay persistent max-width="590">
        <v-card color="white" dark>
          <v-card-title :class="dialogColor">{{dialogText}}</v-card-title>
          <v-card-actions>
            <v-btn :color="dialogColor" flat @click.native="dialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  created() {
    axios
      .get(this.$store.state.baseUrl + "/TasksDaily")
      .then(res => {
        const tasksRes = res.data;
        for (let key in tasksRes) {
          const task = tasksRes[key];
          this.Types.push(task);
        }
        axios
          .get(this.$store.state.baseUrl + "/PlannedWorks")
          .then(res => {
            const PlannedWorksRes = res.data;
            for (let key in PlannedWorksRes) {
              const PlannedWoksRes = PlannedWorksRes[key];
              const taskx = {};
              taskx.id = PlannedWoksRes.id;
              taskx.task = PlannedWoksRes.name;
              this.Types.push(taskx);
            }
          })
          .catch(err => {
            console.log(err);
          });

        var gocha = Array.from(this.Types);
        var x2 = gocha.find(x => x.id == this.$route.params.id.taskId).task;
        this.taskHistoryObject = this.$route.params.id;
        this.Accident.type = x2;
      })
      .catch(err => {
        console.log(err);
        return;
      });

    axios
      .get(this.$store.state.baseUrl + "/Helper/GetPriorities")
      .then(res => {
        const PrioritiesRes = res.data;

        for (let key in PrioritiesRes) {
          const priority = PrioritiesRes[key];

          this.Priority.push(priority);
        }
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(this.$store.state.baseUrl + "/Helper/GetStatuses")

      .then(res => {
        const statusesRes = res.data;

        for (let key in statusesRes) {
          const status = statusesRes[key];
          this.Status.push(status);
        }
        this.Accident.Status = this.Status[0];
      })

      .catch(err => {
        console.log(err);
      });

    axios
      .get(this.$store.state.baseUrl + "/buildings")

      .then(res => {
        const BuildingsRes = res.data;

        for (let key in BuildingsRes) {
          const BuildingRes = BuildingsRes[key];
          this.buildings.push(BuildingRes);
        }
        this.defaultBranch = this.buildings[0].id;
        this.defaultFloor = Array.from(this.buildings[0].floors)[0].floorNumber;
        this.activeBuilding = this.buildings[0];
        this.activeFloor = Array.from(this.buildings[0].floors)[0];
        console.log(this.activeFloor.sectors[0], "sec");
        this.Accident.SectorId = this.activeFloor.sectors[0].id;
      })
      .catch(error => console.log(error));

    this.axios
      .get(this.$store.state.baseUrl + "/users")
      .then(res => {
        const UsersRes = res.data;

        for (let key in UsersRes) {
          const UserRes = UsersRes[key];

          this.users.push(UserRes);
        }
      })

      .catch(error => {
        console.log(error);
      });
  },

  data: () => ({
    taskHistoryObject: {},

    disabledButton: true,

    defaultBranch: null,
    defaultFloor: null,

    TypeRule: [v => !!v || "ტიპი აუცილებელია"],
    buildingsRule: [v => !!v || "შენობა აუცილებელია"],
    floorRule: [v => !!v || v == 0 || "სართული აუცილებელია"],
    sectorRule: [v => !!v || "სექტორი აუცილებელია"],
    // priorityRule: [v => !!v || "პრიორიტეტი აუცილებელია"],
    userRule: [v => !!v || "პასუხისმგებელი პირი აუცილებელია"],
    statusRule: [v => !!v || "სტატუსი აუცილებელია"],
    imageRule: [v => !!v || "სურათი აუცილებელია"],

    menu2: false,

    dialog: false,
    dialog2: false,

    dialogText: "",

    dialogColor: "",

    activeBuilding: null,

    activeFloor: null,

    Types: [],

    Status: [],

    Priority: [],

    title: "Image Upload",

    dialog: false,

    imageName: "",

    imageUrl: "",

    imageFile: "",

    buildings: [],

    users: [],

    Accident: {
      Type: "",

      SectorId: "",

      // Priority: "",

      userId: null,

      Comment: "",

      Base64Image: "",

      CreateDate: new Date().toISOString().substr(0, 10),

      DueDate: new Date().toISOString().substr(0, 10),

      Status: ""
    },
    ShowAlertVar: "None"
  }),

  computed: {
    buildingFloors() {
      if (this.activeBuilding)
        return this.activeBuilding.floors.map(function(f) {
          return f.floorNumber;
        });

      return [];
    },

    floorSectors() {
      if (this.activeFloor)
        return this.activeFloor.sectors.map(function(f) {
          return f;
        });

      return [];
    }
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.disabledButton = false;
        return true;
      } else {
        this.disabledButton = true;
        return false;
      }
    },
    reset() {
      this.$refs.form.reset();
      this.imageFile = null;
      this.imageUrl = null;
      this.Accident.Base64Image = null;
    },
    getFiles(files) {},
    AddAccident() {
      console.log(this.Accident);
      this.axios
        .post(this.$store.state.baseUrl + "/accidents", this.Accident)
        .then(res => {
          console.log(res, "accccc");
          if (res.status == "202") {
            this.dialogText = "ინციდენტი წარმატებით დაემატა";
            this.dialogColor = "success";
            this.dialog2 = false;
            this.dialog = true;
            this.reset();

            this.taskHistoryObject.AccidentId = res.data.id;
            console.log(this.taskHistoryObject);
            this.axios
              .put(
                this.$store.state.baseUrl +
                  "/TaskDailyHistory/UpdateTaskHistory",
                this.taskHistoryObject
              )
              .then(res => {
                console.log(res, "aaaaaaaaaaaaaaaaaaaa");
              });
          } else {
          }
        })
        .catch(error => {
          this.dialogText = "ინციდენტის დამატება ვერ მოხერხდა";
          this.dialogColor = "error";
          this.dialog2 = false;
          this.dialog = true;
          console.log(error);
        });
    },

    mounted() {
      this.video = this.$refs.video;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        stream => {
          this.video.src = window.URL.createObjectURL(stream);

          this.video.play();
        };
      }
    },

    onBuildingChange(buildingId) {
      var building = this.buildings.find(b => b.id == buildingId);
      this.activeBuilding = building;
    },

    onFloorChange(floor) {
      var floor = this.activeBuilding.floors.find(b => b.floorNumber == floor);
      this.Accident.SectorId = floor.sectors[0].id;
      this.activeFloor = floor;
    },

    pickFile() {
      if (!this.validate()) {
        return;
      }
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const files = e.target.files;

      if (files[0] !== undefined) {
        this.imageName = files[0].name;

        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }

        const fr = new FileReader();

        fr.readAsDataURL(files[0]);

        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.Accident.Base64Image = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";

        this.imageFile = "";

        this.imageUrl = "";
      }
    }
  }
};
</script>

<style>
</style>
