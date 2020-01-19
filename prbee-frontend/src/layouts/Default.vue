<template>
  <div class="app-content">
    <b-container>
      <router-view></router-view>
    </b-container>

    <app-footer></app-footer>
  </div>
</template>

<script>
import AppFooter from "@/components/AppFooter";

export default {
  components: {
    AppFooter
  }
};
</script>
