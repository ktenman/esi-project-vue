<template>
  <div class="container">
    <header class="jumbotron">
      <h3>List of all customers</h3>
      <div class="input-group">
          <input @keyup.enter="loadBooks()" type="text" class="form-control" placeholder="Search" v-model="searchKey">
          <button @click="loadBooks()" class="input-group-text" >&#x1F50E</button>
      </div>
    </header>
    <div id="customers">
      <div>
        <router-link :to="'customers/create'">
          <button class="btn btn-primary btn-block mb-3">
          ADD NEW CUSTOMER
          </button>
        </router-link>
      </div>
      <div>

      </div>
      <table id="customersTable" class="table">
        <thead v-if="content">
          <tr>
            <th v-for="(value, key) in content[0]" :key="key">
              {{ key }}
            </th>
          </tr>
        </thead>
        <p v-else>{{error}}</p>
        <tbody>
          <tr v-for="book in content" :key="book.id">
            <td v-for="field in book" :key="field">
              {{ field }}
            </td>
            <td>
              <router-link :to="'customers/' + book.id"> Edit </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CustomerService from "@/services/CustomerService";
import { namespace } from "vuex-class";

const Auth = namespace("Auth");

@Component
export default class CustomerList extends Vue {
  @Auth.State("user")
  private currentUser!: any;
  private content = null;
  private error = null;
  private searchKey = "";

  mounted() {
     if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.loadBooks();
  }
  loadBooks() {
    CustomerService.searchCustomers(this.searchKey, 20, 0).then(
      (response) => {
        this.content = response.data.content;
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
</script>
