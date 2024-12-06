<template>
  <div class="flex w-full">
    <SideMenu />
    <div class="flex-1 p-4 mt-20 flex justify-center items-center w-full">
      <ClientDetails />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideMenu from './components/SideMenu.vue';
import ClientDetails from './components/ClientDetails.vue';
import './assets/index.css'
</script>
