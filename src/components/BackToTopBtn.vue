<template>
  <button @click="backToTop" v-if="isVisible" class="back-to-top-btn">
    <v-icon class="top-icon" name="arrow-up" />
  </button>
</template>

<script>
export default {
  name: "back-to-top-btn",
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    scrollHandle: function() {
      if (window.scrollY > 800) {
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }
    },
    backToTop: function() {
      window.scroll({
        top: 0,
        behavior: "smooth"
      });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHandle);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollHandle);
  }
};
</script>

<style lang="scss" scoped>
.back-to-top-btn {
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 1000;
  background: #1cacfa;
  border: 0;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  outline: 0;
  color: #ffffff;
  cursor: pointer;

  .top-icon {
    width: 30px;
    transition: transform ease 0.3s;
  }

  &:hover {
    .top-icon {
      transform: translateY(-4px);
    }
  }
}
</style>
