<template>
  <div v-if="client" class="p-4 bg-white rounded shadow-md">
    <img :src="client.avatar" alt="Avatar" class="w-24 h-24 rounded-full mx-auto" />
    <p class="text-center text-xl fullname font-semibold mt-4">{{ client.first_name }} {{ client.last_name }}</p>
    <p class="text-center email text-gray-600">{{ client.email }}</p>
    <div v-if="error" class="text-center text-red-500 mt-2">
      {{ error }}
    </div>
    <form @submit.prevent="saveData" class="w-full mt-4">
      <textarea 
      v-model="comment" 
      placeholder="Leave a comment..." 
      class="w-full p-2 border rounded"
      ></textarea>
      <input 
      type="number" 
      v-model.number="rating" 
      min="0" 
      class="w-full mt-2 p-2 border rounded"
      />
      <button 
      type="submit" 
      class="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
      Save
      </button>
    </form>
  </div>
  <div v-else class="p-4 bg-white rounded shadow-md">
    <p class="text-center text-xl text-gray-600">No client selected</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useClientStore, Rating } from '@/store';

const store = useClientStore();
const comment = ref(store.selectedRating.comment ?? '');
const rating = ref<number>(store.selectedRating.rating ?? 0);
const error = ref('');

// Watch for changes in selectedClient and update comment and rating accordingly
watch(() => store.selectedRating, (selectedRating: Rating[keyof Rating] | null) => {
  if (selectedRating) {
    comment.value = selectedRating.comment ?? '';
    rating.value = selectedRating.rating;
  }
});

const client = computed(() => store.selectedClient); 

const saveData = () => {
  if (client.value) {
    if (rating.value < 0 || rating.value > 10 || typeof rating.value  !== 'number') {
      error.value = 'Rating must be Number between 0 and 10';
      return;
    }
    if (!comment.value.trim()) {
      error.value = 'Comment cannot be empty';
      return;
    }
    error.value = '';
    store.updateClientData(client.value.id, comment.value, rating.value);
  }
};
</script>