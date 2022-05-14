<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Add a new book</h3>
    </header>
    <div>
      Author:<input v-model="author" placeholder="author">
    </div>
    <div>
      Title:<input v-model="title" placeholder="title">
    </div>
    <div>
      Release date:<input v-model="release_date" placeholder="release date">
    </div>
    <div>
      Status:<input v-model="book_status" placeholder="status">
    </div>
    <div>
      Language:<input v-model="language" placeholder="language">
    </div>
    <div>
      Categories:<input v-model="categories" placeholder="categories">
    </div>
    <button @click="postData()">Add</button>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import UserService from "@/services/UserService";

@Component
export default class BookAddNew extends Vue {
  postData() {
    console.log();
  }

}
</script>
