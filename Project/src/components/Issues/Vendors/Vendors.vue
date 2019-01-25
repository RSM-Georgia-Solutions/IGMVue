<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>ვენდორები</v-toolbar-title>

      <v-divider class="mx-2" inset vertical></v-divider>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">ვენდორის დამატება</v-btn>

        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.vendorCode"
                    placeholder="კოდი"
                    label="კოდი"
                    required
                    :rules="vendorCodeRules"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.vendorName"
                    placeholder="დასახელება"
                    label="დასახელება"
                    required
                    :rules="vendorNameRules"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.contactPerson"
                    placeholder="საკონტაქტო პირი"
                    label="საკონტაქტო პირი"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.mobile"
                    placeholder="ნომერი"
                    :rules="mobileRules"
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.email"
                    placeholder="Email"
                    :rules="emailRules"
                    required
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

    <v-data-table :headers="headers" :items="Vendors">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.vendorCode }}</td>

        <td class="text-xs-left">{{ props.item.vendorName }}</td>

        <td class="text-xs-left">{{ props.item.contactPerson }}</td>

        <td class="text-xs-left">{{ props.item.mobile }}</td>

        <td class="text-xs-left">{{ props.item.email }}</td>

        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>

          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
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
      .get(this.$store.state.baseUrl + "/vendors", {
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })

      .then(res => {
        const VendorsRes = res.data;

        for (let key in VendorsRes) {
          const VendorRes = VendorsRes[key];

          this.Vendors.push(VendorRes);
        }
        console.log(this.Vendors);
      })

      .catch(error => console.log(error));
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "ვენდორის დამატება"
        : "ვენდორის კორექტირება";
    },

    formIsValid() {
      return (
        this.editedItem.vendorCode,
        this.editedItem.vendorName,
        this.editedItem.email
      );
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  data() {
    return {
      emailRules: [
        v => !!v || "E-mail is required",

        v =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
            v
          ) || "E-mail must be valid"
      ],
      vendorNameRules: [v => !!v || "Name is required"],

      vendorCodeRules: [v => !!v || "Code is required"],

      mobileRules: [
        v => !!v || "Mobile is required",

        v => /^(5)\d{8}?$/.test(v) || "Mobile number must be valid"
      ],

      passwordRule: [v => !!v || "Name is required"],

      search: "",

      dialog: false,

      editedIndex: -1,

      editedItem: {
        vendorCode: "",

        vendorName: "",

        contactPerson: "",

        mobile: "",

        email: ""
      },

      defaultItem: {
        name: "",

        calories: 0,

        fat: 0,

        carbs: 0,

        protein: 0
      },

      headers: [
        {
          text: "ვენდორის კოდი",

          value: "ვენდორის კოდი"
        },

        {
          text: "ვენდორის სახელი",

          value: "vendorName"
        },

        {
          text: "საკონტაქტო პირი",

          value: "contactPerson"
        },

        {
          text: "მობილური",

          value: "mobile"
        },

        {
          text: "email",

          value: "email"
        }
      ],

      Vendors: []
    };
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.Vendors.indexOf(item);

      this.editedItem = Object.assign({}, item);

      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.Vendors.indexOf(item);
      console.log(item);
      var confirmed =
        confirm("Are you sure you want to delete this item?") &&
        this.Vendors.splice(index, 1);

      if (confirmed) {
        axios
          .delete(this.$store.state.baseUrl + "/vendors/" + item.vendorCode)

          .then(res => console.log(res))

          .catch(error => console.log("error"));
      }
    },

    close() {
      this.dialog = false;

      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);

        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        console.log(this.editedItem);
        axios
          .put(this.$store.state.baseUrl + "/vendors", this.editedItem)

          .then(res => {
            Object.assign(this.Vendors[this.editedIndex], this.editedItem);
            this.close();
          })

          .catch(error => console.log(error));
      } else {
        axios
          .post(this.$store.state.baseUrl + "/vendors", this.editedItem)

          .then(res => {
            console.log(res);

            if (res.data.isSuccess == "false") {
              console.log(res);
            } else {
              this.Vendors.push(this.editedItem);
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
