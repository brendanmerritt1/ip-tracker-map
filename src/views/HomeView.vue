<template>
  <div class="main">
    <div class="topbar">
      <div class="searchContainer">
        <div class="headerContainer">
          <h1 class="header">IP Address Tracker</h1>
        </div>
        <div class="userIP">Your IP Address: 192.168.1.1</div>
        <div class="inputContainer">
          <input
            class="input"
            type="text"
            placeholder="Search any IP address"
          />
          <div class="iconContainer">
            <i class="fa-solid fa-right-to-bracket fa-lg"></i>
          </div>
        </div>
        <IPinfo />
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>

<style>
@import "../styles/HomeView.css";
</style>

<script>
import IPinfo from "../components/IPinfo";
import leaflet from "leaflet";
import axios from "axios";
import { onMounted } from "vue";

export default {
  name: "HomeView",
  components: { IPinfo },
  setup() {
    let map, APIKEY;
    onMounted(() => {
      map = leaflet.map("map").setView([51.505, -0.09], 13);

      async function apiRequest() {
        let res = await axios.get("/apikey");
        APIKEY = res.data.key;
      }

      async function mapInit() {
        await apiRequest();

        leaflet
          .tileLayer(
            `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${APIKEY}`,
            {
              attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
              maxZoom: 18,
              id: "mapbox/streets-v11",
              tileSize: 512,
              zoomOffset: -1,
              accessToken: `${APIKEY}`,
            }
          )
          .addTo(map);
      }

      mapInit();
    });
  },
};
</script>
