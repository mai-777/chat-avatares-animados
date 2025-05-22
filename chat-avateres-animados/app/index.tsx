// chat-avateres-animados/app/index.tsx
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Avatar from '../components/Avatar';
import { useRouter } from 'expo-router'; // Importa useRouter para navegar

export default function AppRoot() {
  const router = useRouter(); // Inicializa el hook de router

  const handleCustomizePress = () => {
    router.push('/customize'); // Navega a la ruta /customize
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Salón de Chat Animado</Text>

      {/* Aquí agregamos una instancia de tu Avatar */}
      <Avatar size={120} backgroundColor="#f0f0f0" borderColor="#008800" bodyColor="#aaffaa" />
      <Text style={{ marginTop: 20, color: '#555' }}>¡Este es tu avatar!</Text>

      {/* Botón para ir a la pantalla de personalización */}
      <TouchableOpacity style={styles.customizeButton} onPress={handleCustomizePress}>
        <Text style={styles.customizeButtonText}>Personalizar Avatar</Text>
      </TouchableOpacity>

      {/* Este será el contenedor principal de tu chat o la navegación a la personalización */}
      <View style={styles.chatSection}>
        <Text style={styles.chatTitle}>¡Bienvenido al Chat!</Text>
        <Text style={styles.chatDescription}>
          Aquí podrás ver y enviar mensajes.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  customizeButton: {
    marginTop: 30,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  customizeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatSection: {
    marginTop: 40,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Para Android
  },
  chatTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  chatDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});