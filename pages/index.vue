<template>
  <div class="main">
    <div class="hero">
      <div class="header-content">
        <h1
          style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d; opacity: 1;"
        >
          Propel your cooking.
        </h1>
        <p
          data-w-id="cd085e48-08fc-46a5-a6c3-97346f451e6d"
          style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"
          class="paragraph"
        >
          All your favorite recipes, stored in one place.
        </p>
        <v-btn class="mt-4" to="/my-recipes" nuxt large dark>
          Get Started
        </v-btn>
      </div>
    </div>
    <div class="features">
      <div class="h2-container">
        <h2>
          RecipeDB: the all-in-one recipe organizer, meal planner and shopping
          list manager.
          <span class="color-light"
            >Providing a hub for your ever-growing collection of recipes. Import
            from any recipe site including allrecipes, Food Network, BBC Food
            and more! Never lose your recipes again.</span
          >
        </h2>
      </div>
      <div class="feature-item">
        <img src="/meal2.svg" alt="meal" />
        <h3>Import Recipes</h3>
        <p class="color-light">
          Import your recipes from any online source.
        </p>
      </div>
      <div class="feature-item">
        <img src="/cl2.svg" alt="checklist" />

        <h3>Generate Shopping Lists</h3>
        <p class="color-light">
          Generate a shopping list from any of your imported recipes with the
          push of a button.
        </p>
      </div>
      <div class="feature-item">
        <img src="/calendar.svg" alt="meal plan" />

        <h3>Create Meal plans</h3>
        <p class="color-light">
          Create and share meal plans with the whole family.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  mounted() {
    const token = localStorage.getItem("accessToken");
    if (token && !this.$store.state.accessToken) {
      this.$store.commit("SET_TOKEN", token);
    }
  }
});
</script>

<style lang="scss" scoped>
.color-light {
  color: $color-light;
}
.feature-item {
  padding: 50px 40px;
  border: 1px solid #f7f7f7;
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 5%);

  h3 {
    margin-top: 0px;
    margin-bottom: 10px;

    font-size: 16px;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    line-height: 24px;
  }
}
.features {
  color: $color-primary;
  padding: 0 30px;
  margin: 6rem auto;

  img {
    height: 120px;
    width: 120px;
  }
}
@media screen and (max-width: 1023px) {
  .hero {
    flex-direction: column;
  }
  .svg {
    width: 100vw !important;
  }
  .header-image {
    margin-top: 3rem;
  }
}
@media screen and (min-width: 700px) {
  .h2-container {
    width: 80%;
    margin-bottom: 90px;
    padding: 50px 40px;
    font-size: 1rem !important;
  }
  .header-content {
    margin: 7rem auto !important;
  }
  .feature-item {
    width: 33.33333333%;
    height: auto;
    /* margin: 0 2px; */
  }
  .features {
    display: flex;
    flex-wrap: wrap;
  }
}
@media screen and (min-width: 1024px) {
  .header-content {
    margin: 12rem auto !important;
    max-width: 1200px !important;
    font-size: 16px !important;
  }
  .features {
    margin: 12rem auto;
  }
}
@media screen and (min-width: 1200px) {
  .header-content {
    margin: 15rem auto !important;

    h1 {
      font-size: 7.5em !important;
      margin-bottom: 50px !important;
    }
    p {
      margin-bottom: 20px !important;
    }
  }
}

.header-image {
  height: 100%;
  /* width: 50%;
  background-image: url("/sushi.svg"); */
  background-position: 50% 50%;
  background-size: cover;
}
.hero {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100vw;
  /* padding: 120px 30px 120px; */
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-image: url("https://assets.website-files.com/5a5f93d570152900015df4fa/5a8c685dfcefd3000119b257_White.jpg"),
    linear-gradient(225deg, rgba(52, 16, 177, 0.97), rgba(106, 60, 204, 0.97)),
    url("/heuvel.jpg");
  background-position: 50% 100%, 0px 0px, 50% 50%;
  background-size: 0px 74px, auto, cover;
  background-repeat: repeat-x, repeat, no-repeat;
  background-attachment: scroll, scroll, fixed;
  margin-top: -1px;
}

.svg {
  width: 50vw;
  max-width: 1000px;
}
.header-content {
  color: white;
  max-width: 410px;
  -webkit-perspective: 2000px;
  perspective: 2000px;
  -webkit-transition: all 200ms ease;
  transition: all 200ms ease;
  text-align: center;
  margin: 5rem auto;
  font-size: 14px;
  /* text-shadow: 1px 1px 6px #000; */
  h1 {
    margin-top: 0px;
    margin-bottom: 30px;
    /* font-family: "Libre Franklin", sans-serif; */

    font-size: 4.5em;
    line-height: 78px;
    font-weight: 800;
    letter-spacing: -1px;
  }

  p {
    /* font-family: "IBM Plex Mono", sans-serif; */
    font-size: 1.15em;
    line-height: 24px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .bg-primary {
    background-color: $color-primary;
  }
}
</style>
