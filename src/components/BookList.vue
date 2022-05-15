<template>
  <div class="container">
    <header class="jumbotron">
      <h3>List of all books</h3>
      <div class="input-group">
          <input @keyup.enter="loadBooks()" type="text" class="form-control" placeholder="Search" v-model="searchKey">
          <button @click="loadBooks()" class="input-group-text" >&#x1F50E</button>
      </div>
    </header>
    <div id="books">
      <div>
        Add books:
        <router-link :to="'books/create'">Add</router-link>
      </div>
      <div>

      </div>
      <table id="booksTable" class="table">
        <thead>
          <tr>
            <th v-for="(value, key) in content[0]" :key="key">
              {{ key }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in content" :key="book">
            <td v-for="field in book" :key="field">
              {{ field }}
            </td>
            <td>
              <router-link :to="'books/edit/' + book.id"> Edit </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BookService from "@/services/BookService";

@Component
export default class Home extends Vue {
  private content = "";
  private searchKey = "";

  mounted() {
    this.loadBooks();
  }
  loadBooks() {
    BookService.searchBooks(this.searchKey, 20, 0).then(
      (response) => {
        this.content = response.data.content;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
}
</script>
