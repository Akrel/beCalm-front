<template>
  <v-row justify="center">
    <v-dialog value="dialog" max-width="600px" persistent @submit="save()">
      <v-card>
        <v-card-text id="conteiner-labels">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    v-model="tittle"
                    label="Tittle"
                    required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-switch
                    v-model="checkbox"
                    :label="`All day`"
                    inset
                ></v-switch>
              </v-col>

              <v-col v-if="checkbox" cols="12" sm="6">
                <data-picker
                    v-model="this.startDate"
                    label="Start Date"
                    ref="refDateStart"
                ></data-picker>
              </v-col>

              <v-row v-else cols="12">
                <data-picker ref="refDateStart_all" v-model="startDate" label="Start Date">
                </data-picker>
                <time-picker ref="refTimeStart" v-model="startTime" label="Start Time">
                </time-picker>

                <data-picker ref="refTimeEnd" v-model="endTime" label="End Date"></data-picker>
                <time-picker ref="refDateEnd" v-model="endDate" label="End Time"></time-picker>
              </v-row>
              <v-row cols="12">
                <v-textarea
                    v-model="this.texarea"
                    auto-grow
                    filled
                    label="Description"
                    name="input-7-1"
                >{{ this.tittle }}}
                </v-textarea>
              </v-row>
            </v-row>
            <v-row cols="12">
              <color-picker v-model="color"></color-picker>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="save">
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

export default {
  name: "calendar-event",
  props: ["dialog"],

  data: () => ({
    tittle: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    texarea: "",
    color: null,
    checkbox: true,
    date: ""
  }),

  components: {
    ColorPicker,
    TimePicker,
    dataPicker: DataPicker
  },

  methods: {
    save() {
    //ednpoint do posta z dodaniem zadania i zbudowac dto

      //nastepnie do parenta wysyłam forceUpdate()

      if (this.checkbox)
        console.log(this.$refs.refDateStart.date + " asd" + " ");
      else
        console.log(this.$refs.refDateStart_all.date + " asd" + " ");
      this.$emit("calendarEvent", this.startDate);
    }
  },

  created() {

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
