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
                    :rules="[() => !!tittle || 'To pole jest wymagane']"
                    label="Tytuł"
                    required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-switch v-model="allDay" :label="`Cały dzień`" inset></v-switch>
              </v-col>

              <v-col v-if="allDay" cols="12" sm="6">
                <data-picker
                    v-model="this.startDate"
                    label="Początek wydarzenia"
                    v-bind:dateProps="startDate"
                    ref="refDateStart"
                ></data-picker>
              </v-col>

              <v-row v-else cols="12">
                <data-picker
                    ref="refDateStart_all"
                    v-bind:dateProps="startDate"
                    v-model="startDate"
                    label="Data rozpoczęcia"
                >
                </data-picker>
                <time-picker
                    ref="refTimeStart"
                    v-bind:timed="startTime"
                    v-model="startTime"
                    label="Godzina rozpoczęcia"
                >
                </time-picker>

                <data-picker
                    ref="refDateEnd"
                    v-bind:dateProps="startDate"
                    v-model="endTime"
                    label="Data zakończenia"
                ></data-picker>
                <time-picker
                    ref="refTimeEnd"
                    v-bind:timed="endTime"
                    v-model="endDate"
                    label="Czas zakończenia"
                ></time-picker>
              </v-row>
              <v-row cols="12">
                <v-textarea
                    v-model="textarea"
                    auto-grow
                    filled
                    label="Opis"
                    name="input-7-1"
                >
                </v-textarea>
              </v-row>
            </v-row>
            <v-row cols="12">
              <color-picker v-bind:colorProps="color" ref="refColor" v-model="color"></color-picker>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" v-on:click="close">
            Zamknij
          </v-btn>

          <v-btn color="success" v-if="this.$parent.$data.editFlag" @click="edit">
            Edit
          </v-btn>

          <v-btn color="blue" @click="save"  v-else >
            Zapisz
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
import {mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";
import EventCalendarModel from "../../models/event-model";

export default {
  name: "calendar-event",
  props: ["element"],
  validations: {
    tittle: {required}
  },
  data: () => ({
    tittle: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    textarea: "",
    color: "",
    allDay: true,
    selectEvent: ""
  }),
  rules: {
    required: value => !!value || "Required."
  },

  components: {
    ColorPicker,
    TimePicker,
    dataPicker: DataPicker
  },

  methods: {
    ...mapActions({
      addEvent: "calendar/addNewEvent"
    }),

    edit() {
      if (this.tittle) {
        let element = new EventCalendarModel()
            .$title(this.tittle)
            .$description(this.textarea)
            .$color(this.$refs.refColor.color)
            .$allDay(this.allDay);

        if (this.allDay)
          element.$startDate(new Date(this.$refs.refDateStart.date));
        else
          element
              .$startDate(
                  new Date(
                      this.$refs.refDateStart_all.date +
                      " " +
                      this.$refs.refTimeStart.time
                  )
              )
              .$endDate(
                  new Date(
                      this.$refs.refDateEnd.date + " " + this.$refs.refTimeEnd.time
                  )
              );

        if (this.selectEvent) element.$taskUuid(this.selectEvent.taskUuid);
        this.$store.dispatch("calendar/editTask", element.build()).then(
            () => {
              this.$parent.getEvents();
              this.$parent.$data.dialog = false;

              this.$destroy();
            },
            error => {
              console.log(error);
            }
        );
      }
      this.$parent.$data.editFlag = false
    },

    close() {
      this.$parent.$data.dialog = false;
      this.$parent.$data.editFlag = false
      this.$destroy();
    },

    save() {
      if (this.tittle) {
        let element = new EventCalendarModel()
            .$title(this.tittle)
            .$description(this.textarea)
            .$color(this.$refs.refColor.color)
            .$allDay(this.allDay);

        if (this.allDay)
          element.$startDate(new Date(this.$refs.refDateStart.date));
        else
          element
              .$startDate(
                  new Date(
                      this.$refs.refDateStart_all.date +
                      " " +
                      this.$refs.refTimeStart.time
                  )
              )
              .$endDate(
                  new Date(
                      this.$refs.refDateEnd.date + " " + this.$refs.refTimeEnd.time
                  )
              );
        this.$store.dispatch("calendar/addNewEvent", element.build()).then(
            () => {
              this.$parent.getEvents();
              this.$parent.$data.dialog = false;

              this.$destroy();
            },
            error => {
              console.log(error);
            }
        );
      }
      this.$parent.$data.editFlag = false
    }
  },

  created() {
    if (this.$parent.$data.editFlag) {
      let selectedEvent = this.$parent.$data.selectedEvent;
      this.selectEvent = selectedEvent;
      this.tittle = selectedEvent.name;
      this.color = selectedEvent.color;
      this.textarea = selectedEvent.description;

      let startDate = selectedEvent.start.split(" ");
      this.startDate = startDate[0];
      this.allDay = selectedEvent.allDay;
      if (selectedEvent.end !== "") {
        this.startTime = startDate[1];
        let endDate = selectedEvent.end.split(" ");
        this.endDate = endDate[0];
        this.endTime = endDate[1];
      }
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
