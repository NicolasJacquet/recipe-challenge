import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

const ApplicationID = "014609a1";
const ApplicationKeys = "9abea56877c9bf35aa8b2f987a29a5a8";
const baseApiUrl = `https://api.edamam.com/search?app_id=${ApplicationID}&app_key=${ApplicationKeys}`;

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
    lastSearchKeyword: "",
    resultsCount: 0,
    results: [],
    isLoading: false,
    error: false,
    recipeDetails: null
  },
  actions: {
    unsetError({ commit }) {
      commit("UNSET_ERROR");
    },
    loadRecipeDetails({ commit }, payload) {
      commit("SET_LOADING", true);
      axios
        .get(
          `${baseApiUrl}&r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${payload.recipeId}`
        )
        .then(r => r.data)
        .then(data => {
          commit("SET_RECIPE_DETAILS", {
            data: {
              details: data[0],
              recipeId: payload.recipeId
            },
            isLoading: false,
            error: false
          });
        })
        .catch(() => {
          commit("SET_RECIPE_DETAILS", {
            data: null,
            error: true,
            isLoading: false
          });
        });
    },
    loadResults({ commit }, payload) {
      commit("SET_LOADING", true);
      axios
        .get(`${baseApiUrl}&to=60&q=${payload.currentSearchKeyword}`)
        .then(r => r.data)
        .then(data => {
          const results = data.hits.map(result => {
            return result.recipe;
          });
          commit("SET_RESULTS", {
            results,
            resultsCount: data.count,
            isLoading: false,
            lastSearchKeyword: payload.currentSearchKeyword,
            error: false
          });
        })
        .catch(() => {
          commit("SET_RESULTS", {
            results: [],
            resultsCount: 0,
            isLoading: false,
            lastSearchKeyword: "",
            error: true
          });
        });
    }
  },
  mutations: {
    UNSET_ERROR(state) {
      state.error = false;
    },
    SET_RECIPE_DETAILS(state, data) {
      state.isLoading = data.isLoading;
      state.recipeDetails = data.data;
      state.error = data.error;
    },
    SET_RESULTS(state, data) {
      state.results = data.results;
      state.resultsCount = data.resultsCount;
      state.isLoading = data.isLoading;
      state.lastSearchKeyword = data.lastSearchKeyword;
      state.error = data.error;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    }
  }
});
