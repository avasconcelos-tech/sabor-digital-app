import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { api } from '../../services/api';

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await api.getOrders();
      setOrders(data);
    };

    loadOrders();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Pedidos</Text>
          <Link href="/(tabs)" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Novo pedido</Text>
            </Pressable>
          </Link>
        </View>

        {orders.map((order) => (
          <View key={order.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={styles.status}>{order.status}</Text>
            </View>

            <Text style={styles.date}>{order.date}</Text>
            <Text style={styles.items}>{order.items.join(', ')}</Text>
            <View style={styles.footer}>
              <Text style={styles.total}>Total</Text>
              <Text style={styles.price}>R$ {Number(order.total).toFixed(2)}</Text>
            </View>
          </View>
        ))}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  button: {
    backgroundColor: '#fff7ed',
    borderColor: '#fdba74',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#c2410c',
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderId: {
    fontWeight: '700',
    color: '#111827',
  },
  status: {
    color: '#f97316',
    fontWeight: '700',
  },
  date: {
    color: '#6b7280',
    fontSize: 12,
    marginBottom: 8,
  },
  items: {
    color: '#374151',
    fontSize: 14,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 12,
  },
  total: {
    color: '#6b7280',
    fontWeight: '600',
  },
  price: {
    color: '#111827',
    fontWeight: '800',
    fontSize: 16,
  },
});
