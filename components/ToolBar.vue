<template>
  <div>
    <v-chip
      v-for="(tag, i) in this.tags"
      :key="i"
      class="mabl-2"
      close
      color="orange"
      label
      outlined
      @click:close="handleDeleteTag(tag)"
    >
      {{ tag }}
    </v-chip>
    <v-row color="teal">
      <form id="tagForm" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="text"
          class="mx-4"
          flat
          :allow-overflow="false"
          placeholder="E.g. 'Breakfast'"
        >
          <template v-slot:selection> </template>
        </v-text-field>
        <v-btn @click="handleSubmit" dark>Add Tag</v-btn>
      </form>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      loading: false,
      text: "",
      items: <any>[],
      search: null,
      select: <any>this.tags,
      choices: [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snack",
        "Desert",
        "Side",
        "Meat",
        "Vegetarian",
        "Keto",
        "Vegan",
        "Low-fat",
        "Low-sugar",
        "Low-calorie",
        "Low-carb",
        ""
      ]
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    handleClear() {
      console.log("clear");
    },
    async handleDeleteTag(tag: string) {
      //   console.log(this.select, tag);
      if (this.select) {
        this.select = this.select.filter((tagText: string) => tagText !== tag);

        this.handleChange();
      } else {
        const filteredArray = this.tags.filter((text: any) => text !== tag);
        this.$emit("changeTag", filteredArray);
      }
    },
    handleSubmit() {
      if (this.text) {
        this.select.push(this.text);
        this.text = "";

        this.$emit("changeTag", this.select);
      }
    },
    handleChange() {
      //   console.log("toolbar select is " + this.select);
      this.$emit("changeTag", this.select);
    },
    querySelections(v: any) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.choices.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    }
  },
  //   mounted() {
  //     console.log(this.tags);
  //   },
  props: {
    tags: Array
  }
});
</script>

<style lang="scss" scoped>
.toolbar {
  max-width: 400px;
  height: fit-content !important;
  .v-toolbar__content {
    height: fit-content !important;
  }
}
.mabl-2 {
  margin: 8px 8px 8px 0;
}
#tagForm {
  display: flex;
  place-items: center;
}
</style>
