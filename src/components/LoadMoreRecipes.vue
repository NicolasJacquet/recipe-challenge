<template>
  <div v-if="this.searchInfo.more" class="load-more-container">
    <button @click="handleClick" class="load-more-btn">
      <v-icon class="more-icon" name="plus" /> Load more
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "load-more-recipes",
  computed: {
    ...mapState(["searchInfo"])
  },
  methods: {
    handleClick: function() {
      this.$store.dispatch("loadMoreResults", {
        queryKeyword: this.searchInfo.queryKeyword,
        from: this.searchInfo.from
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.load-more-container {
  width: 100%;
  padding: 30px 0;
}

.load-more-btn {
  cursor: pointer;
  background: #1cacfa;
  color: #ffffff;
  display: flex;
  align-items: center;
  border: 0;
  margin: 0 auto;
  padding: 12px 28px 12px 24px;
  border-radius: 80px;
  font-size: 1rem;
  outline: 0;

  .more-icon {
    width: 18px;
    margin-right: 6px;
    transition: transform ease 0.2s;
  }

  &:hover {
    .more-icon {
      transform: rotate(360deg);
    }
  }
}
</style>
