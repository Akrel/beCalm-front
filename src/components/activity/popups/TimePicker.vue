<template>
  <v-menu
      ref="menu"
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="time"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          v-model="time"
          :label="label"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
        v-if="menu2"
        v-model="time"
        full-width
        format="24hr"
        @click:minute="$refs.menu.save(time)"
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  name: "TimePicker",
  props: ["label", "timed"],
  data: () => ({
    time: "",
    menu2: false
  }),

  created() {
    if (this.timed !== undefined && this.timed !== "") {
      this.time = new Date(this.timed).toLocaleDateString().slice(0, 3)

    } else
      this.time = new Date().toLocaleTimeString().slice(0, -3)
  }

};
</script>

<style scoped></style>
