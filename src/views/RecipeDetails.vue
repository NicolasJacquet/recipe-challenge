<template>
  <div>
    <error-notification>
      <button @click="onBackToHomeClick" class="back-link">
        Back to home page
      </button>
    </error-notification>
    <loading />
    <div v-if="detailsShouldBeVisible">
      <div class="details-header-image-container">
        <img
          class="details-header-image"
          :src="recipeDetails.details.image"
          :alt="recipeDetails.details.label"
        />
      </div>
      <h1 class="details-title">{{ recipeDetails.details.label }}</h1>

      <div class="detail-infos-container">
        <div class="detail-infos-item">
          <v-icon class="detail-infos-container-icon" name="external-link" />
          <p class="detail-infos-text">
            <span>Source website</span>
            <span>
              <a
                :href="recipeDetails.details.url"
                target="_blank"
                rel="noopener noreferrer"
                >{{ recipeDetails.details.source }}</a
              >
            </span>
          </p>
        </div>
        <div class="detail-infos-item">
          <v-icon class="detail-infos-container-icon" name="users" />
          <p class="detail-infos-text">
            <span>Yield</span>
            <span>serves {{ recipeDetails.details.yield }}</span>
          </p>
        </div>
        <div class="detail-infos-item">
          <v-icon class="detail-infos-container-icon" name="trending-up" />
          <p class="detail-infos-text">
            <span>Calories</span>
            <span>{{ formattedCalories }}</span>
          </p>
        </div>
      </div>

      <h2 class="details-ingredients-title">
        Ingredients
        <span>({{ recipeDetails.details.ingredients.length }})</span>
      </h2>
      <ul class="details-ingredient-list">
        <li
          v-for="(ingredient, index) in recipeDetails.details.ingredients"
          :key="index"
        >
          {{ ingredient.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ErrorNotification from "../components/ErrorNotification.vue";
import Loading from "../components/Loading.vue";
import { mapState } from "vuex";

export default {
  name: "recipe-details",
  components: {
    ErrorNotification,
    Loading
  },
  computed: {
    ...mapState(["recipeDetails", "error", "isLoading"]),
    detailsShouldBeVisible: function() {
      return !this.isLoading && this.recipeDetails;
    },
    formattedCalories: function() {
      return new Intl.NumberFormat().format(
        this.recipeDetails.details.calories.toFixed(2)
      );
    }
  },
  methods: {
    onBackToHomeClick: function() {
      this.$store.dispatch("unsetError");
      this.$router.push({
        name: "Home"
      });
    }
  },
  mounted() {
    if (
      !this.recipeDetails ||
      this.recipeDetails.recipeId !== this.$route.params.recipeId
    ) {
      this.$store.dispatch("loadRecipeDetails", {
        recipeId: this.$route.params.recipeId
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.details-title {
  font-size: 2.4rem;
  margin: 0 auto 10px;
}

.detail-infos-container {
  border: 1px solid #e7e7e7;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  border-radius: 6px;
  margin: 0 auto 50px;

  .detail-infos-item {
    display: flex;
    align-items: center;
    padding: 14px;
    flex-grow: 1;
    justify-content: space-around;
    flex-wrap: wrap;
    border-right: 1px solid #e7e7e7;

    &:last-child {
      border-right: 0;
    }
  }

  .detail-infos-text {
    margin: 0;
    display: flex;
    flex-direction: column;
    text-align: left;

    a {
      color: #1cacfa;

      &:hover,
      &:focus {
        text-decoration: none;
      }
    }

    span {
      &:first-child {
        font-size: 1rem;
        font-weight: bold;
      }
      &:last-child {
        font-size: 0.9rem;
      }
    }
  }

  .detail-infos-container-icon {
    width: 30px;
    display: none;

    @media (min-width: 480px) {
      display: block;
    }
  }
}

.details-header-image-container {
  padding: 16px;
  border: 1px solid #e7e7e7;
  max-width: 300px;
  margin: 0 auto 30px;
  border-radius: 4px;

  .details-header-image {
    display: block;
    width: 100%;
    border-radius: 3px;
  }
}

.details-ingredients-title {
  margin: 0 auto 20px;

  span {
    font-size: 70%;
    color: #8d8d8d;
  }
}

.details-ingredient-list {
  border: 1px solid #e7e7e7;
  text-align: left;
  padding: 0;
  list-style: none;
  border-radius: 6px;

  li {
    padding: 14px 20px;
    border-bottom: 1px solid #e7e7e7;

    &:last-child {
      border: 0;
    }

    &:nth-child(2n) {
      background: #f2f2f2;
    }
  }
}

.back-link {
  display: block;
  margin: 8px auto 0;
  color: #480f0f;
  background: none;
  border: 0;
  font-size: 0.9rem;
  text-decoration: underline;
  cursor: pointer;
  outline: 0;

  &:hover,
  &:focus {
    text-decoration: none;
  }
}
</style>
