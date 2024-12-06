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
      } else {
        this.fetchClients();
      }
    },
  // Fetch all users from the API
    async fetchClients() {
      try {
        const response = await fetch('https://reqres.in/api/users?page=1&per_page=6');
        const data = await response.json();
        if (data && data.data) {
          // Map API users to Client interface
          const fetchedClients: Client[] = data.data.map((user: any) => ({
            id: user.id,
            avatar: user.avatar,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            comment: '',
            rating: 0,
          }));
          this.setClients(fetchedClients);
        }
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      }
    },
  },
});
