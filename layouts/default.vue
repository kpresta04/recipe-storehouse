<template>
  <v-app>
    <v-app-bar absolute color="#fcb69f" dark src="/ar1.jpg" app>
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-app-bar-nav-icon
        class="navIcon"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="toolbar-title">
        RecipeDB
      </v-toolbar-title>

      <v-spacer></v-spacer>
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
    <v-footer dark padless class="footer">
      <v-card flat tile class="footer-card lighten-1 white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>RecipeDB</strong>
        </v-card-text>
      </v-card>
    </v-footer>
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
  background-color: #353535 !important;
}
.footer {
  margin-top: 8rem;
}
</style>
