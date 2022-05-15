<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a class="navbar-brand" href @click.prevent>Library</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/home">
            <font-awesome-icon icon="home"/>
            Home
          </router-link>
        </li>
        <li v-if="showCustomerList" class="nav-item">
          <router-link class="nav-link" to="/customers">Customer list</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" class="nav-link" to="/user"
          >User
          </router-link
          >
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/register">
            <font-awesome-icon icon="user-plus"/>
            Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">
            <font-awesome-icon icon="sign-in-alt"/>
            Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/profile">
            <font-awesome-icon icon="user"/>
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt"/>
            LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";

const Auth = namespace("Auth");

@Component
export default class App extends Vue {
  @Auth.State("user")
  private currentUser!: any;

  @Auth.Action
  private signOut!: () => void;

  get showCustomerList(): boolean {
    if (this.currentUser && this.currentUser.roles) {
      return this.currentUser.roles.includes("CUSTOMER");
    }
    return false;
  }

  logOut() {
    this.signOut();
    this.$router.push("/login");
  }
}
</script>
