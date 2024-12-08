import { mount } from '@vue/test-utils';
import SideMenu from './SideMenu.vue';
import ClientList from '../ClientList/ClientList.vue';
import RatingList from '../RatingList//RatingList.vue';
import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

describe('SideMenu.vue', () => {

  // Set up Pinia before each test
  beforeEach(() => {
      setActivePinia(createPinia());
  });

  it('renders with initial state', () => {
    const wrapper = mount(SideMenu);

    // Check initial width classes
    expect(wrapper.classes()).toContain('w-72');
    expect(wrapper.classes()).not.toContain('w-10');

    // Check initial tab states
    const tabs = wrapper.findAll('button');
    expect(tabs[0].classes()).toContain('font-bold');
    expect(tabs[1].classes()).not.toContain('font-bold');

    // Check initial component rendering
    expect(wrapper.findComponent(ClientList).exists()).toBe(true);
    expect(wrapper.findComponent(RatingList).exists()).toBe(false);
  });
  
  it('switches tabs and renders correct content', async () => {
    const wrapper = mount(SideMenu);

    const tabs = wrapper.findAll('button');

    // Check initial component rendering
    expect(wrapper.findComponent(ClientList).exists()).toBe(true);
    expect(wrapper.findComponent(RatingList).exists()).toBe(false);

    // Switch to the second tab
    await tabs[1].trigger('click');

    // Check tab states after switching
    expect(tabs[1].classes()).toContain('font-bold');
    expect(tabs[0].classes()).not.toContain('font-bold');

    // Check component rendering after switching
    expect(wrapper.findComponent(RatingList).exists()).toBe(true);
    expect(wrapper.findComponent(ClientList).exists()).toBe(false);

    // Switch back to the first tab
    await tabs[0].trigger('click');

    // Check tab states after switching back
    expect(tabs[0].classes()).toContain('font-bold');
    expect(tabs[1].classes()).not.toContain('font-bold');
    
    // Check component rendering after switching back
    expect(wrapper.findComponent(ClientList).exists()).toBe(true);
    expect(wrapper.findComponent(RatingList).exists()).toBe(false);
  });
});
