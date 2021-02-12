<template>
  <v-app>
    <v-app-bar class="appBar" color="transparent" absolute light app>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-app-bar-nav-icon
        v-if="windowWith < 1024"
        class="navIcon"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-spacer v-if="windowWith < 1024"></v-spacer>
      <v-toolbar-title class="toolbar-title">
        RecipeDB
      </v-toolbar-title>

      <!-- <v-spacer></v-spacer> -->
      <v-btn v-if="!$store.state.accessToken" absolute bottom right nuxt>
        <nuxt-link to="/login">Login</nuxt-link>
      </v-btn>

      <v-navigation-drawer app v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

      <!-- <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer color="#0a0e1a" padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
        <v-col class="py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
      </v-row>
    </v-footer>
    <!-- <div class="footer">
      <div class="container">
        <div class="footer-column cc-footer">
          <a
            href="/"
            aria-current="page"
            class="navigation-logo w-inline-block w--current"
            ><img
              src="https://uploads-ssl.webflow.com/601f0f7d56a6413edca18d5d/601f0f7dcd749b3f1d0bc62c_logo-spoon-white.svg"
              alt=""
          /></a>
          <div class="text-footer-credits">
            © 2018 Spoon Inc, All rights reserved.
          </div>
        </div>
        <div class="footer-column">
          <div class="footer-links-list">
            <a href="/features" class="link-footer">Features</a
            ><a href="/premium" class="link-footer">Premium</a
            ><a href="/pricing" class="link-footer">Pricing</a>
          </div>
          <div class="footer-links-list">
            <a href="/about" class="link-footer">About</a
            ><a href="/blog" class="link-footer">Blog</a
            ><a href="/contact" class="link-footer">Contact</a>
          </div>
          
          <div class="footer-social">
            <a href="#" class="link-social w-inline-block"
              ><img
                src="https://uploads-ssl.webflow.com/601f0f7d56a6413edca18d5d/601f0f7dcd749b117b0bc636_icon-facebook.svg"
                alt=""/></a
            ><a href="#" class="link-social w-inline-block"
              ><img
                src="https://uploads-ssl.webflow.com/601f0f7d56a6413edca18d5d/601f0f7dcd749b02580bc637_icon-twitter.svg"
                alt=""/></a
            ><a href="#" class="link-social w-inline-block"
              ><img
                src="https://uploads-ssl.webflow.com/601f0f7d56a6413edca18d5d/601f0f7dcd749b95220bc638_icon-instagram.svg"
                alt=""
            /></a>
          </div>
        </div>
      </div>
    </div> -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      group: null,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-home",
          title: "Home",
          to: "/"
        },
        {
          icon: "mdi-account",
          title: "Account",
          to: "/account"
        },
        {
          icon: "mdi-pasta",
          title: "My Recipes",
          to: "/my-recipes"
        },

        {
          icon: "mdi-cart",
          title: "Shopping List",
          to: "/shopping-list"
        },
        {
          icon: "mdi-calendar-month-outline",
          title: "Meal Plan",
          to: "/meal-plan"
        },
        {
          icon: "mdi-upload-outline",
          title: "Import Recipe",
          to: "/import"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"]
    };
  },
  computed: {
    windowWith() {
      return this.$vuetify.breakpoint.width;
    }
  }
};
</script>
<style lang="scss" scoped>
.navIcon {
  margin: 0 !important;
}
.toolbar-title {
  padding-left: 20px;
}
a {
  color: white;
  text-decoration: none;
}
.footer-card {
  background-color: #333;
}
.footer {
  margin-top: 8rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 120px 30px 150px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  max-width: 100vw;
  background-color: #0a0e1a;
}
.appBar {
  box-shadow: none !important;
  /* background-color: transparent !important; */
}
.cc-footer {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  justify-content: center;
  /* -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column; */
}
.footer-column {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 50%;
}
.text-footer-credits {
  margin-top: 15px;
  font-family: "Libre Franklin", sans-serif;
  color: #666;
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
}
.footer-social {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 25%;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}
.footer-links-list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding-right: 50px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}
/* .container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1170px;
  display: flex;
} */
</style>
