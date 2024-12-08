<template>
  <div class="flex flex-col md:flex-row w-full">
    <SideMenu class="w-full md:w-auto" />
    <div
      class="flex-1 p-4 mt-16 md:mt-20 flex justify-center items-center w-full"
    >
      <ClientDetails v-if="store.selectedClient" />
      <div v-else class="text-center text-gray-500">
        No clients selected
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import './assets/index.css'
import { useClientStore } from './store';
import SideMenu from './components/SideMenu/SideMenu.vue';
import ClientDetails from './components/ClientDetails/ClientDetails.vue';

const store = useClientStore();
store.loadFromLocalStorage();
</script>
