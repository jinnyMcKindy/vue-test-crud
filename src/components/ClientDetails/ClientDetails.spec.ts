import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useClientStore } from '../../store';
import ClientDetails from './ClientDetails.vue';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';

describe('ClientDetails.vue', () => {
  let pinia;
  let clientStore;

  beforeEach(() => {
    pinia = createTestingPinia({
      stubActions: false, // Ensure actions like updateClientData are tested
    });
    clientStore = useClientStore();
    clientStore.clients = [
      {
        id: 1,
        avatar: '/avatar.jpg',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        comment: '',
        rating: 0,
      },
    ];
    clientStore.selectClient(1);
  });

  it('renders client details if a client is selected', () => {
    const wrapper = mount(ClientDetails, {
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.find('.fullname').text()).toBe('John Doe');
    expect(wrapper.find('.email').text()).toBe('john.doe@example.com');
    expect(wrapper.find('img').attributes('src')).toBe('/avatar.jpg');
  });

  it('shows a "No client selected" message when no client is selected', () => {
    clientStore.selectClient(null);
    const wrapper = mount(ClientDetails, {
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.text()).toContain('No client selected');
  });

  it('displays error if rating is invalid', async () => {
    const wrapper = mount(ClientDetails, {
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.find('input[type="number"]').setValue(11);
    await wrapper.find('textarea').setValue('Great job!');
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.text()).toContain('Rating must be Number between 0 and 10');
  });

  it('displays error if comment is empty', async () => {
    const wrapper = mount(ClientDetails, {
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.find('input[type="number"]').setValue(5);
    await wrapper.find('textarea').setValue(' ');
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.text()).toContain('Comment cannot be empty');
  });

  it('updates client data with valid inputs', async () => {
    const wrapper = mount(ClientDetails, {
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.find('input[type="number"]').setValue(8);
    await wrapper.find('textarea').setValue('Great job!');
    await wrapper.find('form').trigger('submit.prevent');

    const updatedClient = clientStore.clients.find((client) => client.id === 1);
    expect(updatedClient?.comment).toBe('Great job!');
    expect(updatedClient?.rating).toBe(8);
  });
});