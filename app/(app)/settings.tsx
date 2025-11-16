import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { GlobalStyles } from '../../styles/GlobalStyles';


export default function SettingsScreen() {
  const { signOut } = useAuth();

  return (
    <View style={GlobalStyles.defaultContainer}>
      <Text style={GlobalStyles.screenTitle}>Configurações</Text>
      <Text style={GlobalStyles.label}>
        Aqui você poderia configurar sua conta, notificações e preferências.
      </Text>
      <Button title="Sair (Logout)" color="red" onPress={signOut} />
    </View>
  );
}