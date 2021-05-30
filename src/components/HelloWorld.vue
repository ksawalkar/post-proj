<template>
  <v-container>
    <template>
      <v-card class="mx-auto list-section" max-width="800" tile>
        <v-list flat>
          <h1 class="text-center">Post Data</h1>
          <h1 v-if="orders.length == 0 && !noDataFound && !showLoader">
            No Data Found
          </h1>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(order, i) in ordersLists" :key="i">
              <v-list-item-icon class="mr-1">
                <h4>{{ i + 1 + (page - 1) * perPageData }}.</h4>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  @click="inDetail(order)"
                  v-text="order.title"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <div v-if="showLoader">
            <!-- <v-progress-circular
              :size="70"
              :width="7"
              color="purple"
              indeterminate
            ></v-progress-circular> -->
            <v-skeleton-loader
              v-bind="attrs"
              type="article, article, article, article"
            ></v-skeleton-loader>
          </div>
        </v-list>
      </v-card>
    </template>

    <div class="text-center mt-2">
      <v-pagination
        v-model="page"
        @click="clickCallback(page)"
        :length="4"
        circle
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },

  data: () => ({
    showLoader: false,
    selectedItem: null,
    page: 1,
    orders: [],
    abc: {},
    noDataFound: false,
    searchMovie: "",
    series: "",
    movies: "",
    ordersList: "",
    isChecked: "",
    ordersLists: [],
    count: 0,
    perPageData: 20
  }),
  async created() {
    console.log(this.isChecked);
    await this.getMovieList();
    this.clickCallback(1);
  },
  methods: {
    inDetail(detail) {
      console.log(detail);
      var title = encodeURIComponent(detail.title);
      var body = encodeURIComponent(detail.body);
      this.$router.push(`/details/${detail.id}/${title}/${body}`);
    },
    clickCallback(pageNum) {
      this.showLoader = true;
      console.log("paginatiom", pageNum);
      this.ordersLists = [];
      var page = pageNum - 1;
      var startValue = page * 20;
      var endValue = pageNum * 20;
      setTimeout(() => {
        this.ordersLists = this.orders.slice(startValue, endValue);
        this.showLoader = false;
      }, 2000);
    },
    getMovieList() {
      this.showLoader = true;
      return axios
        .get(`https://jsonplaceholder.typicode.com/posts`)
        .then(result => {
          console.log(result);
          if (result.status == "200") {
            this.showLoader = false;
            this.orders = result.data;
            this.ordersList = result.data;
            this.noDataFound = false;
            this.count = this.orders.length / 20;
          } else {
            this.showLoader = false;
            this.noDataFound = true;
            this.orders = [];
          }
        });
    }
  },
  watch: {
    page: function(pageNo) {
      if (pageNo) {
        this.clickCallback(pageNo);
      }
    }
  }
};
</script>
