<template>
  <div id="el">
    <CalendarEvent ref="eventWindow" v-if="dialog" :dialog="selectedElement"
                   v-on:calendarEvent="onSaveClick"></CalendarEvent>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn
                class="mr-4"
                color="grey darken-2"
                outlined
                @click="setToday"
            >
              Today
            </v-btn>
            <v-btn color="grey darken-2" fab small text @click="prev">
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn color="grey darken-2" fab small text @click="next">
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <!--            ENUM Z RODZAJEM WYŚWIETLANIA -->
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" color="grey darken-2" outlined>
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>

              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>


            <!--            przycisk dodania nowego eventu-->
            <v-btn @click="addNewEvent" style="margin-left: 10px;background: cadetblue" icon>
              <v-icon style="color: white">mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
        </v-sheet>


        <v-sheet height="600">
          <v-calendar
              ref="calendar"
              v-model="focus"
              :event-color="getEventColor"
              :event-ripple="false"
              :events="events"
              :type="type"
              color="primary"
              @change="getEvents"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
          >

          </v-calendar>
          <v-menu
              v-model="selectedOpen"
              :activator="selectedElement"
              :close-on-content-click="false"
              offset-x
          >
            <v-card color="grey lighten-4" flat min-width="350px">
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn v-on:click="editEvent" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer>
                </v-spacer>
                <v-btn v-on:click="remove" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <h4 id="view-text-des">Description:</h4>
                <span style="font-size: 18px">{{ selectedEvent.description }}</span>
              </v-card-text>


              <v-card-actions>
                <v-btn color="secondary" text @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>


          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CalendarEvent from "./CalendarEvent";

export default {
  name: "Calendar",
  components: {CalendarEvent},
  data: () => ({
    focus: "",
    eventWind: "",
    dialog: false,
    type: "month",
    typeToLabel: {
      year: "Year",
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    editFlag: false,
    createEvent: null,
    createStart: null,
    extendOriginal: null
  }),

  methods: {

    getEvents() {
      this.$store
          .dispatch('calendar/getAllTaskInMonth', this.$refs.calendar.parsedValue.month).then(() => {
        let getter = this.$store.getters["calendar/getTask"];
        this.events = getter;
      });
    },

    editEvent() {
      this.dialog = true
      this.editFlag = true
    },


    remove() {

      let taskUuid = this.selectedEvent.taskUuid;
      this.$store.dispatch('calendar/removeTask', taskUuid)
          .then(() => {
            this.getEvents();
            this.selectedOpen = false
            this.selectedEvent = null;
          })
    },

    viewDay({date}) {
      this.focus = date;
      this.type = "day";
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },

    addNewEvent() {
      this.dialog = true
    },


    onSaveClick(value) {
      console.log(value)
      this.createEvent = value;
    },

    showEvent({nativeEvent, event}) {
      const open = () => {
        this.dialog = false
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
            requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },

    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },

    toTime(tms) {
      return new Date(
          tms.year,
          tms.month - 1,
          tms.day,
          tms.hour,
          tms.minute
      ).getTime();
    },


    getEventColor(event) {
      const rgb = parseInt(event.color.substring(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      return event === this.createEvent
          ? `rgba(${r}, ${g}, ${b}, 0.7)`
          : event.color;
    },


    rndElement(arr) {
      return arr[this.rnd(0, arr.length - 1)];
    }
  }
};
</script>

<style scoped>
#el {
  width: 30%;
}

#el > div > div > div:nth-child(2) {
  height: 90% !important;
}

#el >>> .v-calendar-daily__scroll-area {
  overflow-y: hidden !important;
}

#el > div > div > div:nth-child(2) > div.v-calendar-monthly.v-calendar-weekly.v-calendar.theme--light.v-calendar-events > div.v-calendar-weekly__head > div {
  background-color: lightblue !important;
}


#el > div > div > div:nth-child(2) > div.v-calendar-monthly.v-calendar-weekly.v-calendar.theme--light.v-calendar-events > div.v-calendar-weekly__head {
  background-color: lightblue !important;
}

#view-text-des {
  color: black;
}

v-sheet {
  height: 100%;
}
</style>
