import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import RecipeDetails from "../views/RecipeDetails";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/recipe-details/:recipeId",
    name: "RecipeDetails",
    component: RecipeDetails
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
