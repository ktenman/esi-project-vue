<template>
  <div class="container">
    <div v-if="currentUser">
      <header class="jumbotron">
        <h3>
          <strong>{{ currentUser.username }}'s</strong> profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong>
        {{ currentUser.id }}
      </p>
      <p>
        <strong>Username:</strong>
        {{ currentUser.username }}
      </p>
      <p>
        <strong>First name:</strong>
        {{ currentUser.firstName }}
      </p>
      <p>
        <strong>Last name:</strong>
        {{ currentUser.lastName }}
      </p>
      <p>
        <strong>Email:</strong>
        {{ currentUser.email }}
      </p>
      <p>
        <strong>Phone number:</strong>
        {{ currentUser.phoneNumber }}
      </p>
      <strong>Authorities:</strong>
      <ul>
        <li v-for="role in currentUser.authorities" :key="role">
          {{ role }}
        </li>
      </ul>
      <table id="booksTable" class="table">
        <thead v-if="borrowings">
        <tr>
          <th v-for="(value, key) in borrowings[0]" :key="key">
            {{ key }}
          </th>
        </tr>
        </thead>
        <p v-else>{{ error }}</p>
        <tbody>
        <tr v-for="book in borrowings" :key="book.id">
          <td v-for="field in book" :key="field">
            {{ field }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <p v-else>{{ error }}</p>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";
import BorrowingService from "@/services/BorrowingService";

const Auth = namespace("Auth");

@Component
export default class Profile extends Vue {
  @Auth.State("user")
  private currentUser!: any;
  private borrowings: any = [];
  private error = null;

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    } else {
      BorrowingService.getAllBookRentingRequests().then(
          (response) => {
            this.borrowings = response.data;
          },
          (error) => {
            this.error =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
          }
      );
    }

  }
}
</script>
