<template>
  <div class="container">
    <header>
      <h3>Edit customer</h3>
    </header>
    <div>
      <label>First name: </label>
      <input v-model="customer.firstName" class="form-control" />
    </div>
    <div>
      <button class="btn btn-primary btn-block mt-2" @click="saveCustomer()">
        Save
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CustomerService from "@/services/CustomerService";
import { namespace } from "vuex-class";

const Auth = namespace("Auth");

@Component
export default class Customer extends Vue {
  @Auth.State("user")
  private currentUser!: any;
  private customer = "";
  private id = "";

  mounted() {
    this.id = this.$route.params.id;
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    if (this.id) {
      this.getCustomer();
    }
  }
  getCustomer() {
    CustomerService.getCustomer(parseInt(this.id)).then(
      (response) => {
        this.customer = response.data;
      },
      (error) => {
        this.customer =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }

  saveCustomer() {
    console.log("save clicked");
  }
}
</script>
