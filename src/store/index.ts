import { defineStore } from 'pinia';
export interface Client {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  comment?: string;
  rating?: number;
}

export type Rating = {
  [key: number]: {
    rating: number;
    comment: string;
  }
}

export const useClientStore = defineStore('clientStore', {
  state: () => ({
    clients: [] as Client[],
    selectedClient: null as Client | null,
    ratings: {} as Rating,
    selectedRating: {} as Rating[keyof Rating],
  }),

  getters: {
    sortedClients: (state) => [...state.clients].sort((a, b) => a.last_name.localeCompare(b.last_name)),
    sortedByRating: (state) => [...state.clients].sort((a, b) => (state.ratings[b.id]?.rating ?? 0) - (state.ratings[a.id]?.rating ?? 0)),
    getRating: (state) => (id: number) => state.ratings[id] || { rating: 0, comment: '' },
  },

  actions: {
    setClients(clients: Client[]) {
      this.clients = clients;
    },
    setRatings(ratings: Rating) {
      this.ratings = ratings;
    },
    selectClient(clientId: number) {
      this.selectedClient = this.clients.find((client: Client) => client.id === clientId) || null;
      this.selectedRating = this.getRating(clientId);
    },
    updateClientData(clientId: number, comment: string, rating: number) {
      this.ratings[clientId] = { rating, comment };
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('ratings', JSON.stringify(this.ratings));
    },
    updateRating(id: number, rating: number, comment: string) {
      if (!this.ratings[id]) {
        this.ratings[id] = { rating: 0, comment: '' };
      }
      this.ratings[id] = { rating, comment };
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('ratings');
      if (data) {
        this.setRatings(JSON.parse(data));
      }
    },
    savetoLocalStorage() {
      localStorage.setItem('ratings', JSON.stringify(this.ratings));
    },
    async fetchClients() {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL);
        const data = await response.json();
        if (data && data.data) {
          this.setClients(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      }
    }
  }
});
