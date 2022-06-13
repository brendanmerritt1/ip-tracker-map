<template>
  <div class="container">
    <div class="title">{{ title }}</div>
    <div class="caption">{{ caption }}</div>
  </div>
</template>

<script>
export default {
  props: ["title", "caption"],
};
</script>

<style scoped>
@import "../styles/InfoBox.css";
</style>
