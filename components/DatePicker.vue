<template>
  <v-row justify="center">
    <v-date-picker
      v-model="dateSelected"
      class="mt-4"
      :min="date"
      :max="max"
    ></v-date-picker>
  </v-row>
</template>
<script>
import dayjs from "dayjs";

export default {
  data: () => ({
    date: dayjs().format("YYYY-MM-DD"),
    min: dayjs()
      .day(0)
      .format("YYYY-MM-DD"),
    max: dayjs()
      .day(6)
      .format("YYYY-MM-DD"),
    dateSelected: dayjs().format("YYYY-MM-DD")
  }),
  //   mounted() {
  //     const day = dayjs()
  //       .day(0)
  //       .format("YYYY-MM-DD");
  //     console.log(day);
  //   },

  methods: {
    allowedDates: val => parseInt(val.split("-")[2], 10) % 2 === 0
  }
};
</script>
