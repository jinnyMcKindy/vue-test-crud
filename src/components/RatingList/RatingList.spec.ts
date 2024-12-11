import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import ClientList from '@/components/ClientList/ClientList.vue';
import { useClientStore } from '@/store';
import { describe, beforeEach, it, expect, vi } from 'vitest';

describe('ClientList.vue', () => {
  
  beforeEach(() => {
    setActivePinia(createPinia()); // Initialize Pinia store before each test
  });

  it('sorts clients by rating', async () => {

    const store = useClientStore();

    store.setClients([
      { id: 1, avatar: 'avatar1.jpg', first_name: 'John', last_name: 'Doe', email: 'john@example.com', rating: 3 },
      { id: 2, avatar: 'avatar2.jpg', first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', rating: 5 },
      { id: 3, avatar: 'avatar3.jpg', first_name: 'Alex', last_name: 'Smith', email: 'alex@example.com', rating: 4 },
    ]); 

      const sortedClients = store.sortedByRating;

      //Assert that clients are sorted by rating
      expect(sortedClients[0].first_name).toBe('Jane'); 
      expect(sortedClients[1].first_name).toBe('Alex'); 
      expect(sortedClients[2].first_name).toBe('John'); 
  });

  it('calls selectClient when a client is clicked', async () => {

    const store = useClientStore();
    store.setClients([
      { id: 1, avatar: 'avatar1.jpg', first_name: 'John', last_name: 'Doe', email: 'john@example.com', rating: 5 },
      { id: 2, avatar: 'avatar2.jpg', first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', rating: 4 },
    ]);

    const wrapper = mount(ClientList);

    const selectClientSpy = vi.fn();
    store.selectClient = selectClientSpy;

    await wrapper.findAll('li')[1].trigger('click');

    //Assert that selectClient was called with the correct client id
    expect(selectClientSpy).toHaveBeenCalledWith(2);
  });
});

