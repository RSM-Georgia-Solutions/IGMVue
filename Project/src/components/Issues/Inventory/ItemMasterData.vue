<template>
  <div>
    <v-snackbar
      v-model="isSuccess"
      :timeout="6000"
      color="success"
      :bottom="true"
    >საქონელი წარმატებით დაემატა</v-snackbar>
    <v-toolbar flat color="white">
      <v-toolbar-title>საქონლის ცნობარი</v-toolbar-title>

      <v-divider class="mx-2" inset vertical></v-divider>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">საქონლის დამატება</v-btn>

        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="editedItem.itemCode"
                    placeholder="კოდი"
                    label="კოდი"
                    required
                    :disabled="editedIndex != -1"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="editedItem.itemName"
                    placeholder="დასახელება"
                    label="დასახელება"
                    required
                    :rules="itemNameRules"
                  ></v-text-field>
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

    <v-data-table :headers="headers" :items="ItemMasterData">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.itemCode }}</td>

        <td class="text-xs-left">{{ props.item.itemName }}</td>

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
    axios
      .get(this.$store.state.baseUrl + "/itemMasterData", {
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })

      .then(res => {
        const itemsRes = res.data;

        for (let key in itemsRes) {
          const itemRes = itemsRes[key];

          this.ItemMasterData.push(itemRes);
        }
      })

      .catch(error => console.log(error));

    axios
      .get(this.$store.state.baseUrl + "/itemMasterData", {
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
      .then(response => {
        console.log("aaaaaaaaaaa");
        self.message = "Data is entered";
      })
      .catch(error => {
        self.message = "Error";
      });
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "საქონლის დამატება"
        : "საქონლის კორექტირება";
    },

    formIsValid() {
      return this.editedItem.itemName;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  data() {
    return {
      itemNameRules: [v => !!v || "Name is required"],

      itemCodeRules: [v => !!v || "Code is required"],

      isSuccess: false,

      search: "",

      dialog: false,

      editedIndex: -1,

      editedItem: {
        itemName: "",

        itemCode: ""
      },

      defaultItem: {
        itemName: "",

        itemCode: ""
      },

      headers: [
        {
          text: "საქონლის კოდი",

          value: "ItmeCode"
        },

        {
          text: "საქონლის დასახელება",

          value: "itemName"
        }
      ],

      ItemMasterData: []
    };
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.ItemMasterData.indexOf(item);

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
        console.log(this.editedItem, "aaaaaaaaaa");

        axios
          .put(this.$store.state.baseUrl + "/itemmasterdata/", this.editedItem)

          .then(res => {
            Object.assign(
              this.ItemMasterData[this.editedIndex],
              this.editedItem
            );
            self.message = "Data is entered";
            console.log("aaaaaaaaaaaa");
            this.close();
          })

          .catch(error => console.log(error));
      } else {
        axios
          .post(this.$store.state.baseUrl + "/itemmasterdata/", this.editedItem)

          .then(res => {
            console.log(this.editedItem.itemCode);

            if (res.data.isSuccess == "false") {
              console.log(res.data);
            } else {
              this.ItemMasterData.push(this.editedItem);
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
