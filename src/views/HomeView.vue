<template>
  <div class="main">
    <div class="topbar">
      <div class="searchContainer">
        <div class="headerContainer">
          <h1 class="header">IP Address Tracker</h1>
        </div>
        <div class="userIP">Your IP Address: {{userIP}}</div>
        <div class="inputContainer">
          <input
            class="input"
            type="text"
            placeholder="Search any IP address"
            v-model="queryIP"
          />
          <div class="iconContainer">
            <i
              @click="getIPinfo"
              class="fa-solid fa-right-to-bracket fa-lg"
            ></i>
          </div>
        </div>
        <IPinfo v-if="IPinfo" v-bind:IPinfo="IPinfo" />
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
import { onMounted, ref } from "vue";

export default {
  name: "HomeView",
  components: { IPinfo },
  setup() {
    let map, APIKEY, GeoAPIKEY;
    const userIP = ref(null);
    const queryIP = ref("");
    const IPinfo = ref(null);
    onMounted(() => {
      map = leaflet.map("map").setView([34.139, 19.2349], 2.5);
      const userIPinfo = async () => {
        try {
          const response = await axios.get("/GeoAPIKey");
          GeoAPIKEY = response.data.key;
          const data = await axios.get(
            `https://geo.ipify.org/api/v2/country,city?apiKey=${GeoAPIKEY}`
          );
          const result = data.data;
          IPinfo.value = {
            address: result.ip,
            loc: result.location.region,
            timezone: result.location.timezone,
            isp: result.isp,
            lat: result.location.lat,
            lng: result.location.lng,
          };
          leaflet.marker([IPinfo.value.lat, IPinfo.value.lng]).addTo(map);
          map.setView([IPinfo.value.lat, IPinfo.value.lng], 11);
          userIP.value = IPinfo.value.address;
        } catch (e) {
          alert(e.message);
        }
      };

      const mapInit = async () => {
        let res = await axios.get("/MapboxAPIkey");
        APIKEY = res.data.key;
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
      };

      userIPinfo();
      mapInit();
    });

    const getIPinfo = async () => {
      try {
        const response = await axios.get("/GeoAPIkey");
        GeoAPIKEY = response.data.key;
        const data = await axios.get(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${GeoAPIKEY}&ipAddress=${queryIP.value}`
        );
        const result = data.data;
        IPinfo.value = {
          address: result.ip,
          loc: result.location.region,
          timezone: result.location.timezone,
          isp: result.isp,
          lat: result.location.lat,
          lng: result.location.lng,
        };
        leaflet.marker([IPinfo.value.lat, IPinfo.value.lng]).addTo(map);
        map.setView([IPinfo.value.lat, IPinfo.value.lng], 13);
      } catch (e) {
        alert(e.message);
      }
    };

    return { queryIP, IPinfo, getIPinfo, userIP };
  },
};
</script>
