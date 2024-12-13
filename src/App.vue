<template>
  <div class="flex flex-col sm:flex-row w-full">
    <Main class="w-full sm:w-auto" />
    <div class="m-auto mt-[15%]">
      <ClientDetails v-if="store.selectedClient" />
      <div v-else class="text-center text-gray-500">
        No clients selected
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/assets/index.css'
import { useClientStore } from '@/store';
import Main from '@/components/Main/Main.vue';
import ClientDetails from '@/components/ClientDetails/ClientDetails.vue';

const store = useClientStore();
store.fetchClients();
store.loadFromLocalStorage();
</script>
