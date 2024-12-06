import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import ClientList from './ClientList.vue';
import { useClientStore } from '../store';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';

describe('ClientList.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia()); // Initialize Pinia store before each test
  });

  it('clients sorted by rating', async () => {
    // Arrange
    const store = useClientStore();
    store.setClients([
      { id: 1, avatar: 'avatar1.jpg', first_name: 'John', last_name: 'Doe', email: 'john@example.com', rating: 3 },
      { id: 2, avatar: 'avatar2.jpg', first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', rating: 5 },
      { id: 3, avatar: 'avatar3.jpg', first_name: 'Alex', last_name: 'Smith', email: 'alex@example.com', rating: 4 },
    ]); 

      const sortedClients = store.sortedByRating;

      // Assert: Ensure the clients are sorted by rating
      expect(sortedClients[0].first_name).toBe('Jane'); 
      expect(sortedClients[1].first_name).toBe('Alex'); 
      expect(sortedClients[2].first_name).toBe('John'); 
  });

  it('calls selectClient when a client is clicked', async () => {
    // Arrange
    const store = useClientStore();
    store.setClients([
      { id: 1, avatar: 'avatar1.jpg', first_name: 'John', last_name: 'Doe', email: 'john@example.com', rating: 5 },
      { id: 2, avatar: 'avatar2.jpg', first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', rating: 4 },
    ]);

    const wrapper = mount(ClientList);

    // Spy on the selectClient method
    const selectClientSpy = vi.fn();
    store.selectClient = selectClientSpy;

    // Act: Simulate clicking on the second client
    await wrapper.findAll('li')[1].trigger('click');

    // Assert: Check if selectClient was called with the correct client ID
    expect(selectClientSpy).toHaveBeenCalledWith(2);
  });
});

