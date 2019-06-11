<template>
  <v-container fluid>
    <v-layout column>
      <v-btn
        v-if="checkGroupPer()"
        color="#78909C"
        dark
        class="text-lg-left mt-3"
        :to="{name:'Groups'}"
      >
        <v-icon left>list_alt</v-icon>დავალებები
      </v-btn>

      <v-btn
        v-if="  checkUsersPer() && checkTasksPer()"
        color="#78909C"
        class="text-lg-left mt-3"
        dark
        :to="{name:'NewAccident'}"
      >
        <v-icon left>add_circle_outline</v-icon>ინციდენტის დამატება
      </v-btn>

      <v-btn
        v-if="checkAccidentPer()"
        color="#78909C"
        dark
        class="mt-3"
        :to="{name:'OpenAccidents'}"
      >
        <v-icon left>rate_review</v-icon>ღია ინციდენტები
      </v-btn> 

    </v-layout>
  </v-container>
</template>

<script> 
export default {
  created() { 
    this.axios
      .get(this.$store.state.baseUrl + "/Helper/GetUserPermissions")
      .then(res => {
        const claimsRes = res.data;
        for (let key in claimsRes) {
          var claim = claimsRes[key];
          this.Claims.push(claim);
        }
        console.log(this.Claims);
      })
      .catch(error => {});
  },

  data() {
    return {
      Claims: []
    };
  },

  methods: {
    checkGroupPer() {
      if (this.Claims.includes("CanReadGroups")) {
        return true;
      } else {
        return false;
      }
    },
    checkAccidentPer() {
      if (this.Claims.includes("CanReadAccidents")) {
        return true;
      } else {
        return false;
      }
    },
    checkPlannedWorksPer() {
      if (this.Claims.includes("CanReadPlannedWorks")) {
        return true;
      } else {
        return false;
      }
    },
    checkUsersPer() {
      if (this.Claims.includes("CanReadUsers")) {
        return true;
      } else {
        return false;
      }
    },

    checkTasksPer() {
      if (this.Claims.includes("CanReadTasks")) {
        return true;
      } else {
        return false;
      }
    },
    checkVendorsPer() {
      if (this.Claims.includes("CanReadVendors")) {
        return true;
      } else {
        return false;
      }
    },
    checkRolesPer() {
      if (this.Claims.includes("CanReadRoles")) {
        return true;
      } else {
        return false;
      }
    },
    checkPermissionsPer() {
      if (this.Claims.includes("CanReadPermissions")) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style>
</style>
