<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn
          :color="color"
          dark
          v-on="on"
      >
        Event Color
      </v-btn>
    </template>
    <v-color-picker
        value="#7417BE"
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
  data: () => ({color: '',}),

}
</script>

<style scoped>

</style>