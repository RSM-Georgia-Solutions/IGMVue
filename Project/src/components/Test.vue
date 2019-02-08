<template>
  <div class="text-xs-center">
    <v-btn
      :disabled="dialog"
      :loading="dialog"
      color="success"
      @click="dialog = true"
    >ინციდენტისდამატება</v-btn>
    <v-dialog v-model="dialog" hide-overlay persistent width="490">
      <v-card color="blue-grey lighten-1" dark>
        <v-card-text>მიმდინარეობს დამატება
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false
    };
  },

  watch: {
    dialog(val) {
      if (!val) return;
      setTimeout(() => (this.dialog = false), 3000);
    }
  },

  methods: {
    AddAccident() {
      this.dialog = true;
    }
  }
};
</script>