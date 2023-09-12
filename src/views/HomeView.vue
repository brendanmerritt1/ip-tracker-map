<template>
  <div class="main">
    <div class="topbar">
      <MqResponsive target="tablet+">
        <div class="infoBox">
          <InfoBox :title="$data.title[0]" :caption="$data.caption[0]" />
        </div>
      </MqResponsive>
      <div class="searchContainer">
        <div class="headerContainer">
          <h1 class="header">IP Address Tracker</h1>
        </div>
        <div class="userIP">Your IP Address: {{ userIP }}</div>
        <div class="inputContainer">
          <input
            class="input"
            type="text"
            placeholder="Search any IP address"
            v-model="queryIP"
            v-on:keyup.enter="getIPinfo"
          />
          <div class="iconContainer">
            <i
              @click="getIPinfo"
              class="fa-solid fa-right-to-bracket fa-lg"
            ></i>
          </div>
        </div>
        <IPinfo v-if="IPinfo" :IPinfo="IPinfo" />
      </div>
      <MqResponsive target="tablet+">
        <div class="infoBox">
          <InfoBox :title="$data.title[1]" :caption="$data.caption[1]" />
        </div>
      </MqResponsive>
    </div>
    <div id="map"></div>
    <MqResponsive target="phone">
      <div class="bottomContainer">
        <div class="infoBox">
          <InfoBox :title="$data.title[0]" :caption="$data.caption[0]" />
        </div>
        <div class="infoBox">
          <InfoBox :title="$data.title[1]" :caption="$data.caption[1]" />
        </div>
      </div>
    </MqResponsive>
  </div>
</template>

<style>
@import "../styles/HomeView.css";
</style>

<script>
import IPinfo from "../components/IPinfo";
import InfoBox from "../components/InfoBox";
import leaflet from "leaflet";
import axios from "axios";
import { MqResponsive } from "vue3-mq";
import { onMounted, ref } from "vue";

export default {
  name: "HomeView",
  components: { IPinfo, InfoBox, MqResponsive },
  data() {
    return {
      title: ["What is an IP address?", "How does this tool work?"],
      caption: [
        "An IP address is a series of numbers that identifies any device on a network. They are used as identification while communicating over the internet, as well as on other networks. IP addresses contain location information and act as unique identifiers - meaning no two of the same public IP address exists.",
        "This tool uses a geolocation API that fetches the location of the inputted IP address, and MapBox's API to display the resulting data. Public IP addresses do not contain information on one's exact location, and as such, this tool can only give a general area of the queried address.",
      ],
    };
  },
  setup() {
    let map, APIKEY, GeoAPIKEY;
    const userIP = ref(null);
    const queryIP = ref("");
    const IPinfo = ref(null);
    const axiosInstance = axios.create({ baseURL: process.env.API_URL });
    onMounted(() => {
      map = leaflet.map("map").setView([34.139, 19.2349], 2.5);
      const userIPinfo = async () => {
        try {
          const response = await axiosInstance.get("/GeoAPIKey");
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
        let res = await axiosInstance.get("/MapboxAPIkey");
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
        const response = await axiosInstance.get("/GeoAPIkey");
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
