<template>
  <div id="app">
    <h1>List of User Information</h1>
    <user-list />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserList from "./components/UserInformationList.vue";

export default defineComponent({
  name: "App",
  components: {
    UserList,
  },
});
</script>

<style>
#app {
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
