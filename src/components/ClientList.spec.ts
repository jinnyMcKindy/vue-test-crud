import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import ClientList from './ClientList.vue'; // Adjust path to your component
import { useClientStore } from '../store'; // Adjust to your store path
import { describe, beforeEach, it, expect, vi } from 'vitest';


describe(ClientList, () => {

  beforeEach(() => {
    setActivePinia(createPinia()); // Initialize Pinia store before each test
  });

  it('renders the component', async () => {
    const wrapper = mount(ClientList);
    expect(wrapper.exists()).toBe(true);
  });

  it('displays clients correctly', async () => {
    
    const store = useClientStore();
    store.setClients([
      { id: 1, avatar: 'avatar1.jpg', first_name: 'John', last_name: 'Doe', email: 'john@example.com', rating: 5 },
      { id: 2, avatar: 'avatar2.jpg', first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', rating: 4 },
    ]);

    const wrapper = mount(ClientList);

    // Check if the clients are rendered
    expect(wrapper.findAll('li')).toHaveLength(2);
    expect(wrapper.text()).toContain('John Doe');
    expect(wrapper.text()).toContain('Jane Doe');
  });

  it('filters clients based on the search query', async () => {
    // Arrange: Set up the store with some clients
    const store = useClientStore();
    store.setClients([
      { id: 1, avatar: 'avatar1.jpg', first_name: 'John', last_name: 'Doe', email: 'john@example.com', rating: 5 },
      { id: 2, avatar: 'avatar2.jpg', first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', rating: 4 },
    ]);

    const wrapper = mount(ClientList);

    // Act: Simulate entering a search query
    await wrapper.find('input').setValue('Jane');

    // Assert: Check if only Jane is displayed
    expect(wrapper.text()).toContain('Jane Doe');
    expect(wrapper.text()).not.toContain('John Doe');
  });

  it('calls selectClient when a client is clicked', async () => {
    // Arrange: Set up the store with some clients
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
