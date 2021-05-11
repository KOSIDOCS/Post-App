import router from "@/router";
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    comments: [],
    apiUrl: "https://jsonplaceholder.typicode.com",
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload;
    },
    setComments(state, payload) {
      state.comments = payload;
    },
  },
  actions: {
    async getPosts({ state, commit }) {
      try {
        let response = await axios.get(`${state.apiUrl}/posts`);
        commit("setPosts", response.data);
      } catch (error) {
        commit("setPosts", []);
      }
    },
    async getComments({ state, commit }, id) {
      try {
        let response = await axios.get(`${state.apiUrl}/posts/${id}/comments`);
        commit("setComments", response.data);
        router.push({ name: "Details", params: { id: id } });
      } catch (error) {
        commit("setComments", []);
      }
    },
    async deletePost({ state }, id) {
      try {
        let response = await axios.delete(`${state.apiUrl}/posts/${id}`);
        if (response.status === 200) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updatePost({ state }, post) {
      try {
        let response = await axios.put(`${state.apiUrl}/posts/${post.id}`, {
          body: JSON.stringify(post),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        if (response.status === 200) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createPost({ state }, post) {
      console.log(post);
      try {
        let response = await axios.post(`${state.apiUrl}/posts`, {
          body: JSON.stringify(post),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        console.log(response);
        if (response.status === 201) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
