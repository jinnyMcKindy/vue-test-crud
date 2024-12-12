<template>
    <button 
      @click="selectTab(tabName)" 
      :class="[
        'py-2 px-4 rounded-t-lg tab', 
        { 
          'font-bold bg-gray-200': selectedTab === tabName, 
          'bg-gray-100': selectedTab !== tabName 
        }
      ]">
      {{ text }}
    </button>
  </template>
  
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Tab } from './types';

interface Props {
    text: Tab;
    selectedTab: Tab;
    tabName: Tab;
}
  
const props = defineProps<Props>();

const emit = defineEmits(['update:selectedTab']);

function selectTab(tab: Tab) {
    emit('update:selectedTab', tab);
}
  </script>
  
  <style scoped>
  .tab {
    cursor: pointer;
    transition: background-color 0.3s;
  }
  </style>
  