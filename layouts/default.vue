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
      <v-toolbar-title>
        Recipe DB
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
      title: "Vuetify.js"
    };
  }
};
</script>
<style lang="scss" scoped>
.navIcon {
  margin: 0;
}
a {
  color: white;
  text-decoration: none;
}
</style>
