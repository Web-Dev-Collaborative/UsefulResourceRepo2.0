<template>
  <nav class="navbar is-active" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" to="/">
        <h1 class="brand-title">Promo-Yourself</h1>
      </nuxt-link>
      <!-- Adds click to open -->
      <!-- Adds active class -->
      <a
        @click="isActive = !isActive"
        :class="{ 'is-active': isActive }"
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <!-- Adds active class -->
    <div
      :class="{ 'is-active': isActive }"
      id="navbarBasicExample"
      class="navbar-menu"
    >
      <div class="navbar-start">
        <nav-link to="/" class="navbar-item"> Home </nav-link>
        <nav-link to="/courses" class="navbar-item"> Courses </nav-link>
        <nav-link to="/blogs" class="navbar-item"> Blogs </nav-link>
        <nav-link to="/about" class="navbar-item"> About </nav-link>
        <nav-link to="/cv" class="navbar-item"> Cv </nav-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <!-- If Authenticated -->
            <template v-if="isAuth">
              <figure class="image avatar is-48x48 m-r-sm">
                <img class="is-rounded" :src="user.avatar" />
              </figure>
              <div class="m-r-sm m-b-sm">Welcome {{ user.username }}!</div>
              <!-- If Admin -->
              <button
                v-if="isAdmin"
                class="button is-link is-outlined"
                @click="() => $router.push('/instructor')"
              >
                Instructor
              </button>
              <a class="button is-primary" @click="logout"> Logout </a>
            </template>
            <template v-else>
              <nuxt-link to="/register" class="button is-primary">
                Sign up
              </nuxt-link>
              <nuxt-link to="/login" class="button is-light">
                Log in
              </nuxt-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/authUser",
      isAuth: "auth/isAuthenticated",
      isAdmin: "auth/isAdmin",
    }),
  },
  methods: {
    logout() {
      this.$store
        .dispatch("auth/logout")
        .then(() => this.$router.push("/login"));
    },
  },
};
</script>

<style lang="scss" scoped>
.brand-title {
  font-size: 35px;
  font-weight: bold;
}
.navbar-brand {
  padding-right: 30px;

  @media screen and (max-width: 1023px) {
    padding-right: 0px;
  }
}
.avatar {
  margin-right: 5px;
}
</style>
