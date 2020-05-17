<template>
  <header class="header">
    <h1 class="header-main-title">Recipe challenge</h1>
    <div class="header-link-container">
      <router-link exact to="/" class="header-link">
        <span class="header-link-text">Home</span>
        <v-icon class="home-icon" name="home"></v-icon>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "main-header"
};
</script>

<style scoped lang="scss">
.header {
  z-index: 1000;
  background: rgb(28, 172, 250);
  color: #ffffff;
  position: sticky;
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
}

.header-main-title {
  margin: 0 20px 0 0;
  font-size: 1.4rem;

  @media (min-width: 480px) {
    font-size: 1.8rem;
  }
}

.header-link {
  color: #ffffff;
  display: flex;
  align-items: center;
  position: relative;

  .header-link-text {
    position: absolute;
    right: 44px;
    opacity: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    font-weight: bold;
    visibility: hidden;
    transform: translateX(20px);
    transition: opacity ease 0.3s, transform ease 0.3s;
  }

  .home-icon {
    width: 28px;

    @media (min-width: 480px) {
      width: 34px;
    }
  }

  &:hover {
    .header-link-text {
      visibility: visible;
      opacity: 1;
      transform: translateX(0);
    }
  }
}
</style>
