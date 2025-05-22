// chat-avateres-animados/app/customize.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Avatar from '../components/Avatar'; // Ajusta la ruta si es necesario
import { useRouter } from 'expo-router'; // Para la navegación

const colors = ['#aaffaa', '#ffaaaa', '#aaddff', '#ffffaa', '#eeccff']; // Paleta de colores de ejemplo

export default function CustomizeAvatarScreen() {
  const router = useRouter(); // Inicializa el hook de router

  // Estado para los colores del avatar
  const [currentBodyColor, setCurrentBodyColor] = useState(colors[0]);
  const [currentBorderColor, setCurrentBorderColor] = useState('#666666'); // Color de borde inicial

  const handleSave = () => {
    // En un futuro, aquí guardarías estos colores en almacenamiento local
    // o los enviarías a un servidor. Por ahora, solo navegaremos de vuelta.
    alert(`Avatar guardado con Cuerpo: ${currentBodyColor} y Borde: ${currentBorderColor}`);
    // Aquí podrías pasar los colores como parámetros al Home Screen si quieres
    router.push('/'); // Navega de vuelta a la pantalla principal
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Personalizar Avatar</Text>

      {/* Muestra el avatar con los colores seleccionados */}
      <Avatar
        size={150}
        backgroundColor="#f0f0f0" // Fondo del contenedor del avatar
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
          {colors.map((color) => ( // Usamos la misma paleta para el borde
            <TouchableOpacity
              key={color + '-border'} // Clave única
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
    borderColor: 'transparent', // Por defecto transparente
  },
  selectedColor: {
    borderColor: '#007bff', // Borde azul para el color seleccionado
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