<template>
  <form @submit.prevent="search" class="search-container">
    <input
      class="search-bar"
      v-model.trim="currentSearchKeyword"
      type="text"
      placeholder="Search for a recipe"
    />
    <button
      title="Search"
      :disabled="isButtonDisabled"
      type="submit"
      class="search-btn"
    >
      <v-icon v-if="isLoading" class="search-loader" name="loader"></v-icon>
      <v-icon v-else class="search-icon" name="search"></v-icon>
    </button>
  </form>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "search-bar",
  data: () => {
    return {
      currentSearchKeyword: "",
      isButtonDisabled: true
    };
  },
  mounted() {
    this.currentSearchKeyword = this.lastSearchKeyword;
  },
  computed: mapState(["isLoading", "lastSearchKeyword"]),
  methods: {
    search: function() {
      const search = this.currentSearchKeyword;
      if (search !== this.lastSearchKeyword && !this.isLoading) {
        this.$store.dispatch("loadResults", {
          currentSearchKeyword: search
        });
      }
    }
  },
  watch: {
    currentSearchKeyword(val) {
      this.isButtonDisabled = val.length <= 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.search-container {
  position: relative;
}

.search-btn {
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  background: #1cacfa;
  color: #ffffff;
  padding: 0 26px;
  border-radius: 0 100px 100px 0;
  font-weight: bold;
  font-size: 1rem;
  outline: 0;
  cursor: pointer;
  border: 2px solid transparent;
  border-left: 0;

  .search-icon {
    width: 24px;
    transition: transform ease-in 0.2s;
  }

  &:hover:not(:disabled) {
    .search-icon {
      transform: scale(1.2);
    }
  }

  &:disabled {
    cursor: default;
    background: #e7e7e7;
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.search-loader {
  width: 24px;
  animation: spin 2s linear infinite;
}

.search-bar {
  padding: 14px 80px 14px 20px;
  border-radius: 100px;
  width: 100%;
  outline: 0;
  border: 2px solid #e7e7e7;
  font-size: 1rem;

  &:focus {
    border-color: #1cacfa;

    & + .search-btn {
      border-color: #1cacfa;
    }
  }
}
</style>
