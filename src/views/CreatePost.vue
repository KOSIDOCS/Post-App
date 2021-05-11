<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md12>
        <v-card class="elevation-12">
          <v-toolbar dark color="brown">
            <v-toolbar-title>Create Post</v-toolbar-title>
          </v-toolbar>
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
              data-cy="createSubmitBtn"
              >Create Post</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "CreateForm",
  data() {
    return {
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
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("createPost", {
          title: this.title,
          body: this.body,
          userId: 1,
        });
      }
    },
  },
};
</script>
