import { Link, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useAppContext } from '../../context/AppContext';
import { api } from '../../services/api';

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const { addToCart } = useAppContext();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await api.getProduct(id);
      setProduct(data);
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.loading}>Carregando produto...</Text>
      </SafeAreaView>
    );
  }

  const handleContinue = () => {
    addToCart(product);
    Alert.alert('Adicionado', `${product.name} foi adicionado ao carrinho.`);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Voltar</Text>
        </Pressable>

        <View style={styles.hero}>
          <Text style={styles.emoji}>{product.image}</Text>
        </View>

        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name}>{product.name}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>⭐ {product.rating}</Text>
          <Text style={styles.meta}>{product.prepTime}</Text>
        </View>

        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.priceBox}>
          <Text style={styles.priceLabel}>Preço</Text>
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        </View>

        <Pressable style={styles.primaryButton} onPress={handleContinue}>
          <Text style={styles.primaryButtonText}>Adicionar ao carrinho</Text>
        </Pressable>

        <Link href="/cart" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Ir para o carrinho</Text>
          </Pressable>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fffaf5',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    color: '#374151',
    fontWeight: '700',
    fontSize: 15,
  },
  hero: {
    backgroundColor: '#fff',
    borderRadius: 26,
    minHeight: 240,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  emoji: {
    fontSize: 112,
  },
  category: {
    color: '#f97316',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 6,
  },
  name: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 14,
  },
  meta: {
    color: '#4b5563',
    fontWeight: '600',
  },
  description: {
    color: '#4b5563',
    fontSize: 15,
    lineHeight: 22,
  },
  priceBox: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  priceLabel: {
    color: '#6b7280',
    fontSize: 12,
    marginBottom: 4,
  },
  price: {
    color: '#111827',
    fontSize: 28,
    fontWeight: '800',
  },
  primaryButton: {
    backgroundColor: '#f97316',
    borderRadius: 14,
    paddingVertical: 15,
    marginTop: 22,
  },
  primaryButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 12,
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#fdba74',
    borderRadius: 14,
    paddingVertical: 15,
  },
  secondaryButtonText: {
    textAlign: 'center',
    color: '#c2410c',
    fontWeight: '700',
  },
  loading: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#6b7280',
  },
});
