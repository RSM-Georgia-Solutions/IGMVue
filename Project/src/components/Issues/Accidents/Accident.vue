<template>
  <v-form ref="form">
    <v-snackbar
      v-model="isSuccess"
      :timeout="6000"
      :color="responseStatus"
      :bottom="true"
    >{{responseText}}</v-snackbar>
    <v-container fluid fill-height>
      <v-layout row wrap>
        <v-flex xs12 lg3 offset-lg4>
          <v-card>
            <v-img :src="url" contain max-height="600"></v-img>
          </v-card>
        </v-flex>
        <v-flex xs12 mt-3>
          <v-text-field disabled v-model="Accdient.sectorName" label="სექტორი"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field disabled v-model="Accdient.buildingBranch" label="ფილიალი"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field disabled v-model="Accdient.floorNumber" label="სართული"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field disabled v-model="Accdient.priority" label="პრიორიტეტი"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field disabled v-model="Accdient.type" label="ტიპი"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-autocomplete
            :items="Status"
            v-model="Accdient.status"
            label="სტატუსი"
            placeholder="არჩევა..."
            required
          ></v-autocomplete>
        </v-flex>
        <v-flex xs12>
          <v-text-field disabled v-model="Accdient.username" label="username"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field disabled v-model="Accdient.createDate" label="შექმნის თარიღი"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field disabled v-model="Accdient.dueDate" label="შესრულების თარიღი"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field disabled v-model="Accdient.comment" label="კომენტარი"></v-text-field>
        </v-flex>

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
        <v-flex xs12 lg3 offset-lg4>
          <v-card>
            <v-img :src="urlAfterComplete" contain max-height="600"></v-img>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-switch xs12 lg3 v-model="disabled" label="მარაგების ჩამოწერა"></v-switch>
          <v-btn right color="primary" @click="UpdateAccident">შენახვა</v-btn>
          <v-btn
            right
            color="primary"
            :disabled="!disabled"
            @click="navigateToGoodsIssue"
          >მარაგების ჩამოწერა</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";
export default {
  created() {
    axios
      .get(this.$store.state.baseUrl + "/Helper/GetStatuses")

      .then(res => {
        const statusesRes = res.data;

        for (let key in statusesRes) {
          const status = statusesRes[key];
          this.Status.push(status);
        }
      })
      .catch(err => {
        console.log(err);
      });

    this.axios
      .get(this.$store.state.baseUrl + "/Accidents/" + this.$route.params.id)
      .then(res => {
        let x = res.data;
        this.Accdient = x;
        this.url =
          this.$store.state.baseUrl +
          "/Helper/GetImage?imageName=" +
          this.Accdient.imageName;
        this.urlAfterComplete =
          this.$store.state.baseUrl +
          "/Helper/GetImage?imageName=" +
          this.Accdient.imageNameAfterComplete;
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      responseText: "",
      isSuccess: false,
      responseStatus: "",
      Accdient: {},
      url: "",
      urlAfterComplete: "",
      Status: [],
      disabled: false,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      imageRule: [v => !!v || "სურათი აუცილებელია"]
    };
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
    UpdateAccident() {
      this.axios
        .put(this.$store.state.baseUrl + "/accidents", this.Accdient)
        .then(res => {
          this.$router.push({
            name: "OpenAccidents"
          });
        })
        .catch(error => {
          console.log(error);
          this.responseStatus = "error";
          this.responseText = error.response.data;
          this.isSuccess = true;
        });
    },
    navigateToGoodsIssue() {
      this.$router.push({
        name: "GoodsIssue"
      });
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
          this.Accdient.base64ImageAfterComplete = fr.result;
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
