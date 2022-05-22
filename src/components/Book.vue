<template>
  <div class="container">
    <header>
      <h3>{{ id ? "Edit book" : "Create book" }}</h3>
    </header>
    <div>
      <label>Author: </label>
      <input v-model="book.author" class="form-control" placeholder="Author"/>
    </div>
    <div>
      <label>Title: </label>
      <input v-model="book.title" class="form-control" placeholder="Title"/>
    </div>
    <div>
      <label>Year: </label>
      <input
        v-model="book.year"
        class="form-control"
        placeholder="Year"
      />
    </div>
    <div>
      <br>
      <form>
        <label>Current status: {{this.book.status}}</label><br>
        <label for="statusList">Choose another status:</label>
        <select v-model="book.selectedStatus" name="statusList" id="statusList">
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="BOOKED">BOOKED</option>
          <option value="DELETED">DELETED</option>
          <option value="RENTED">RENTED</option>
          <option value="UNAVAILABLE">UNAVAILABLE</option>
        </select>
      </form>
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
      <br>
      <form>
        <label>Current category: {{this.book.categories[0]}}</label><br>
        <label for="categoriesList">Choose another category:</label>
        <select v-model="book.selectedCategory" name="categoriesList" id="categoriesList">
          <option v-for="category in allCategories">{{category.value}}</option>
        </select>
      </form>
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
  private id = "";
  private allCategories: any;
  private bookCategory: any;
  private book = {
    author: "",
    title: "",
    year: "",
    status: "",
    selectedStatus: "",
    language: "",
    categories: [],
    selectedCategory: this.bookCategory
  };
  private error = null;

  mounted() {
    this.id = this.$route.params.id;
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    if (!this.isLibrarian()) {
      this.$router.push("/books");
    }
    this.getCategories();
    if (this.id) {
      this.getBook();
    }
  }

  getCategories() {
    BookService.getBookCategories().then(
      (response) => {
        this.allCategories = response.data.categories;
        },
        (error) => {
          this.error =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        }
    );
  }

  getBook() {
    BookService.getBook(parseInt(this.id)).then(
      (response) => {
        this.book.author = response.data.author;
        this.book.title = response.data.title;
        this.book.year = response.data.year;
        this.book.status = response.data.status;
        this.book.categories = response.data.categories;
        this.book.language = response.data.language;
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

    if (!this.book.selectedCategory) {
      this.book.selectedCategory = this.book.categories;
    }

    if (this.book.selectedStatus == "") {
      this.book.selectedStatus = this.book.status;
    }

    if (typeof this.book.selectedCategory === 'string') {
      this.book.selectedCategory = this.book.selectedCategory.split(",");
    }

    if (this.id) {
      BookService.editBook({
        id: this.id,
        author: this.book.author,
        title: this.book.title,
        year: this.book.year,
        status: this.book.selectedStatus,
        language: this.book.language,
        categories: this.book.selectedCategory
      });
    }
    else {
      BookService.createBook({
        author: this.book.author,
        title: this.book.title,
        year: this.book.year,
        status: this.book.selectedStatus,
        language: this.book.language,
        categories: this.book.selectedCategory
      });
    }
    this.$router.push("/books");
    this.$router.go(0);
  }

  isLibrarian(): boolean {
    if (this.currentUser && this.currentUser.authorities) {
      return this.currentUser.authorities.includes("LIBRARIAN");
    }
    return false;
  }
}
</script>
