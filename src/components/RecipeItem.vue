<template>
  <article class="item-container">
    <div class="recipe-image-container">
      <!--<img
        :src="recipeData.image"
        :alt="recipeData.label"
        class="recipe-image"
      />-->
      <v-lazy-image
        class="recipe-image"
        :src="recipeData.image"
        :src-placeholder="imagePlaceholder"
        :alt="recipeData.label"
      />
    </div>
    <div class="recipe-infos-container">
      <h3 class="recipe-title">{{ recipeData.label }}</h3>
      <div class="recipe-cal">
        {{ formattedCalories }}
        calories
      </div>
      <div class="ingredients-container">
        <h4 class="ingredients-title">Ingredients</h4>
        <ul class="ingredients-list">
          <li
            v-for="ingredient in reducedIngredientList(
              recipeData.ingredientLines
            )"
            :key="ingredient"
          >
            {{ ingredient }}
          </li>
          <li>
            ...
          </li>
        </ul>
      </div>
    </div>
    <div class="link-container">
      <button @click="seeRecipeDetails" class="recipe-details-link">
        See the recipe
        <v-icon class="recipe-details-link-icon" name="chevron-right"></v-icon>
      </button>
    </div>
  </article>
</template>

<script>
export default {
  name: "recipe-item",
  props: {
    recipeData: Object
  },
  data() {
    return {
      imagePlaceholder: require("./../assets/placeholder.png")
    };
  },
  computed: {
    formattedCalories: function() {
      return new Intl.NumberFormat().format(
        this.recipeData.calories.toFixed(2)
      );
    }
  },
  methods: {
    seeRecipeDetails: function() {
      this.$router.push({
        name: "RecipeDetails",
        params: { recipeId: this.getRecipeId() }
      });
    },
    reducedIngredientList: function(ingredients) {
      const duplicateRemoved = new Set(ingredients);
      return [...duplicateRemoved].slice(0, 3);
    },
    getRecipeId: function() {
      return this.recipeData.uri.split("#recipe_")[1];
    }
  }
};
</script>

<style lang="scss" scoped>
.item-container {
  padding: 16px 20px 22px;
  border: 1px solid #e7e7e7;
  box-shadow: 6px 10px 8px -6px rgba(0, 0, 0, 0.04);
  margin-bottom: 18px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 48%;
}

.recipe-image-container {
  width: 100%;
  margin-bottom: 22px;

  .recipe-image {
    &.v-lazy-image {
      display: block;
      width: 100%;
      border-radius: 3px;
      opacity: 0.5;
      transition: opacity 0.7s;

      &.v-lazy-image-loaded {
        opacity: 1;
      }
    }
  }
}

.recipe-infos-container {
  .recipe-title {
    margin: 0 0 4px;
    color: #126a9a;
    font-size: 1.2rem;
  }

  .recipe-cal {
    color: #8d8d8d;
    font-size: 0.9rem;
    margin: 0 auto 20px;
  }

  .ingredients-title {
    margin: 0 auto 10px;
  }

  .ingredients-list {
    list-style: circle;
    padding-left: 28px;
    margin: 0 auto 30px;
  }
}

.link-container {
  flex-grow: 1;
  display: flex;
  align-items: flex-end;

  .recipe-details-link {
    border: 0;
    cursor: pointer;
    outline: none;
    font-weight: bold;
    text-decoration: none;
    width: 100%;
    display: flex;
    color: #ffffff;
    background: #1cacfa;
    justify-content: space-between;
    padding: 12px 26px;
    border-radius: 50px;
    align-items: center;
    font-size: 0.9rem;
    transition: transform ease 0.2s;

    .recipe-details-link-icon {
      transition: transform ease 0.2s;
      width: 22px;
    }

    &:hover {
      transform: translateY(-3px);

      .recipe-details-link-icon {
        transform: translateX(10px);
      }
    }
  }
}
</style>
