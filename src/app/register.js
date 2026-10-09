import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { api } from '../services/api';
import { useAppContext } from '../context/AppContext';

export default function RegisterScreen() {
  const { setUser, setToken } = useAppContext();
  const [name, setName] = useState('Maria Souza');
  const [email, setEmail] = useState('maria@email.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const response = await api.register(name, email, password);
      setUser(response.user);
      setToken(response.token);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Não foi possível criar a conta', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Crie sua conta</Text>
        <Text style={styles.subtitle}>Cadastre-se para pedir seus pratos favoritos.</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Nome</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />

          <Pressable style={styles.primaryButton} onPress={handleRegister} disabled={loading}>
            <Text style={styles.primaryButtonText}>{loading ? 'Criando conta...' : 'Cadastrar'}</Text>
          </Pressable>

          <Link href="/" asChild>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Já tenho conta</Text>
            </Pressable>
          </Link>
        </View>
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
    padding: 24,
    justifyContent: 'center',
    minHeight: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 22,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  label: {
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
  },
  primaryButton: {
    backgroundColor: '#f97316',
    paddingVertical: 15,
    borderRadius: 14,
  },
  primaryButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#f97316',
    backgroundColor: '#fff7ed',
    paddingVertical: 14,
    borderRadius: 14,
  },
  secondaryButtonText: {
    textAlign: 'center',
    color: '#c2410c',
    fontWeight: '700',
  },
});
