<template>
  <div :class="['side-menu cursor-pointer', { 'w-10': isClosed, 'w-72': !isClosed }]" style="transition: width 0.3s;">
    <div class="p-4 bg-gray-800 text-white flex justify-between" @click="toggleMenu">
      <div></div>
      <div>x</div>
    </div>
    <div v-show="!isClosed">
      <div class="tabs flex justify-between p-4">
        <button @click="selectTab('clients')" :class="['py-2 px-4 rounded-t-lg tab', { 'font-bold bg-gray-200': selectedTab === 'clients', 'bg-gray-100': selectedTab !== 'clients' }]">Clients</button>
        <button @click="selectTab('rating')" :class="['py-2 px-4 rounded-t-lg tab', { 'font-bold bg-gray-200': selectedTab === 'rating', 'bg-gray-100': selectedTab !== 'rating' }]">Rating</button>
      </div>
      <div class="content p-4">
      <ClientList v-if="selectedTab === 'clients'" />
      <RatingList v-if="selectedTab === 'rating'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ClientList from './ClientList.vue';
import RatingList from './RatingList.vue';

const isClosed = ref(false);
const selectedTab = ref('clients');

const toggleMenu = () => (isClosed.value = !isClosed.value);
const selectTab = (tab: string) => (selectedTab.value = tab);
</script>

<style scoped>
.side-menu {
  transition: width 0.3s;
}
.tab {
  width: 50%;
}
</style>
  