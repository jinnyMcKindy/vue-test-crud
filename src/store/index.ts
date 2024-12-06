import { defineStore } from 'pinia';

export interface Client {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  comment?: string;
  rating: number;
}

export const useClientStore = defineStore('clientStore', {
  state: () => ({
    clients: [] as Client[],
    selectedClient: null as Client | null,
  }),

  getters: {
    sortedClients: (state) => [...state.clients].sort((a, b) => a.last_name.localeCompare(b.last_name)),
    sortedByRating: (state) => [...state.clients].sort((a, b) => b.rating - a.rating),
  },

  actions: {
    setClients(clients: Client[]) {
      this.clients = clients;
    },
    selectClient(clientId: number) {
      this.selectedClient = this.clients.find((client: Client) => client.id === clientId) || null;
    },
    updateClientData(clientId: number, comment: string, rating: number) {
      const client: Client | undefined = this.clients.find((client: Client) => client.id === clientId);
      if (client) {
        client.comment = comment;
        client.rating = rating;
        this.saveToLocalStorage();
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('clients', JSON.stringify(this.clients));
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('clients');
      if (data) {
        this.clients = JSON.parse(data);
      }
    },
  },
});
