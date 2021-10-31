<template>
  <v-menu
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          v-model="date"
          :label="label"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "Data-Picker",
  props: ["label", "dateProps"],
  data() {
    return {
      date: "",

      menu2: false
    };
  },


  created() {
    if (this.dateProps !== undefined && this.dateProps !== "") {
      this.date = new Date(this.dateProps).toISOString().substr(0, 10)

    } else
      this.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)

  }
};
</script>

<style scoped></style>
