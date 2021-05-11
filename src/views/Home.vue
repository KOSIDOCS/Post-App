<template>
  <v-container grid-list-lg>
    <v-layout row>
      <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5"
        >All The Posts</v-flex
      >
    </v-layout>
    <v-layout row wrap class="all-post">
      <v-flex xs12 sm12 md4 v-for="post in allPosts" :key="post.id">
        <v-card>
          <v-card-text>
            <div>
              <h3 class="headline mb-0 title">Title: {{ post.title }}</h3>
              <div>
                {{ post.body }}
              </div>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              outline
              block
              color="brown"
              @click="showComments(post.id)"
              data-cy="postDetailBtn"
            >
              Post Details</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  computed: {
    allPosts() {
      return this.$store.state.posts;
    },
  },
  methods: {
    showComments(id) {
      this.$store.dispatch("getComments", id);
    },
  },
  created() {
    this.$store.dispatch("getPosts");
  },
};
</script>

<style lang="scss" scoped>
.title {
  color: "brown";
}
</style>
