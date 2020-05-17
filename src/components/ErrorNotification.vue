<template>
  <div v-if="error" class="errorNotification">
    Something went wrong, please try again later.
    <slot />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "error-notification",
  computed: {
    ...mapState(["error"])
  }
};
</script>

<style lang="scss" scoped>
.errorNotification {
  background: #ffd8d8;
  border: 1px solid #be6464;
  padding: 14px 20px;
  border-radius: 100px;
  font-weight: bold;
}
</style>
