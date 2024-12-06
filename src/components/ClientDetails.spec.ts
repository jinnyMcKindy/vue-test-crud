import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useClientStore } from '../store';
import ClientDetails from './ClientDetails.vue';
import { describe, beforeEach, it, expect, vi } from 'vitest';

describe('ClientDetails.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia()); // Инициализация Pinia перед каждым тестом
  });
  const client = { id: 1, avatar: 'avatar1.jpg', first_name: 'John', last_name: 'Doe', email: 'john@example.com', rating: 4, comment: 'Test comment' };
  it('renders client details correctly', async () => {
    // Arrange: Устанавливаем данные клиента в store
    const store = useClientStore();
    store.setClients([client]);
    store.selectedClient = store.clients[0];

    // Mount the component
    const wrapper = mount(ClientDetails);

    // Assert: Проверяем, что компоненты рендерятся с правильными данными
    expect(wrapper.find('img').attributes('src')).toBe('avatar1.jpg');
    expect(wrapper.find('p.text-xl').text()).toBe('John Doe');
    expect(wrapper.find('p.text-gray-600').text()).toBe('john@example.com');
    expect(wrapper.find('textarea').element.value).toBe('Test comment');
    expect(wrapper.find('input[type="number"]').element.value).toBe('4');
  });

  it('updates comment and rating when client is selected', async () => {
    // Arrange: Устанавливаем данные клиента в store
    const store = useClientStore();
    store.setClients([client]);
    store.selectedClient = store.clients[0];

    const wrapper = mount(ClientDetails);

    // Act: Меняем данные в текстовом поле и поле рейтинга
    await wrapper.find('textarea').setValue('Updated comment');
    await wrapper.find('input[type="number"]').setValue(5);

    // Assert: Проверяем, что изменения были правильно внесены
    expect(wrapper.find('textarea').element.value).toBe('Updated comment');
    expect(wrapper.find('input[type="number"]').element.value).toBe('5');
  });

  it('updates client data correctly when saveData is called', async () => {
    // Arrange: Устанавливаем данные клиента в store
    const store = useClientStore();
    const initialClient = client;
    store.setClients([initialClient]);
    store.selectedClient = initialClient;

    const wrapper = mount(ClientDetails);

    // Act: Меняем данные в форме и сохраняем их
    await wrapper.find('textarea').setValue('Updated comment');
    await wrapper.find('input[type="number"]').setValue(5);
    await wrapper.find('button').trigger('click');

    // Assert: Проверяем, что данные клиента в store были обновлены
    expect(store.selectedClient?.comment).toBe('Updated comment');
    expect(store.selectedClient?.rating).toBe(5);
  });
});
