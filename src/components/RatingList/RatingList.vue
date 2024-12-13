<template>
  <ul>
    <li 
        v-for="client in sortedByRating" 
        :key="client.id"
        @click="selectClient(client.id)"
        class="flex items-center p-2 mb-2 border-b cursor-pointer bg-white shadow rounded-lg hover:bg-gray-100">
      <p class="text-gray-600 mr-4 w-[17px]">{{ rating(client.id) }}</p>
      <img :src="client.avatar" alt="Avatar" class="w-10 h-10 rounded-full mr-4" />
      <p>{{ client.first_name }} {{ client.last_name }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useClientStore } from '@/store';

const store = useClientStore();
const sortedByRating = computed(() => store.sortedByRating);
const selectClient = (id: number): void => store.selectClient(id);
const rating = (id: number) => store.getRating(id).rating;

</script>
  