<template>
  <v-container grid-list-lg>
    <v-layout row>
      <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5"
        >Posts Details</v-flex
      >
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm12 md12 v-for="post in post" :key="post.id">
        <v-card>
          <v-card-text>
            <div>
              <h3 class="headline mb-0">Title: {{ post.title }}</h3>
              <div>
                {{ post.body }}
              </div>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon
                outline
                color="brown"
                @click="deletePost(post.id)"
                data-cy="postDetailBtn"
                >mdi-delete</v-icon
              >
            </v-btn>
            <div class="text-center">
              <v-bottom-sheet v-model="sheet">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon>
                    <v-icon
                      outline
                      color="brown"
                      v-bind="attrs"
                      v-on="on"
                      data-cy="postDetailBtn"
                      >mdi-pencil</v-icon
                    >
                  </v-btn>
                </template>
                <v-sheet class="text-center" height="500px">
                  <v-btn
                    class="mt-6"
                    text
                    color="error"
                    @click="sheet = !sheet"
                  >
                    close
                  </v-btn>

                  <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md8>
                      <v-card class="elevation-12">
                        <v-card-text>
                          <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                              prepend-icon="mdi-card-text"
                              name="title"
                              label="Post Title"
                              type="text"
                              v-model="title"
                              :rules="titleRules"
                              data-cy="titleField"
                              required
                            >
                            </v-text-field>
                            <v-textarea
                              prepend-icon="mdi-card-text"
                              name="body"
                              label="Post Body"
                              type="text"
                              required
                              v-model="body"
                              :rules="bodyRules"
                              data-cy="bodyField"
                            >
                            </v-textarea>
                          </v-form>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="brown"
                            class="white--text"
                            :disabled="!valid"
                            @click="submit"
                            data-cy="joinSubmitBtn"
                            >Update Post</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-sheet>
              </v-bottom-sheet>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5"
        >Posts Comments</v-flex
      >
    </v-layout>

    <v-layout row wrap class="all-post">
      <v-flex xs12 sm12 md12 v-for="comment in allComments" :key="comment.id">
        <v-card>
          <v-card-text>
            <div>
              <h3 class="headline mb-0">Name: {{ comment.name }}</h3>
              <h3 class="headline mb-0">E-mail: {{ comment.email }}</h3>
              <div>
                {{ comment.body }}
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      sheet: false,
      valid: false,
      title: "",
      body: "",
      titleRules: [
        (v) => !!v || "Post Title is required",
        (v) =>
          v.length >= 3 || "Post Title should not be less than 3 characters",
      ],
      bodyRules: [
        (v) => !!v || "Post Body is required",
        (v) =>
          v.length >= 3 || "Post Body should not be less than 3 characters",
      ],
    };
  },
  computed: {
    allComments() {
      return this.$store.state.comments;
    },
    post() {
      let posts = this.$store.state.posts;
      let currentId = this.$route.params.id;
      return posts.filter((post) => post.id === currentId);
    },
  },
  methods: {
    deletePost(id) {
      return this.$store.dispatch("deletePost", id);
    },
    submit() {
      if (this.$refs["form"][0].validate()) {
        this.$store.dispatch("updatePost", {
          id: this.post[0].id,
          title: this.title,
          body: this.body,
          userId: this.post[0].userId,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
