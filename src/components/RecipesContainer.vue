<template>
  <section class="recipes-container">
    <h2 v-if="resultShouldBeVisible" class="recipes-title">
      Results
      <span class="resuls-count">({{ formattedResults }})</span>
    </h2>
    <loading />
    <error-notification />
    <div v-if="resultShouldBeVisible" class="results-container">
      <recipe-item
        v-for="(recipe, index) in results"
        :recipeData="recipe"
        :key="index"
      />
    </div>
  </section>
</template>

<script>
import RecipeItem from "./RecipeItem.vue";
import ErrorNotification from "./ErrorNotification.vue";
import Loading from "./Loading.vue";
import { mapState } from "vuex";

export default {
  name: "recipes-container",
  components: {
    RecipeItem,
    ErrorNotification,
    Loading
  },
  computed: {
    ...mapState([
      "results",
      "resultsCount",
      "isLoading",
      "lastSearchKeyword",
      "error"
    ]),
    formattedResults: function() {
      return new Intl.NumberFormat().format(this.resultsCount);
    },
    resultShouldBeVisible: function() {
      return (
        this.results.length > 0 &&
        this.lastSearchKeyword.length > 0 &&
        !this.isLoading
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.recipes-container {
  padding: 40px 0 0;
}

.recipes-title {
  margin: 0 0 30px;
}

.results-container {
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.resuls-count {
  color: #cacaca;
  font-size: 80%;
}
</style>
