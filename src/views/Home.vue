<template>
  <div>
    <search-bar />
    <recipes-container />
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";
import RecipesContainer from "../components/RecipesContainer.vue";

export default {
  name: "App",
  components: {
    SearchBar,
    RecipesContainer
  }
};
</script>
