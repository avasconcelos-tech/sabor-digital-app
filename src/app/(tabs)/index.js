import { Link } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useAppContext } from '../../context/AppContext';
import { categories } from '../../data/mockData';
import { api } from '../../services/api';

export default function HomeScreen() {
  const { user, cart } = useAppContext();
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Todos') return products;
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0] || 'cliente'}!</Text>
            <Text style={styles.subGreeting}>O que vamos pedir hoje?</Text>
          </View>

          <Link href="/cart" asChild>
            <Pressable style={styles.cartButton}>
              <Text style={styles.cartText}>🛒</Text>
              <Text style={styles.cartBadge}>{cartCount}</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Entrega rápida</Text>
          <Text style={styles.bannerSubtitle}>Sabores especiais com preparo em até 30 minutos.</Text>
        </View>

        <Text style={styles.sectionTitle}>Categorias</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setActiveCategory(item)}
              style={[styles.categoryItem, activeCategory === item && styles.categoryItemActive]}
            >
              <Text style={[styles.categoryText, activeCategory === item && styles.categoryTextActive]}>{item}</Text>
            </Pressable>
          )}
        />

        <Text style={styles.sectionTitle}>Mais pedidos</Text>

        {loading ? (
          <Text style={styles.loading}>Carregando produtos...</Text>
        ) : (
          <View style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <Link key={product.id} href={{ pathname: '/product/[id]', params: { id: product.id } }} asChild>
                <Pressable style={styles.productCard}>
                  <Text style={styles.productEmoji}>{product.image}</Text>
                  <Text style={styles.productName}>{product.name}</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.meta}>⭐ {product.rating}</Text>
                    <Text style={styles.meta}>{product.prepTime}</Text>
                  </View>
                  <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
                  <View style={styles.productFooter}>
                    <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
                    <Text style={styles.action}>Ver mais</Text>
                  </View>
                </Pressable>
              </Link>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fffaf3',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  subGreeting: {
    color: '#6b7280',
    fontSize: 14,
    marginTop: 4,
  },
  cartButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cartText: {
    fontSize: 22,
  },
  cartBadge: {
    position: 'absolute',
    right: -4,
    top: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f97316',
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 11,
    overflow: 'hidden',
  },
  banner: {
    backgroundColor: '#f97316',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  bannerSubtitle: {
    color: '#fff7ed',
    fontSize: 13,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },
  categoryList: {
    paddingBottom: 14,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  categoryItemActive: {
    backgroundColor: '#fff7ed',
    borderColor: '#fdba74',
  },
  categoryText: {
    color: '#374151',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#c2410c',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    marginRight: '2%',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productEmoji: {
    fontSize: 42,
    marginBottom: 8,
  },
  productName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  meta: {
    color: '#4b5563',
    fontSize: 12,
  },
  description: {
    color: '#6b7280',
    fontSize: 12,
    minHeight: 32,
    marginBottom: 10,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: '#111827',
    fontWeight: '800',
    fontSize: 16,
  },
  action: {
    color: '#f97316',
    fontWeight: '700',
    fontSize: 12,
  },
  loading: {
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 12,
  },
});
