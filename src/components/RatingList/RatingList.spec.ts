import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import ClientList from '@/components/ClientList/ClientList.vue';
import { useClientStore } from '@/store';
import { describe, beforeEach, it, expect, vi } from 'vitest';

const mockClients = [
  { id: 1, avatar: 'avatar1.jpg', first_name: 'Alex', last_name: 'Smith', email: 'alice@example.com' },
  { id: 2, avatar: 'avatar2.jpg', first_name: 'Jane', last_name: 'Brown', email: 'bob@example.com' },
  { id: 3, avatar: 'avatar3.jpg', first_name: 'John', last_name: 'Adams', email: 'charlie@example.com' },
];

const mockRatings = { 
  1: { comment: '', rating: 5 } ,
  2: { comment: '', rating: 3 } ,
  3: { comment: '', rating: 4 },
};

describe('ClientList.vue', () => {
  
  beforeEach(() => {
    setActivePinia(createPinia()); // Initialize Pinia store before each test
  });

  it('sorts clients by rating', async () => {

    const store = useClientStore();
    store.setClients(mockClients); 
    store.setRatings(mockRatings);
    const sortedClients = store.sortedByRating;

    //Assert that clients are sorted by rating
    expect(sortedClients[0].first_name).toBe('Alex'); 
    expect(sortedClients[1].first_name).toBe('John'); 
    expect(sortedClients[2].first_name).toBe('Jane'); 
  });

  it('calls selectClient when a client is clicked', async () => {

    const store = useClientStore();
    store.setClients(mockClients);

    const wrapper = mount(ClientList);

    const selectClientSpy = vi.fn();
    store.selectClient = selectClientSpy;

    await wrapper.findAll('li')[1].trigger('click');

    //Assert that selectClient was called with the correct client id
    expect(selectClientSpy).toHaveBeenCalledWith(2);
  });
});

