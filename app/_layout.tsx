import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} /> 
      </Stack>
    </AuthProvider>
  );
}