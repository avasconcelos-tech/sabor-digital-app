import { orders, products, demoUser } from '../data/mockData';

const wait = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  async login(email, password) {
    await wait();

    if (!email || !password) {
      throw new Error('Informe o e-mail e a senha para continuar.');
    }

    return {
      token: 'demo-token-123',
      user: {
        ...demoUser,
        email,
      },
    };
  },

  async register(name, email, password) {
    await wait();

    if (!name || !email || !password) {
      throw new Error('Preencha todos os campos para criar sua conta.');
    }

    return {
      token: 'demo-token-456',
      user: {
        ...demoUser,
        name,
        email,
      },
    };
  },

  async getProducts() {
    await wait();
    return products;
  },

  async getProduct(id) {
    await wait();
    return products.find((product) => String(product.id) === String(id)) || null;
  },

  async getOrders() {
    await wait();
    return orders;
  },

  async createOrder(items) {
    await wait();

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      id: `PED-${Math.floor(Math.random() * 9000) + 1000}`,
      status: 'Em preparo',
      total,
      items: items.map((item) => `${item.name} x${item.quantity}`),
      date: 'Agora',
    };
  },
};
