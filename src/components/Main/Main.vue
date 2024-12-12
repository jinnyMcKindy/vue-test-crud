<template>
  <div :class="['side-menu', { 'sidemenu__hidden': isClosed }]">
    <div class="side-menu__header p-4 bg-gray-800 text-white flex justify-end cursor-pointer" :class="isClosedClass" @click="toggleMenu">
      <div v-if="isClosed">&#8594;</div>
      <div v-else>&#8592;</div>
    </div>
      <div :class="['wrapper m-auto sm:m-0', { 'wrapper__hidden': isClosed }]">
        <div class="tabs flex justify-between p-4">
          <ButtonTab 
            v-for="tab in tabs" 
            :key="tab" 
            :text="tab" 
            :selectedTab="selectedTab" 
            :tabName="tab" 
            @update:selectedTab="selectedTab = $event" />
        </div>
        <div class="content p-4">
          <LazyLoadTabs :selectedTab="selectedTab" />
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import LazyLoadTabs from './LazyLoadTabs.vue';
import ButtonTab from './ButtonTab.vue';
import type { Tab } from './types';

const isClosed = ref(false);
const selectedTab = ref<Tab>('Clients');
const tabs: Tab[] = ['Clients', 'Rating'];

const toggleMenu = () => (isClosed.value = !isClosed.value);
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
  