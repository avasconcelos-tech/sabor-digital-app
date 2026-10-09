import { router } from 'expo-router';
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAppContext } from '../context/AppContext';
import { api } from '../services/api';

export default function CartScreen() {
  const { cart, updateQuantity, clearCart, totalCart } = useAppContext();

  const handleCheckout = async () => {
    if (cart.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione algum item antes de concluir o pedido.');
      return;
    }

    await api.createOrder(cart);
    clearCart();
    Alert.alert('Pedido realizado', 'Seu pedido foi recebido com sucesso.');
    router.push('/(tabs)/pedidos');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Carrinho</Text>

        {cart.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
          </View>
        ) : (
          cart.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
              </View>

              <View style={styles.itemControls}>
                <Pressable
                  style={styles.qtyButton}
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Text style={styles.qtyText}>-</Text>
                </Pressable>

                <Text style={styles.qtyValue}>{item.quantity}</Text>

                <Pressable
                  style={styles.qtyButton}
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Text style={styles.qtyText}>+</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}

        <View style={styles.summary}>
          <Text style={styles.summaryText}>Total</Text>
          <Text style={styles.summaryValue}>R$ {totalCart.toFixed(2)}</Text>
        </View>

        <Pressable style={styles.primaryButton} onPress={handleCheckout}>
          <Text style={styles.primaryButtonText}>Finalizar pedido</Text>
        </Pressable>
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
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 18,
  },
  emptyCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 26,
    alignItems: 'center',
  },
  emptyText: {
    color: '#6b7280',
    fontWeight: '600',
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemName: {
    fontWeight: '700',
    fontSize: 16,
    color: '#111827',
  },
  itemPrice: {
    fontWeight: '800',
    color: '#111827',
  },
  itemControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#fff7ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    color: '#c2410c',
    fontSize: 20,
    fontWeight: '700',
  },
  qtyValue: {
    minWidth: 32,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 12,
  },
  summary: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 18,
  },
  summaryText: {
    color: '#6b7280',
    fontWeight: '700',
  },
  summaryValue: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '800',
  },
  primaryButton: {
    backgroundColor: '#f97316',
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 24,
  },
  primaryButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
