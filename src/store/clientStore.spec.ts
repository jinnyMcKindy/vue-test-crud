import { setActivePinia, createPinia } from 'pinia';
import { useClientStore } from './';
import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockClients = [
  { id: 1, avatar: 'avatar1.jpg', first_name: 'Alice', last_name: 'Smith', email: 'alice@example.com' },
  { id: 2, avatar: 'avatar2.jpg', first_name: 'Bob', last_name: 'Brown', email: 'bob@example.com' },
  { id: 3, avatar: 'avatar3.jpg', first_name: 'Charlie', last_name: 'Adams', email: 'charlie@example.com' },
];

const mockRatings = { 
  1: { comment: '', rating: 5 } ,
  2: { comment: '', rating: 3 } ,
  3: { comment: '', rating: 4 },
};

const mockLocalStorage: Record<string, string> = {};

global.localStorage = {
    length: 0,
    key: vi.fn((index) => Object.keys(mockLocalStorage)[index] || null),
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
  
  it('should select a client by ID', () => {
    const store = useClientStore();
    store.setClients(mockClients);
    store.selectClient(2);
    expect(store.selectedClient).toEqual(mockClients[1]);
  });

  it('should update client data', () => {
    const store = useClientStore();
    store.setClients(mockClients);
    store.setRatings(mockRatings);
    store.updateClientData(1, 'Great client!', 10);
    expect(store.ratings[1].comment).toBe('Great client!');
    expect(store.ratings[1].rating).toBe(10);
  });

  it('should save ratings to localStorage', () => {
    const store = useClientStore();
    store.ratings = mockRatings;
    store.saveToLocalStorage();
    const savedData = JSON.parse(localStorage.getItem('ratings') || '[]');
    expect(savedData).toEqual(mockRatings);
  });

  it('should load ratings from localStorage', () => {
    localStorage.setItem('ratings', JSON.stringify(mockRatings));
    const store = useClientStore();
    store.loadFromLocalStorage();
    expect(store.ratings).toEqual(mockRatings);
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
