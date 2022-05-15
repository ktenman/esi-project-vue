<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import CustomerService from "@/services/CustomerService";

@Component
export default class AdminBoard extends Vue {
  private content = "";

  mounted() {
    CustomerService.getAdminBoard().then(
        (response) => {
          this.content = response.data;
        },
        (error) => {
          this.content =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
  }
}
</script>
