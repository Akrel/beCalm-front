<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn
          :color="color"
          v-on="on"
      >
        Event Color
      </v-btn>
    </template>
    <v-color-picker
        v-model="color"
        hide-canvas
        hide-inputs
        show-swatches
        class="mx-auto"
    ></v-color-picker>
  </v-menu>

</template>

<script>
export default {
  name: "ColorPicker",
  props: ["colorProps"],
  data: () => ({color: ""}),

  created() {
    if (this.colorProps !== undefined && this.colorProps !== "")
      this.color = this.colorProps;
    else
      this.color = Math.floor(Math.random() * 16777215).toString(16)
  }

}
</script>

<style scoped>

</style>