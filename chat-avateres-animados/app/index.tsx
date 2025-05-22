// chat-avateres-animados/app/index.tsx
import React, { useState, useCallback } from 'react'; // <--- Quita 'useEffect' si lo tenías, y añade 'useCallback'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Avatar from '../components/Avatar';
import { useRouter, useFocusEffect } from 'expo-router'; // <--- Añade useFocusEffect
import AsyncStorage from '@react-native-async-storage/async-storage'; // <--- Importa AsyncStorage

export default function AppRoot() {
  const router = useRouter();
  // --- NUEVO CÓDIGO: Estados para los colores del avatar con valores por defecto ---
  const [avatarBodyColor, setAvatarBodyColor] = useState('#aaffaa');
  const [avatarBorderColor, setAvatarBorderColor] = useState('#008800');

  // --- NUEVO CÓDIGO: Función para cargar los colores del avatar desde AsyncStorage ---
  const loadAvatarColors = useCallback(async () => {
    try {
      const storedBodyColor = await AsyncStorage.getItem('avatarBodyColor');
      const storedBorderColor = await AsyncStorage.getItem('avatarBorderColor');
      if (storedBodyColor) {
        setAvatarBodyColor(storedBodyColor);
      }
      if (storedBorderColor) {
        setAvatarBorderColor(storedBorderColor);
      }
    } catch (e) {
      console.error("Error al cargar los colores del avatar en Home:", e);
    }
  }, []); // Las dependencias están vacías ya que solo usamos las funciones set, que son estables

  // --- NUEVO CÓDIGO: useFocusEffect para cargar los colores cada vez que la pantalla está en foco ---
  useFocusEffect(
    useCallback(() => {
      loadAvatarColors();
      // Opcional: puedes retornar una función de limpieza si la necesitas
      // return () => { /* cualquier limpieza */ };
    }, [loadAvatarColors]) // Se ejecuta cuando loadAvatarColors cambia (aunque useCallback lo mantiene estable)
  );

  const handleCustomizePress = () => {
    router.push('/customize');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Salón de Chat Animado</Text>

      {/* --- MODIFICACIÓN: Pasamos los colores del estado al componente Avatar --- */}
      <Avatar
        size={120}
        backgroundColor="#f0f0f0" // El fondo del contenedor del avatar lo dejamos fijo
        borderColor={avatarBorderColor} // Color del borde desde el estado
        bodyColor={avatarBodyColor} // Color del cuerpo desde el estado
      />
      <Text style={{ marginTop: 20, color: '#555' }}>¡Este es tu avatar!</Text>

      <TouchableOpacity style={styles.customizeButton} onPress={handleCustomizePress}>
        <Text style={styles.customizeButtonText}>Personalizar Avatar</Text>
      </TouchableOpacity>

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
    elevation: 5,
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