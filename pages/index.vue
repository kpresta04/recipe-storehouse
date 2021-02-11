<template>
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
      <a href="/contact" class="button w-button">Get Started</a>
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
.hero {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  margin-top: -64px;
  padding: 210px 30px 120px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-image: url(/ecook.jpg);
  background-position: 50% 50%;
  background-size: cover;
}
/* @media screen and (min-width: 1200px) {
  .hero {
    background-image: url(/ecookLarge.jpg);
  }
} */
.header-content {
  color: white;
  max-width: 770px;
  -webkit-perspective: 2000px;
  perspective: 2000px;
  -webkit-transition: opacity 200ms ease;
  transition: opacity 200ms ease;
  text-align: center;
  text-shadow: 1px 1px 6px #000;
  h1 {
    margin-top: 0px;
    margin-bottom: 30px;
    font-family: "Libre Franklin", sans-serif;

    font-size: 4.5rem;
    line-height: 78px;
    font-weight: 800;
    letter-spacing: -1px;
  }

  p {
    font-family: "IBM Plex Mono", sans-serif;
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    margin-bottom: 10px;
  }
}
</style>
