import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useClientStore } from '../../store';
import ClientDetails from './ClientDetails.vue';
import { describe, beforeEach, it, expect, vi } from 'vitest';

describe('ClientDetails.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia()); // Initialize Pinia store before each test
  });
  const client = { id: 1, avatar: 'avatar1.jpg', first_name: 'John', last_name: 'Doe', email: 'john@example.com', rating: 4, comment: 'Test comment' };
  it('renders client details correctly', async () => {
    // Arrange: Set client data in the store
    const store = useClientStore();
    store.setClients([client]);
    store.selectedClient = store.clients[0];

    // Mount the component
    const wrapper = mount(ClientDetails);

    // Assert: Check that components render with correct data
    expect(wrapper.find('img').attributes('src')).toBe('avatar1.jpg');
    expect(wrapper.find('p.fullname').text()).toBe('John Doe');
    expect(wrapper.find('p.email').text()).toBe('john@example.com');
    expect(wrapper.find('textarea').element.value).toBe('Test comment');
    expect((wrapper.find('input[type="number"]').element as HTMLInputElement).value).toBe('4');
  });

  it('updates comment and rating when client is selected', async () => {
    // Arrange: Set client data in the store
    const store = useClientStore();
    store.setClients([client]);
    store.selectedClient = store.clients[0];

    const wrapper = mount(ClientDetails);

    // Act: Change data in the textarea and rating input
    await wrapper.find('textarea').setValue('Updated comment');
    await wrapper.find('input[type="number"]').setValue(5);

    // Assert: Check that changes were correctly applied
    expect(wrapper.find('textarea').element.value).toBe('Updated comment');
    expect((wrapper.find('input[type="number"]').element as HTMLInputElement).value).toBe('5');
  });

  it('updates client data correctly when saveData is called', async () => {
    // Arrange: Set client data in the store
    const store = useClientStore();
    const initialClient = client;
    store.setClients([initialClient]);
    store.selectedClient = initialClient;

    const wrapper = mount(ClientDetails);

    // Act: Change data in the form and save it
    await wrapper.find('textarea').setValue('Updated comment');
    await wrapper.find('input[type="number"]').setValue(5);
    await wrapper.find('button').trigger('click');

    // Assert: Check that client data in the store was updated
    expect(store.selectedClient?.comment).toBe('Updated comment');
    expect(store.selectedClient?.rating).toBe(5);
  });
});
