import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    data: {}
  },
  mutations: {
    set_data(state, data) {
      console.log("sssssssssssssssssssssssssss", data);
      state.data = data.data;
    }
  },
  actions: {
    getProfile(context, payload) {
      console.log("sssssssss", context, payload);
      try {
        return axios
          .get(`https://jsonplaceholder.typicode.com/posts/${payload}/comments`)
          .then(result => {
            console.log(result, "dd");
            context.commit("set_data", result);
          });
      } catch (err) {
        context.commit("set_data", null);
      }
    }
  }
});
export default store;
