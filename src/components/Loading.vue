<template>
  <div v-if="isLoading" class="loading-text">
    Loading...
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "loading",
  computed: {
    ...mapState(["isLoading"])
  }
};
</script>

<style lang="scss" scoped>
.loading-text {
  margin: 0 0 30px;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
