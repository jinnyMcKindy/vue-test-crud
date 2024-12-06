<template>
  <div v-if="client" class="p-4 bg-white rounded shadow-md">
    <img :src="client.avatar" alt="Avatar" class="w-24 h-24 rounded-full mx-auto" />
    <p class="text-center text-xl font-semibold mt-4">{{ client.first_name }} {{ client.last_name }}</p>
    <p class="text-center text-gray-600">{{ client.email }}</p>
    <textarea 
      v-model="comment" 
      placeholder="Leave a comment..." 
      class="w-full mt-4 p-2 border rounded"
    ></textarea>
    <input 
      type="number" 
      v-model.number="rating" 
      min="0" 
      class="w-full mt-2 p-2 border rounded"
    />
    <button 
      @click="saveData" 
      class="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Save
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useClientStore, Client } from '../store';

const store = useClientStore();
const comment = ref(store.selectedClient?.comment || '');
const rating = ref(store.selectedClient?.rating || 0);

// Watch for changes in selectedClient and update comment and rating accordingly
watch(() => store.selectedClient, (newClient: Client | null) => {
  if (newClient) {
    comment.value = newClient.comment;
    rating.value = newClient.rating;
  }
});

const client = computed(() => store.selectedClient);

const saveData = () => {
  if (client.value) {
    store.updateClientData(client.value.id, comment.value, rating.value);
  }
};
</script>