<template>
  <div>
    <!-- <div class="text-center">
      <h2 class="text-center">{{ titleOfUser }}</h2>
      {{ bodyOfUser }}
    </div> -->
    <v-card class="mx-auto mt-5" max-width="800" tile>
      <v-btn class="ma-2" outlined color="indigo" @click="backToHomePage()">
        Back
      </v-btn>
      <div class="mx-4 mb-2">
        <h2 class="text-center">{{ titleOfUser }}</h2>
        <h4>Body: {{ bodyOfUser }}</h4>
      </div>
      <hr>
      <div v-if="newData">
        <v-list-item v-for="(item, i) in title" :key="i" three-line>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ item.email }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ item.body }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div v-if="showLoader">
        <v-skeleton-loader
          v-bind="attrs"
          type="article, article, article, article"
        ></v-skeleton-loader>
      </div>
    </v-card>
    <!-- 
  <div class="about">
    <div class="about">
      {{ title }}
    </div>
    <button type="button" @click="backToHomePage()">Back</button>
  </div> -->
  </div>
</template>
<script>
import store from "../store/index";

export default {
  data() {
    return {
      titleOfUser: "",
      bodyOfUser: "",
      showLoader: false,
      newData: false
    };
  },
  computed: {
    title() {
      return store.state.data; /** error   here */
    }
  },
  async created() {
    try {
      this.showLoader = true;
      if (this.$route.params.id) {
        this.titleOfUser = decodeURIComponent(this.$route.params.title);
        this.bodyOfUser = decodeURIComponent(this.$route.params.body);
        await store.dispatch("getProfile", this.$route.params.id);
        this.newData = true;
        this.showLoader = false;
      }
    } catch (error) {
      this.showLoader = false;
      console.log(error);
    }
  },
  methods: {
    backToHomePage() {
      this.$router.push("/");
    }
  }
};
</script>
