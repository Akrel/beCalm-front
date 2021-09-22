<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-text id="conteiner-labels">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Tittle" required></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-switch
                    inset
                    v-model="checkbox"
                    :label="`All day`"
                ></v-switch>
              </v-col>

              <v-col v-if="checkbox" cols="12" sm="6">
                <data-picker
                    label="Start Date"
                    v-model="startDate"
                ></data-picker>
              </v-col>

              <v-row v-else cols="12">
                <data-picker v-model="startDate" label="Start Date">
                </data-picker>
                <time-picker v-model="startTime" label="Start Time">
                </time-picker>

                <data-picker v-model="endTime" label="End Date"></data-picker>
                <time-picker v-model="endDate" label="End Time"></time-picker>
              </v-row>
<ToItem></ToItem>
              <v-row cols="12">
                <v-textarea
                    name="input-7-1"
                    filled
                    label="Description"
                    auto-grow
                    :value="texarea"
                ></v-textarea>
              </v-row>
            </v-row>
            <v-row cols="12">
              <color-picker v-model="color"></color-picker>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import DataPicker from "./popups/DataPicker";
import TimePicker from "./popups/TimePicker";
import ColorPicker from "./popups/ColorPicker";
import ToItem from "./popups/ToItem";

export default {
  name: "calendar-event",
  props: ["startDate"],

  data: () => ({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    texarea: "",
    color: null,
    dialog: false,
    checkbox: true,
    date: ""
  }),

  components: {
    ToItem,
    ColorPicker,
    TimePicker,
    dataPicker: DataPicker
  },

  methods: {
    op() {
      this.startDate.getDate();
    }
  }
};
</script>

<style scoped>
#conteiner-labels .row * {
  margin-top: 2px;
  margin-bottom: 1px;
  padding: 5px;
}
</style>
