<template>
  <div>
    <v-snackbar
      v-model="isSuccess"
      :timeout="6000"
      color="success"
      :bottom="true"
    >საწყობი წარმატებით დაემატა</v-snackbar>

    <v-toolbar flat color="white">
      <v-toolbar-title>საწყობები</v-toolbar-title>

      <v-divider class="mx-2" inset vertical></v-divider>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">საწყობის დამატება</v-btn>

        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="editedItem.code"
                    placeholder="კოდი"
                    label="კოდი"
                    :disabled="editedIndex != -1"
                  ></v-text-field>
                </v-flex>
                <!-- 
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="editedItem.branch"
                    placeholder="დასახელება"
                    label="დასახელება"
                    required
                    :rules="itemNameRules"
                  ></v-text-field>
                </v-flex>-->
                <v-flex xs12 sm12 md12>
                  <v-autocomplete
                    label="ფილიალი"
                    :items="branches"
                    item-text="branchName"
                    v-model="editedItem.branchClass"
                    return-object
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>

            <v-btn color="blue darken-1" flat @click.native="save" :disabled="!formIsValid">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table :headers="headers" :items="WareHouses" :search="search">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.code }}</td>

        <td class="text-xs-left">{{ props.item.branchClass.branchName }}</td>

        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>
     

<script>
import axios from "axios";

export default {
  created() {
    this.axios
      .get(this.$store.state.baseUrl + "/warehouse")

      .then(res => {
        const itemsRes = res.data;

        for (let key in itemsRes) {
          const itemRes = itemsRes[key];
          this.WareHouses.push(itemRes);
        }
        console.log(this.WareHouses);
      })

      .catch(error => console.log(error));

    axios
      .get(this.$store.state.baseUrl + "/branches")

      .then(res => {
        const branchesData = res.data;

        for (let key in branchesData) {
          const branch = {
            id: branchesData[key].id,
            branchName: branchesData[key].branchName
          };

          this.branches.push(branch);
        }
      })

      .catch(err => console.log(err));
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "საწყობის დამატება"
        : "საწყობის კორექტირება";
    },

    formIsValid() {
      return this.editedItem.code;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  data() {
    return {
      itemNameRules: [v => !!v || "branch is required"],

      itemCodeRules: [v => !!v || "Code is required"],

      search: "",

      branches: [],

      dialog: false,

      editedIndex: -1,

      isSuccess: false,

      editedItem: {
        branch: "",
        branchClass: {
          id: 0
        },
        code: ""
      },

      defaultItem: {
        branch: "",

        code: ""
      },

      headers: [
        {
          text: "საწყობის კოდი",

          value: "code"
        },

        {
          text: "საწყობის დასახელება",

          value: "branch"
        }
      ],

      WareHouses: []
    };
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.WareHouses.indexOf(item);

      this.editedItem = Object.assign({}, item);

      this.dialog = true;
    },

    close() {
      this.dialog = false;

      setTimeout(() => {
        this.editedItem = Object.assign({}, this.editItem);

        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        axios

          .put(this.$store.state.baseUrl + "/WareHouse/", this.editedItem)

          .then(res => {
            Object.assign(this.WareHouses[this.editedIndex], this.editedItem);

            this.close();
            if (res.data.isSuccess == "false") {
              console.log(res.data);
            } else {
              this.WareHouses.push(this.editedItem);
              this.isSuccess = true;
              this.close();
            }
          })

          .catch(error => console.log(error));
      } else {
        axios

          .post(this.$store.state.baseUrl + "/WareHouse/", this.editedItem)

          .then(res => {
            console.log(res, "RESPONSE ");

            if (res.data.isSuccess == "false") {
              console.log(res.data);
            } else {
              this.WareHouses.push(this.editedItem);
              this.isSuccess = true;
              this.close();
            }
          })

          .catch(error =>
            console.log("eeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrrorrr" + error)
          );
      }
    }
  }
};
</script>

<style>
</style>
