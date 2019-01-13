<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>მომხმარებლები</v-toolbar-title>

      <v-divider class="mx-2" inset vertical></v-divider>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">მომხმარებლის დამატება</v-btn>

        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.firstName"
                    placeholder="სახელი"
                    label="სახელი"
                    required
                    :rules="userNameRule"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.lastName"
                    placeholder="გვარი"
                    label="გვარი"
                    required
                    :rules="userLastNameRule"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.username"
                    placeholder="username"
                    label="username"
                    required
                    :rules="userRule"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.password"
                    type="password"
                    placeholder="პაროლი"
                    label="პაროლი"
                    required
                    :rules="passwordRule"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.position" placeholder="პოზიცია" label="პოზიცია"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-autocomplete
                    v-model="editedItem.roles.id"
                    :items="roles"
                    item-text="role"
                    item-value="id"
                    label="როლი"
                    placeholder="არჩევა..."
                    required
                  ></v-autocomplete>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.email"
                    placeholder="email"
                    label="email"
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

    <v-data-table :headers="headers" :items="Users" :search="search">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.firstName }}</td>

        <td class="text-xs-left">{{ props.item.lastName }}</td>

        <td class="text-xs-left">{{ props.item.username }}</td>

        <td class="text-xs-left">{{ props.item.position }}</td>

        <td class="text-xs-left">{{ props.item.roles.role }}</td>

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
      .get(this.$store.state.baseUrl + "/users", {
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })

      .then(res => {
        const UsersRes = res.data;

        for (let key in UsersRes) {
          const UserRes = UsersRes[key];

          this.Users.push(UserRes);
        }
      })

      .catch(error => console.log(error));

    axios
      .get(this.$store.state.baseUrl + "/roles")

      .then(res => {
        const rolesData = res.data;

        for (let key in rolesData) {
          const role = {
            id: rolesData[key].id,

            role: rolesData[key].role
          };

          this.roles.push(role);
        }
      })

      .catch(err => console.log(err));
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "მომხმარებლის დამატება"
        : "მომხმარებლის კორეკტირება";
    },

    formIsValid() {
      return (
        this.editedItem.firstName,
        this.editedItem.lastName,
        this.editedItem.username,
        this.editedItem.password,
        this.editedItem.position,
        this.editedItem.role,
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
      roles: [],

      emailRules: [
        v => !!v || "E-mail is required",

        v =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
            v
          ) || "E-mail must be valid"
      ],

      userNameRule: [v => !!v || "Code is required"],

      userLastNameRule: [v => !!v || "Name is required"],

      userRule: [v => !!v || "Name is required"],

      passwordRule: [v => !!v || "Name is required"],

      search: "",

      dialog: false,

      editedIndex: -1,

      editedItem: {
        firstName: "",

        lastName: "",

        position: "",

        roles: {
          id: "",
          role: ""
        },

        email: ""
      },

      defaultItem: {
        firstName: "",

        lastName: "",

        position: "",

        roles: {
          id: "",
          role: ""
        },

        email: ""
      },

      headers: [
        {
          text: "მომხმარებლის სახელი",

          value: "firstName"
        },

        {
          text: "მომხმარებლის გვარი",

          value: "lastName"
        },

        {
          text: "username",

          value: "username"
        },

        {
          text: "პოზიცია",

          value: "position"
        },

        {
          text: "როლი",

          value: "role"
        },

        {
          text: "email",

          value: "email"
        }
      ],

      Users: []
    };
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.Users.indexOf(item);

      this.editedItem = Object.assign({}, item);

      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.Users.indexOf(item);

      var confirmed =
        confirm("Are you sure you want to delete this item?") &&
        this.Users.splice(index, 1);

      if (confirmed) {
        axios
          .delete(this.$store.state.baseUrl + "/users/" + item.id, {
            headers: {
              Authorization: "Bearer " + localStorage.token
            }
          })

          .then(res => console.log(res))

          .catch(error => console.log("error", error));
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
          .put(this.$store.state.baseUrl + "/users", this.editedItem, {
            headers: {
              Authorization: "Bearer " + localStorage.token
            }
          })
          .then(res => {
           Object.assign(this.Vendors[this.editedIndex], this.editedItem.id);
            this.close()
          })
          .catch(error => console.log(error));
      } else {
        axios
          .post(
            this.$store.state.baseUrl + "/users/register",
            this.editedItem,
            {
              headers: {
                Authorization: "Bearer " + localStorage.token
              }
            }
          )

          .then(res => {
            axios
              .get(this.$store.state.baseUrl + "/users/" + res.data, {
                headers: {
                  Authorization: "Bearer " + localStorage.token
                }
              })
              .then(res => {
                this.Users.push(res.data);
              });
            console.log(res);
            this.close();
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
