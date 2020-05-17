<template>
  <main class="main-container">
    <router-view />
  </main>
</template>

<script>
export default {
  name: "mai-page-container"
};
</script>

<style lang="scss" scoped>
.main-container {
  padding: 30px 20px;
  max-width: 680px;
  margin: 0 auto;
}
</style>
