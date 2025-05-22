// chat-avateres-animados/components/Avatar.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

// Definimos una interfaz para las props del Avatar
interface AvatarProps {
  size?: number;
  backgroundColor?: string;
  borderColor?: string;
  // Agregamos una prop para el color del cuerpo (simulando una parte del avatar)
  bodyColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  size = 100,
  backgroundColor = '#cccccc',
  borderColor = '#666666',
  bodyColor = '#aaffaa', // Color por defecto para el cuerpo
}) => {
  return (
    <View style={[
      styles.avatarContainer,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }
    ]}>
      {/* Añadimos un View que representará el 'cuerpo' o la parte principal del avatar */}
      <View style={[
        styles.avatarBody,
        {
          width: size * 0.7, // Por ejemplo, el 70% del tamaño del avatar
          height: size * 0.7,
          borderRadius: (size * 0.7) / 2,
          backgroundColor: bodyColor,
        }
      ]} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarBody: {
    // Estilos para el "cuerpo" del avatar dentro del contenedor
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Avatar;