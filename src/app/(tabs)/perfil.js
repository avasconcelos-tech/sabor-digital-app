import { router } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { useAppContext } from '../../context/AppContext';

export default function ProfileScreen() {
  const { user, setUser, setToken, clearCart } = useAppContext();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    clearCart();
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>

        <View style={styles.card}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatar}>{user?.name?.[0] || 'U'}</Text>
          </View>

          <Text style={styles.name}>{user?.name || 'Usuário'}</Text>
          <Text style={styles.info}>{user?.email || 'email@exemplo.com'}</Text>
          <Text style={styles.info}>{user?.phone || '(11) 99999-9999'}</Text>
          <Text style={styles.info}>{user?.address || 'Endereço não informado'}</Text>
        </View>

        <Pressable style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sair</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fffaf5',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  avatarWrap: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#fff7ed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 36,
    fontWeight: '800',
    color: '#f97316',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  info: {
    color: '#4b5563',
    fontSize: 14,
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#f97316',
    borderRadius: 14,
    paddingVertical: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
