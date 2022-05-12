<template>
  <div class="container">
    <header class="jumbotron">
<!--      <h3>{{ content }}</h3>-->
      <ul>
        <li v-if="content" v-for="item in content" :key="item.id">
          username: {{ item.user.username }}, type: {{ item.user.type }}
        </li>
      </ul>
      <div v-if="!content">Not allowed</div>
    </header>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import UserService from "@/services/UserService";

@Component
export default class UserBoard extends Vue {
  private content = "";

  mounted() {
    UserService.getUserBoard().then(
        (response) => {
          this.content = response.data;
        },
        (error) => {
          this.content =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
  }
}
</script>
