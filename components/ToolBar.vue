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
    <v-toolbar class="toolbar" color="teal">
      <v-label dark>Add Tag</v-label>
      <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        class="mx-4"
        flat
        :allow-overflow="false"
        hide-no-data
        hide-details
        @input="handleChange"
        solo-inverted
        chips
        deletable-chips
        multiple
        @click:clear="handleClear"
      >
        <template v-slot:selection> </template>
      </v-autocomplete>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      loading: false,
      items: <any>[],
      search: null,
      select: <any>null,
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

      this.select = this.select.filter((tagText: string) => tagText !== tag);

      this.handleChange();
    },
    handleChange() {
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
  mounted() {
    console.log(this.tags);
  },
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
</style>
