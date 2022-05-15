<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Edit customer</h3>
    </header>
    <div>
      <label>Author: </label>
      <input v-model="book.author" />
    </div>
    <div>
      <label>Title: </label>
      <input v-model="book.title" />
    </div>
    <div>
      <label>Release Date: </label>
      <input v-model="book.releaseDate" />
    </div>
    <div>
      <label>status: </label>
      <input v-model="book.status" />
    </div>
    <div>
      <label>Language: </label>
      <input v-model="book.language" />
    </div>
    <div>
      <label>Categories: </label>
      <input v-model="book.categories" />
    </div>
    <div>
      <button class="btn btn-primary btn-block mt-2" @click="saveBook()">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CustomerService from "@/services/CustomerService";

@Component
export default class Book extends Vue {
  private book = "";
  private id = "";

  mounted() {
    this.id = this.$route.params.id;
    if (this.id) {
      this.getCustomer();
    }
  }
  getCustomer() {
    CustomerService.getCustomer(parseInt(this.id)).then(
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
