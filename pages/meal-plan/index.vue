<template>
  <div class="main container">
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn outlined class="mr-4" color="grey darken-2">
              Add Recipe
            </v-btn> -->
            <PopUpModal
              :recipe="recipes[0]"
              outlined="true"
              class="mr-4"
              color="grey darken-2"
              buttonText="Add Recipe"
            >
              <template v-slot:cardTitle>
                <v-card-title class="headline">
                  Add Recipe to Meal Plan
                </v-card-title>
              </template>
              <template v-slot:cardBody>
                <SearchBar :recipes="recipes" />
                <DatePicker :start="start" :end="end" />
              </template>
              <template v-slot:cardActions>
                <v-spacer></v-spacer>
                <v-btn class="actionButton" @click="addRecipe">Submit</v-btn>
              </template>
            </PopUpModal>
            <!-- <v-menu bottom right> 
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
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
          </v-menu> -->
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            interval-count="0"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            class="menuWhoopsie"
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <!-- <v-card color="grey lighten-4" min-width="350px" flat> -->
            <RecipeCard
              :recipe_id="selectedEvent.id"
              :color="selectedEvent.color"
              style="margin:0;"
            >
              <template v-slot:toolbar>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-toolbar-title
                    v-html="selectedEvent.name"
                  ></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <!-- <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn> -->
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-toolbar>
              </template>
              <template v-slot:image>
                <v-img :src="selectedEvent.imageURL" height="200px"></v-img>
              </template>
              <template v-slot:title>
                {{ selectedEvent.name }}
              </template>
              <template v-slot:servings>
                Serves {{ selectedEvent.servings }}
              </template>
              <template v-slot:link>
                <v-btn
                  nuxt
                  :to="'/my-recipes/' + selectedEvent.id"
                  :color="selectedEvent.color"
                  text
                >
                  View Recipe
                </v-btn>
              </template>
            </RecipeCard>
            <!-- <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions> -->
            <!-- </v-card> -->
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import dayjs from "dayjs";

export default {
  data: () => ({
    focus: "",
    type: "week",
    start: null,
    end: null,
    typeToLabel: {
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
    ]
  }),
  async asyncData({ store }) {
    // console.log("created");
    const data = await fetch(
      "/api/userInfo",

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accessToken: store.state.accessToken
        }
      }
    )
      .then(res => res.json())
      .catch(err => {
        localStorage.removeItem("accessToken");
        store.commit("SET_TOKEN", null);

        throw err;
      });

    // console.log(data);

    const { recipes, MealPlans, shoppingLists } = data;
    // console.log(recipes);

    store.commit("SET_RECIPES", recipes);

    return { recipes, MealPlans, shoppingLists };
  },
  middleware: "authenticated",
  mounted() {
    this.$refs.calendar.checkChange();
    // console.log(this.$refs);
  },
  // computed: {
  //   selectedRecipe: function() {
  //     const found = this.recipes.find(
  //       element => element.id === this.selectedEvent.id
  //     );
  //     return found;
  //   }
  // },
  methods: {
    async saveMealPlan(startDate) {
      try {
        const response = await fetch(
          `/api/mealPlan/${startDate}`,

          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              accessToken: this.$store.state.accessToken
            },
            body: JSON.stringify({ recipes: this.events })
          }
        ).then(res => res.json());
      } catch (error) {
        console.log(error);
      }
    },
    addRecipe() {
      // console.log(this.recipes.idOf);
      // console.log(this.$store.state.recipeObject);
      if (this.$store.state.recipeObject.name) {
        let eventObject = {
          name: this.$store.state.recipeObject.name,
          start: this.$store.state.recipeObject.date,
          end: this.$store.state.recipeObject.date,
          color: this.colors[this.rnd(0, this.colors.length - 1)]
        };

        const recipe = this.recipes.find(rec => rec.title === eventObject.name);
        // console.log(recipe);
        eventObject.id = recipe.id;
        eventObject.servings = recipe.servings;
        eventObject.imageURL = recipe.imageURL;

        // for (let i = 0; i < this.recipes.length; i++) {
        //   if (this.recipes[i].title === eventObject.name) {
        //     eventObject.index = i;
        //     break;
        //   }
        // }
        // console.log(eventObject);
        this.events.push(eventObject);
        this.saveMealPlan(this.start);
        // events.push({
        //   name: this.recipes[i].title,
        //   start: first,
        //   end: second,
        //   color: this.colors[this.rnd(0, this.colors.length - 1)],
        //   timed: !allDay,
        //   index: i
        // });
      }
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
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
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        // console.log(event);
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    async updateRange({ start, end }) {
      // console.log("update func running");
      this.start = start.date;
      this.end = end.date;
      const startDate = dayjs(dayjs().day(start.weekday)).format("DD/MM/YYYY");
      const endDate = dayjs(dayjs().day(end.weekday)).format("DD/MM/YYYY");

      // console.log(start.date, " - ", end.date);
      // console.log(dayjs(start.date).format("DD/MM/YYYY"));
      try {
        const mealPlan = await fetch(
          `/api/mealPlan/${start.date}`,

          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              accessToken: this.$store.state.accessToken
            }
          }
        ).then(res => res.json());
        // console.log(mealPlan);

        if (!mealPlan.message) {
          const events = mealPlan.recipes;
          this.events = events;
        }
      } catch (error) {
        console.log(error);
      }

      //random events for testing
      // const min = new Date(`${start.date}T00:00:00`);
      // const max = new Date(`${end.date}T23:59:59`);
      // const days = (max.getTime() - min.getTime()) / 86400000;
      // const eventCount = this.recipes.length;

      // for (let i = 0; i < eventCount; i++) {
      //   const allDay = this.rnd(0, 3) === 0;
      //   const firstTimestamp = this.rnd(min.getTime(), max.getTime());
      //   const first = new Date(firstTimestamp - (firstTimestamp % 900000));
      //   const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
      //   const second = new Date(first.getTime() + 1);

      //   events.push({
      //     name: this.recipes[i].title,
      //     start: first,
      //     end: second,
      //     color: this.colors[this.rnd(0, this.colors.length - 1)],
      //     timed: !allDay,
      //     index: i
      //   });
      // }

      // this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    }
  }
};
</script>

<style lang="scss">
.v-calendar-daily__body {
  display: none;
}
/* .v-menu__content {
  box-shadow: none;
} */
/* .recipeCard {
  margin: 0 !important;
} */
.theme--light.v-calendar-daily {
  border-left: none !important;
  border-top: none !important;
}

.v-calendar-daily__scroll-area {
  display: none !important;
}
.v-calendar-daily__intervals-head {
  display: none;
}
.v-calendar-daily__head {
  border-left: #e0e0e0 1px solid;
  border-top: #e0e0e0 1px solid;
}
.v-calendar-daily_head-day {
  min-height: 150px;
}
.v-event {
  margin: 0.5rem auto !important;
}
</style>
