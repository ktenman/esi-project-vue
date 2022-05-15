<template>
  <div class="container">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const Auth = namespace("Auth");

@Component
export default class Profile extends Vue {
  @Auth.State("user")
  private currentUser!: any;

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  }
}
</script>
