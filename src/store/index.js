import { defineStore } from 'pinia';
export const useClientStore = defineStore('clientStore', {
    state: () => ({
        clients: [],
        selectedClient: null,
    }),
    getters: {
        sortedClients: (state) => [...state.clients].sort((a, b) => a.last_name.localeCompare(b.last_name)),
        sortedByRating: (state) => [...state.clients].sort((a, b) => b.rating - a.rating),
    },
    actions: {
        setClients(clients) {
            this.clients = clients;
        },
        selectClient(clientId) {
            this.selectedClient = this.clients.find((client) => client.id === clientId) || null;
        },
        updateClientData(clientId, comment, rating) {
            const client = this.clients.find((client) => client.id === clientId);
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
            else {
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
                    const fetchedClients = data.data.map((user) => ({
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
            }
            catch (error) {
                console.error('Failed to fetch clients:', error);
            }
        },
    },
});
