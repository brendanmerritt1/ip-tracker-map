<template>
  <div class="box">
    <div class="textcontainer">
      <h3 class="label">IP Address</h3>
      <span class="value">{{IPinfo.address}}</span>
    </div>
    <div class="textcontainer">
      <h3 class="label">Location</h3>
      <span class="value">{{IPinfo.loc}}</span>
    </div>
    <div class="textcontainer">
      <h3 class="label">Timezone</h3>
      <span class="value">{{IPinfo.timezone}}</span>
    </div>
    <div class="textcontainer">
      <h3 class="label">ISP</h3>
      <span class="value">{{IPinfo.isp}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["IPinfo"],
};
</script>

<style scoped>
@import "../styles/IPinfo.css";
</style>
