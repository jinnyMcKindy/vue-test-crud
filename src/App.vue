<template>
  <div class="flex w-full">
    <SideMenu />
    <div class="flex-1 p-4 mt-20 flex justify-center items-center w-full">
      <ClientDetails v-if="store.selectedClient" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClientStore } from './store';
import SideMenu from './components/SideMenu.vue';
import ClientDetails from './components/ClientDetails.vue';
import './assets/index.css'

const store = useClientStore();
store.setClients([
  { id: 1, avatar: 'https://gravatar.com/avatar/f23bd37bf4077b88325f23a2810cae2e?s=400&d=robohash&r=x', first_name: 'John', last_name: 'Doe', email: 'john@example.com', rating: 5 },
  { id: 2, avatar: 'https://robohash.org/f23bd37bf4077b88325f23a2810cae2e?set=set4&bgset=&size=400x400', first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', rating: 3 },
]);

store.loadFromLocalStorage();
</script>
