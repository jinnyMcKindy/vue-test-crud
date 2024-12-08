<template>
  <div :class="['side-menu', { 'sidemenu__hidden': isClosed }]">
    <div class="side-menu__header p-4 bg-gray-800 text-white flex justify-end cursor-pointer" :class="isClosedClass" @click="toggleMenu">
      <div v-if="isClosed">&#8594;</div>
      <div v-else>&#8592;</div>
    </div>
      <div :class="['wrapper m-auto sm:m-0', { 'wrapper__hidden': isClosed }]">
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
import { ref, computed } from 'vue';
import ClientList from '../ClientList/ClientList.vue';
import RatingList from '../RatingList/RatingList.vue';

const isClosed = ref(false);
const selectedTab = ref('clients');

const toggleMenu = () => (isClosed.value = !isClosed.value);
const selectTab = (tab: string) => (selectedTab.value = tab);
const isClosedClass = computed(() => isClosed.value ? 'w-10' : 'sm:w-72 w-100');
</script>

<style scoped>
.side-menu, .side-menu__header {
  transition: width 0.3s;
}

.tabs {
  width: 288px;;
}
.tab {
  width: 50%;
  max-width: 144px;
}
.wrapper {
  overflow: hidden;
  transition: 0.3s;
}
.wrapper.wrapper__hidden {
  width: 0;
}

.wrapper:not(.wrapper__hidden) {
  width: 288px;
}
.content {
  width: 288px;
}
@media (max-width: 768px) {
  .sidemenu__hidden{
    height: 0;
  }
  .tabs, .wrapper:not(.wrapper__hidden), .content {
    width: 100%;;
  }
  .tab {
    width: 100%;
    max-width: initial;
  }
  .wrapper.wrapper__hidden {
    height: 0;
  }
  .wrapper, .side-menu, .side-menu__header {
    transition: width 0s;
  }

}
</style>
  