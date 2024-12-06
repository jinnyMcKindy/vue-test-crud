<template>
  <div class="flex w-full">
    <SideMenu />
    <div class="flex-1 p-4 mt-20 flex justify-center items-center w-full">
      <ClientDetails v-if="store.selectedClient" />
      <div v-else>No clients selected</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClientStore } from './store';
import SideMenu from './components/SideMenu.vue';
import ClientDetails from './components/ClientDetails.vue';
import './assets/index.css'

const store = useClientStore();
store.loadFromLocalStorage();
</script>
