<template>
  <div class="container">
    <header class="jumbotron">
      <h3>List of all books</h3>
      <input
        type="text"
        placeholder="Search"
        v-model="searchKey"
        @keyup.enter="loadBooks()"
        class="form-control"
      />
    </header>
    <div id="books">
      <input type="text" v-model="input" placeholder="Search books..." />
      <div>
        Add books:
        <router-link :to="'books/add/new'">Add</router-link>
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
              <router-link :to="'books/' + book.id"> Edit </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserService from "@/services/UserService";

@Component
export default class Home extends Vue {
  private content = "";
  private searchKey = "";

  mounted() {
    this.loadBooks();
  }
  loadBooks() {
    UserService.searchPublicContent(this.searchKey, 20, 0).then(
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
