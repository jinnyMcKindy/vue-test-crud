import { setActivePinia, createPinia } from 'pinia';
import { useClientStore } from './';
import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockClients = [
  { id: 1, avatar: 'avatar1.jpg', first_name: 'Alice', last_name: 'Smith', email: 'alice@example.com', comment: '', rating: 5 },
  { id: 2, avatar: 'avatar2.jpg', first_name: 'Bob', last_name: 'Brown', email: 'bob@example.com', comment: '', rating: 3 },
  { id: 3, avatar: 'avatar3.jpg', first_name: 'Charlie', last_name: 'Adams', email: 'charlie@example.com', comment: '', rating: 4 },
];

const mockLocalStorage: Record<string, string> = {};

global.localStorage = {
    getItem: vi.fn((key) => mockLocalStorage[key] || null),
    setItem: vi.fn((key, value) => {
      mockLocalStorage[key] = value;
    }),
    removeItem: vi.fn((key) => {
      delete mockLocalStorage[key];
    }),
    clear: vi.fn(() => {
      Object.keys(mockLocalStorage).forEach((key) => delete mockLocalStorage[key]);
    }),
  };

describe('Client Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with an empty client list and no selected client', () => {
    const store = useClientStore();
    expect(store.clients).toEqual([]);
    expect(store.selectedClient).toBeNull();
  });

  it('should set clients correctly', () => {
    const store = useClientStore();
    store.setClients(mockClients);
    expect(store.clients).toEqual(mockClients);
  });

  it('should sort clients by last name', () => {
    const store = useClientStore();
    store.setClients(mockClients);
    const sorted = store.sortedClients;
    expect(sorted[0].last_name).toBe('Adams');
    expect(sorted[1].last_name).toBe('Brown');
    expect(sorted[2].last_name).toBe('Smith');
  });

  it('should sort clients by rating in descending order', () => {
    const store = useClientStore();
    store.setClients(mockClients);
    const sortedByRating = store.sortedByRating;
    expect(sortedByRating[0].rating).toBe(5);
    expect(sortedByRating[1].rating).toBe(4);
    expect(sortedByRating[2].rating).toBe(3);
  });

  it('should select a client by ID', () => {
    const store = useClientStore();
    store.setClients(mockClients);
    store.selectClient(2);
    expect(store.selectedClient).toEqual(mockClients[1]);
  });

  it('should update client data', () => {
    const store = useClientStore();
    store.setClients(mockClients);
    store.updateClientData(1, 'Great client!', 10);
    expect(store.clients[0].comment).toBe('Great client!');
    expect(store.clients[0].rating).toBe(10);
  });

  it('should save clients to localStorage', () => {
    const store = useClientStore();
    store.setClients(mockClients);
    store.saveToLocalStorage();
    const savedData = JSON.parse(localStorage.getItem('clients') || '[]');
    expect(savedData).toEqual(mockClients);
  });

  it('should load clients from localStorage', () => {
    localStorage.setItem('clients', JSON.stringify(mockClients));
    const store = useClientStore();
    store.loadFromLocalStorage();
    expect(store.clients).toEqual(mockClients);
  });

  it('should handle fetch error gracefully', async () => {
    const store = useClientStore();

    // Mock fetch error
    global.fetch = vi.fn(() => Promise.reject('API Error')) as unknown as typeof fetch;

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    await store.fetchClients();

    expect(store.clients).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch clients:', 'API Error');

    consoleSpy.mockRestore();
  });
});
