<template>
  <div class="topbar">
    <div class="searchContainer">
      <div class="headerContainer">
        <h1 class="header">IP Address Tracker</h1>
      </div>
      <div class="userIP">Your IP Address:</div>
      <div class="inputContainer">
        <input class="input" type="text" placeholder="Search any IP address" />
        <div class="iconContainer">
          <i class="fa-solid fa-right-to-bracket fa-lg"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "../styles/HomeView.css";
</style>

<script>
export default {
  name: "HomeView",
  components: {},
};
</script>
