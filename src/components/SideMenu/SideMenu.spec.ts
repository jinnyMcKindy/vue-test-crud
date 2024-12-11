import { mount } from '@vue/test-utils';
import SideMenu from './SideMenu.vue';
import ClientList from '@/components/ClientList/ClientList.vue';
import RatingList from '@/components/RatingList//RatingList.vue';
import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

describe('SideMenu.vue', () => {

  // Set up Pinia before each test
  beforeEach(() => {
      setActivePinia(createPinia());
  });

  it('renders with initial state', async () => {
    const wrapper = mount(SideMenu);

    // Check initial tab states
    const tabs = wrapper.findAll('button');
    expect(tabs[0].classes()).toContain('font-bold');
    expect(tabs[1].classes()).not.toContain('font-bold');

    // Check initial component rendering
    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for the next tick to test lazy loaded components
    expect(wrapper.findComponent(ClientList).exists()).toBe(true);
    expect(wrapper.findComponent(RatingList).exists()).toBe(false);
  });
  
  it('switches tabs and renders correct content', async () => {
    const wrapper = mount(SideMenu);

    const tabs = wrapper.findAll('button');

    // Check initial component rendering
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(wrapper.findComponent(ClientList).exists()).toBe(true);
    expect(wrapper.findComponent(RatingList).exists()).toBe(false);

    // Switch to the second tab
    await tabs[1].trigger('click');

    // Check tab states after switching
    expect(tabs[1].classes()).toContain('font-bold');
    expect(tabs[0].classes()).not.toContain('font-bold');

    // Check component rendering after switching
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(wrapper.findComponent(RatingList).exists()).toBe(true);
    expect(wrapper.findComponent(ClientList).exists()).toBe(false);

    // Switch back to the first tab
    await tabs[0].trigger('click');

    // Check tab states after switching back
    expect(tabs[0].classes()).toContain('font-bold');
    expect(tabs[1].classes()).not.toContain('font-bold');
    
    // Check component rendering after switching back
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(wrapper.findComponent(ClientList).exists()).toBe(true);
    expect(wrapper.findComponent(RatingList).exists()).toBe(false);
  });
});
