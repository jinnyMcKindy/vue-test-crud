import { mount } from '@vue/test-utils';
import SideMenu from './SideMenu.vue';
import ClientList from './ClientList.vue';
import RatingList from './RatingList.vue';
import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

describe('SideMenu.vue', () => {
    beforeEach(() => {
        setActivePinia(createPinia()); // Initialize Pinia store before each test
      });
  it('renders with initial state', () => {
    const wrapper = mount(SideMenu);

    // Check if the menu is open by default
    expect(wrapper.classes()).toContain('w-72');
    expect(wrapper.classes()).not.toContain('w-10');

    // Verify that "Clients" tab is selected by default
    const tabs = wrapper.findAll('button');
    expect(tabs[0].classes()).toContain('font-bold');
    expect(tabs[1].classes()).not.toContain('font-bold');

    // Verify that ClientList is rendered
    expect(wrapper.findComponent(ClientList).exists()).toBe(true);
    expect(wrapper.findComponent(RatingList).exists()).toBe(false);
  });

  it('switches tabs and renders correct content', async () => {
    const wrapper = mount(SideMenu);

    const tabs = wrapper.findAll('button');

    // Initial state: "Clients" tab is selected
    expect(wrapper.findComponent(ClientList).exists()).toBe(true);
    expect(wrapper.findComponent(RatingList).exists()).toBe(false);

    // Click "Rating" tab
    await tabs[1].trigger('click');

    // Verify "Rating" tab is selected
    expect(tabs[1].classes()).toContain('font-bold');
    expect(tabs[0].classes()).not.toContain('font-bold');

    // Verify that RatingList is rendered
    expect(wrapper.findComponent(RatingList).exists()).toBe(true);
    expect(wrapper.findComponent(ClientList).exists()).toBe(false);

    // Click "Clients" tab again
    await tabs[0].trigger('click');

    // Verify "Clients" tab is selected again
    expect(tabs[0].classes()).toContain('font-bold');
    expect(tabs[1].classes()).not.toContain('font-bold');

    // Verify that ClientList is rendered again
    expect(wrapper.findComponent(ClientList).exists()).toBe(true);
    expect(wrapper.findComponent(RatingList).exists()).toBe(false);
  });
});
