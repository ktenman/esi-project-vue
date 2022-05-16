<template>
  <div class="container">
    <header>
      <h3>{{ id ? "Edit book" : "Create book" }}</h3>
    </header>
    <div>
      <label>Author: </label>
      <input v-model="book.author" class="form-control" placeholder="Author" />
    </div>
    <div>
      <label>Title: </label>
      <input v-model="book.title" class="form-control" placeholder="Title" />
    </div>
    <div>
      <label>Release Date: </label>
      <input
        v-model="book.releaseDate"
        class="form-control"
        placeholder="Release date"
      />
    </div>
    <div>
      <label>status: </label>
      <input v-model="book.status" class="form-control" placeholder="Status" />
    </div>
    <div>
      <label>Language: </label>
      <input
        v-model="book.language"
        class="form-control"
        placeholder="Language"
      />
    </div>
    <div>
      <label>Categories: </label>
      <input
        v-model="book.categories"
        class="form-control"
        placeholder="Categories"
      />
    </div>
    <div>
      <button class="btn btn-primary btn-block mt-2" @click="saveBook()">
        Save
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BookService from "@/services/BookService";
import { namespace } from "vuex-class";

const Auth = namespace("Auth");

@Component
export default class Book extends Vue {
  @Auth.State("user")
  private currentUser!: any;
  private book = "";
  private id = "";
  
  mounted() {
    this.id = this.$route.params.id;
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    if (this.id) {
      this.getBook();
    }
  }
  getBook() {
    BookService.getBook(parseInt(this.id)).then(
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

  saveBook() {
    BookService.editBook(this.book).then(
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
