<template>
  <div id="app">
    <main-header />
    <main-page-container />
    <back-to-top-btn />
  </div>
</template>

<script>
// @ is an alias to /src
import MainHeader from "./components/MainHeader.vue";
import MainPageContainer from "./components/MainPageContainer.vue";
import BackToTopBtn from "./components/BackToTopBtn.vue";

export default {
  name: "App",
  components: {
    MainHeader,
    MainPageContainer,
    BackToTopBtn
  }
};
</script>

<style lang="scss">
body {
  margin: 0 auto;
}

*,
*::after,
*::before {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
