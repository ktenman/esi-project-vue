<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Edit book</h3>
    </header>
    <div>
      <label>Author: </label>
      <input v-model=book.author>
    </div>
    <div>
      <label>Title: </label>
      <input v-model=book.title>
    </div>
    <div>
      <label>Release Date: </label>
      <input v-model=book.releaseDate>
    </div>
    <div>
      <label>status: </label>
      <input v-model=book.status>
    </div>
    <div>
      <label>Language: </label>
      <input v-model=book.language>
    </div>
    <div>
      <label>Categories: </label>
      <input v-model=book.categories>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import UserService from "@/services/UserService";

@Component
export default class Book extends Vue {
  private book = "";
  private url_data = "";

  mounted() {
    this.url_data=this.$route.params.id;
    UserService.getBook(parseInt(this.url_data)).then(
        (response) => {
          this.book = response.data;
        },
        (error) => {
          this.book =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        }
    );
  }
}
</script>
