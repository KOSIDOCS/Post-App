<template>
  <span>
    <v-navigation-drawer
      app
      v-model="drawer"
      class="brown lighten-2"
      dark
      disable-resize-watcher
    >
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-item :key="index" :to="item.url">
            <v-list-item-content>
              {{ item.title }}
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="brown darken-4" dark>
      <v-toolbar-side-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <router-link to="/" class="logo">
        <v-toolbar-title data-cy="titleBtn" color="white">{{
          appTitle
        }}</v-toolbar-title>
      </router-link>
      <v-btn text class="hidden-sm-and-down nav-menu" to="/" data-cy="HomeBtn"
        >Home</v-btn
      >
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-btn
        text
        class="hidden-sm-and-down nav-menu"
        to="/create-post"
        data-cy="CreateBtn"
        >Create Post</v-btn
      >
    </v-toolbar>
  </span>
</template>

<script>
export default {
  name: "AppNavigation",
  data() {
    return {
      appTitle: "Post App",
      drawer: false,
      items: [
        { title: "Home", url: "/" },
        { title: "Create Post", url: "/create-post" },
      ],
    };
  },
};
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}

.logo {
  color: white !important;
  margin-right: 20px;
}
</style>
