<template>
    <Suspense>
      <template #default>
        <component :is="selectedComponent" />
      </template>
      <template #fallback>
        <div>Загрузка...</div>
      </template>
    </Suspense>
  </template>
  
  <script setup lang="ts">
  import { defineAsyncComponent, computed } from "vue";
  import type { Tab } from './types';

  const props = defineProps<{ selectedTab: Tab }>();

  const selectedComponent = computed(() => {
    if (props.selectedTab === "Clients") {
      return defineAsyncComponent(() =>
        import("@/components/ClientList/ClientList.vue")
      );
    } else if (props.selectedTab === "Rating") {
      return defineAsyncComponent(() =>
        import("@/components/RatingList/RatingList.vue")
      );
    }
    return null;
  });
  </script>
  