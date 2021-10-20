<template>
  <div id="el">
    <CalendarEvent v-if="dialog" :dialog="this.dialog" v-on:calendarEvent="onSaveClick"></CalendarEvent>
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
            <v-btn @click="addNewEvent" style="margin-left: 10px;background: lightgreen" icon>
              <v-icon>mdi-plus</v-icon>
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
              @mousedown:event="startDrag"
              @mousedown:time="startTime"
              @mousemove:time="mouseMove"
              @mouseup:time="endDrag"
              @mouseleave.native="cancelDrag"
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
                <v-btn icon>
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
                <span style="font-size: 18px">{{ selectedEvent.desc }}</span>
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
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party"
    ],
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    createStart: null,
    extendOriginal: null
  }),

  /*  beforeUpdate() {

      console.log("dsa")
      this.events = this.$store.getters["calendar/getTask"];

      console.log("dsa")
      },*/

  methods: {

    getEvents() {
      this.$store
          .dispatch('calendar/getAllTaskInMonth', this.$refs.calendar.parsedValue.month).then(() =>{
        let getter = this.$store.getters["calendar/getTask"];
        this.events = getter;
      });
    },


    remove() {
      this.selectedEvent
      let taskUuid = this.selectedEvent.taskUuid;
      this.$store.dispatch('calendar/removeTask',taskUuid)
      .then(() =>{
        this.reload();
      })
      console.log('')
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
      /*  this.createEvent = {
          name: `3Event #${this.events.length}`,
          color: this.rndElement(this.colors),
          start: this.createStart,
          end: this.createStart,
          content: "asdasdaaaaaaaaaaaaaaaaaaaaaaa",
          timed: true,
        };
  */
      //this.events.push(this.createEvent);

    },


    onSaveClick(value) {
      console.log(value)
      this.createEvent = value;
    },


    showEvent({nativeEvent, event}) {
      const open = () => {
        console.log(event)
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        var s = this.selectedElement.name;
        console.log(s)
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
    startDrag({event, timed}) {
      if (event && timed) {
        this.dragEvent = event;
        this.dragTime = null;
        this.extendOriginal = null;
      }
    },
    startTime(tms) {
      const mouse = this.toTime(tms);

      if (this.dragEvent && this.dragTime === null) {
        const start = this.dragEvent.start;

        this.dragTime = mouse - start;
      }
    },
    extendBottom(event) {
      this.createEvent = event;
      this.createStart = event.start;
      this.extendOriginal = event.end;
    },
    mouseMove(tms) {
      const mouse = this.toTime(tms);

      if (this.dragEvent && this.dragTime !== null) {
        const start = this.dragEvent.start;
        const end = this.dragEvent.end;
        const duration = end - start;
        const newStartTime = mouse - this.dragTime;
        const newStart = this.roundTime(newStartTime);
        const newEnd = newStart + duration;

        this.dragEvent.start = newStart;
        this.dragEvent.end = newEnd;
      } else if (this.createEvent && this.createStart !== null) {
        const mouseRounded = this.roundTime(mouse, false);
        const min = Math.min(mouseRounded, this.createStart);
        const max = Math.max(mouseRounded, this.createStart);

        this.createEvent.start = min;
        this.createEvent.end = max;
      }
    },
    endDrag() {
      this.dragTime = null;
      this.dragEvent = null;
      this.createEvent = null;
      this.createStart = null;
      this.extendOriginal = null;
    },
    cancelDrag() {
      if (this.createEvent) {
        if (this.extendOriginal) {
          this.createEvent.end = this.extendOriginal;
        } else {
          const i = this.events.indexOf(this.createEvent);
          if (i !== -1) {
            this.events.splice(i, 1);
          }
        }
      }

      this.createEvent = null;
      this.createStart = null;
      this.dragTime = null;
      this.dragEvent = null;
    },
    roundTime(time, down = true) {
      const roundTo = 15; // minutes
      const roundDownTime = roundTo * 60 * 1000;

      return down
          ? time - (time % roundDownTime)
          : time + (roundDownTime - (time % roundDownTime));
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

      return event === this.dragEvent
          ? `rgba(${r}, ${g}, ${b}, 0.7)`
          : event === this.createEvent
              ? `rgba(${r}, ${g}, ${b}, 0.7)`
              : event.color;
    },


    /*  getEvents({start, end}) {
        const events = [];

        const min = new Date(`${start.date}T00:00:00`).getTime();
        const max = new Date(`${end.date}T23:59:59`).getTime();
        const days = (max - min) / 86400000;
        const eventCount = this.rnd(days, days + 20);

        for (let i = 0; i < eventCount; i++) {
          const timed = this.rnd(0, 3) !== 0;
          const firstTimestamp = this.rnd(min, max);
          const secondTimestamp = this.rnd(2, timed ? 8 : 288) * 900000;
          const start = firstTimestamp - (firstTimestamp % 900000);
          const end = start + secondTimestamp;

          events.push({
            name: this.rndElement(this.names),
            color: this.rndElement(this.colors),
            start,
            end,
            timed
          });
        }

        this.events = events;
      },*/


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
