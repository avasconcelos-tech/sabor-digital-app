export const categories = [
  'Todos',
  'Bebidas',
  'Lanches',
  'Sobremesas',
  'Pizzas',
  'Porções',
];

export const products = [
  {
    id: 1,
    name: 'Burger Clássica',
    category: 'Lanches',
    price: 32.9,
    rating: 4.8,
    prepTime: '20 min',
    description: 'Pão brioche, hambúrguer artesanal, queijo cheddar, alface, tomate e molho da casa.',
    image: '🍔',
  },
  {
    id: 2,
    name: 'Pizza Margherita',
    category: 'Pizzas',
    price: 42.0,
    rating: 4.9,
    prepTime: '30 min',
    description: 'Molho de tomate, mussarela, manjericão e azeite extra virgem.',
    image: '🍕',
  },
  {
    id: 3,
    name: 'Coca-Cola',
    category: 'Bebidas',
    price: 8.5,
    rating: 4.7,
    prepTime: '5 min',
    description: 'Refrigerante gelado para complementar seu pedido.',
    image: '🥤',
  },
  {
    id: 4,
    name: 'Milkshake de Baunilha',
    category: 'Bebidas',
    price: 16.5,
    rating: 4.6,
    prepTime: '10 min',
    description: 'Creme suave de baunilha com cobertura de chantilly.',
    image: '🥛',
  },
  {
    id: 5,
    name: 'Brownie Gourmet',
    category: 'Sobremesas',
    price: 18.0,
    rating: 4.9,
    prepTime: '8 min',
    description: 'Brownie de chocolate com nozes e sorvete.',
    image: '🍫',
  },
  {
    id: 6,
    name: 'Batata Frita',
    category: 'Porções',
    price: 19.9,
    rating: 4.7,
    prepTime: '15 min',
    description: 'Porção crocante com sal grosso e molho barbecue.',
    image: '🍟',
  },
];

export const orders = [
  {
    id: 'PED-1042',
    status: 'Em preparo',
    total: 58.8,
    items: ['Burger Clássica', 'Coca-Cola'],
    date: 'Hoje, 19:45',
  },
  {
    id: 'PED-1038',
    status: 'Entregue',
    total: 76.9,
    items: ['Pizza Margherita', 'Milkshake de Baunilha'],
    date: 'Ontem, 21:10',
  },
];

export const demoUser = {
  name: 'Maria Souza',
  email: 'maria@email.com',
  phone: '(11) 99876-5432',
  address: 'Rua das Flores, 120 - Centro',
};
