<template>
  <div class="container">
    <header class="jumbotron">
      <h3>List of all books</h3>
      <div class="input-group">
        <input @keyup.enter="loadBooks()" type="text" class="form-control" placeholder="Search" v-model="searchKey">
        <button @click="loadBooks()" class="input-group-text">&#x1F50E</button>
      </div>
    </header>
    <div id="books">
      <div>
        <router-link :to="'books/create'" v-if="isLibrarian()">
          <button class="btn btn-primary btn-block mb-3">
            ADD NEW BOOK
          </button>
        </router-link>
      </div>
      <div>

      </div>
      <table id="booksTable" class="table">
        <thead v-if="content">
        <tr>
          <th v-for="(value, key) in content[0]" :key="key">
            {{ key }}
          </th>
        </tr>
        </thead>
        <p v-else>{{ error }}</p>
        <tbody>
        <tr v-for="book in content" :key="book.id">
          <td v-for="field in book" :key="field">
            {{ field }}
          </td>
          <td v-if="isLibrarian()">
            <router-link :to="'books/edit/' + book.id"> Edit</router-link>
          </td>
          <td v-if="book.status !== 'RENTED'">
            <button @click="borrow(book.id)" class="input-group-text">Borrow</button>
          </td>
          <td v-if="book.status === 'RENTED' && isLibrarian()">
            <button @click="release(book.id)" class="input-group-text">Release</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import BookService from "@/services/BookService";
import {namespace} from "vuex-class";
import BorrowingService from "@/services/BorrowingService";

const Auth = namespace("Auth");

class BookDto {

  id: number;
  author: string;
  title: string;
  year: string;
  status: string;
  selectedStatus: string;
  language: string;
  categories: string;

  constructor(
      id: number,
      author: string,
      title: string,
      year: string,
      status: string,
      selectedStatus: string,
      language: string,
      categories: string
  ) {
    this.id = id
    this.author = author
    this.title = title
    this.year = year
    this.status = status
    this.selectedStatus = selectedStatus
    this.language = language
    this.categories = categories
  }
}

@Component
export default class Home extends Vue {
  @Auth.State("user")
  private currentUser!: any;
  private content: BookDto[] = [];
  private error = null;
  private searchKey = "";

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.loadBooks();
  }

  loadBooks() {
    BookService.searchBooks(this.searchKey, 20, 0).then(
        (response) => {
          this.content = response.data.content;
        },
        (error) => this.extractErrorMessage(error)
    );
  }

  isLibrarian(): boolean {
    if (this.currentUser && this.currentUser.authorities) {
      return this.currentUser.authorities.includes("LIBRARIAN");
    }
    return false;
  }

  borrow(bookId: number) {
    BorrowingService.borrow({
      bookId: bookId
    }).then(
        (response) => {
          this.loadBooks();
        },
        (error) => this.extractErrorMessage(error)
    );
  }

  release(bookId: number) {
    BorrowingService.release({
      bookId: bookId
    }).then(
        (response) => {
          this.loadBooks();
        },
        (error) => this.extractErrorMessage(error)
    );
  }

  private extractErrorMessage(error: any) {
    this.error =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
  }
}
</script>
