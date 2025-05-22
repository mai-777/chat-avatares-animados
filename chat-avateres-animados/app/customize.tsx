// chat-avateres-animados/app/customize.tsx
import React, { useState, useEffect } from 'react'; // <--- Añade useEffect aquí
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native'; // <--- Añade Alert para mejores mensajes
import Avatar from '../components/Avatar';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // <--- Importa AsyncStorage

const colors = ['#aaffaa', '#ffaaaa', '#aaddff', '#ffffaa', '#eeccff', '#cccccc', '#99bbff', '#ffcc99', '#dddddd']; // Paleta de colores más amplia para probar

export default function CustomizeAvatarScreen() {
  const router = useRouter();

  const [currentBodyColor, setCurrentBodyColor] = useState(colors[0]);
  const [currentBorderColor, setCurrentBorderColor] = useState('#666666');

  // --- NUEVO CÓDIGO: useEffect para cargar colores al iniciar la pantalla ---
  useEffect(() => {
    const loadAvatarColors = async () => {
      try {
        const storedBodyColor = await AsyncStorage.getItem('avatarBodyColor');
        const storedBorderColor = await AsyncStorage.getItem('avatarBorderColor');
        if (storedBodyColor) {
          setCurrentBodyColor(storedBodyColor);
        }
        if (storedBorderColor) {
          setCurrentBorderColor(storedBorderColor);
        }
      } catch (e) {
        console.error("Error al cargar los colores del avatar en CustomizeScreen:", e);
        // Opcional: Mostrar un mensaje al usuario si la carga falla
        Alert.alert("Error", "No se pudieron cargar los colores guardados.");
      }
    };
    loadAvatarColors();
  }, []); // El array vacío [] asegura que esto se ejecute solo una vez al montar el componente

  // --- MODIFICACIÓN DE handleSave para guardar en AsyncStorage ---
  const handleSave = async () => {
    try {
      // Guardar los colores actuales en AsyncStorage
      await AsyncStorage.setItem('avatarBodyColor', currentBodyColor);
      await AsyncStorage.setItem('avatarBorderColor', currentBorderColor);
      
      Alert.alert('¡Éxito!', 'Avatar guardado con éxito!'); // <--- Usamos Alert en lugar de alert
      router.push('/'); // Navega de vuelta a la pantalla principal
    } catch (e) {
      console.error("Error al guardar los colores del avatar:", e);
      Alert.alert("Error", "Hubo un error al guardar el avatar. Inténtalo de nuevo."); // <--- Usamos Alert
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Personalizar Avatar</Text>

      <Avatar
        size={150}
        backgroundColor="#f0f0f0"
        borderColor={currentBorderColor}
        bodyColor={currentBodyColor}
      />

      <View style={styles.section}>
        <Text style={styles.subtitle}>Color del Cuerpo:</Text>
        <View style={styles.colorPickerContainer}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                currentBodyColor === color && styles.selectedColor,
              ]}
              onPress={() => setCurrentBodyColor(color)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Color del Borde:</Text>
        <View style={styles.colorPickerContainer}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color + '-border'} // Clave única para el mapeo
              style={[
                styles.colorOption,
                { backgroundColor: color },
                currentBorderColor === color && styles.selectedColor,
              ]}
              onPress={() => setCurrentBorderColor(color)}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Avatar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  section: {
    marginTop: 30,
    alignItems: 'center',
    width: '90%',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#444',
  },
  colorPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#007bff',
    borderWidth: 3,
  },
  saveButton: {
    marginTop: 50,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});