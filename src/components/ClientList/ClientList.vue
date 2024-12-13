<template>
  <div>
    <input 
      v-model="searchQuery" 
      placeholder="Search clients..." 
      class="w-full mb-4 border border-gray-300 rounded"
    />
    <ul>
      <li 
        v-for="client in filteredClients" 
        :key="client.id"
        @click="selectClient(client.id)"
        class="flex items-center p-2 mb-2 border-b cursor-pointer bg-white shadow rounded-lg hover:bg-gray-100"
      >
        <img 
          :src="client.avatar" 
          alt="Avatar" 
          class="w-10 h-10 mr-4 rounded-full"
        />
        <span>{{ client.first_name }} {{ client.last_name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useClientStore, Client } from '@/store';

const store = useClientStore();

const searchQuery = ref('');

const filteredClients = computed<Client[]>(() =>
  store.sortedClients.filter((client: Client) =>
    `${client.first_name} ${client.last_name}`.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const selectClient = (id: number): void => store.selectClient(id);
</script>
  