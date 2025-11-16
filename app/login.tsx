import { Redirect, useRouter } from 'expo-router'; // Importar useRouter e Redirect
import React, { useState } from 'react';
import { Alert, Button, Image, Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { GlobalStyles } from '../styles/GlobalStyles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, user } = useAuth();
  const router = useRouter(); // Inicializa o router

  // Este "if" fora do return protege a tela de login
  // se o usuário já estiver logado (ex: pelo app/index.tsx)
  if (user === true) {
    return <Redirect href="/(app)" />;
  }

  const handleLogin = () => {
    if (email.toLowerCase() === 'aluno@fiap.com.br' && password === '123') {
      signIn();
      
      // ISSO É O QUE VOCÊ PEDIU:
      // Redireciona imediatamente ao clicar em Entrar
      router.replace('/(app)'); 
      
    } else {
      Alert.alert(
        'Login Inválido',
        'Usuário ou senha incorretos. Tente (aluno@fiap.com.br / 123)'
      );
    }
  };

  // Se 'user' for nulo (carregando) ou falso (deslogado), mostre o login.
  return (
    <View style={GlobalStyles.authContainer}>
      <Image
        style={GlobalStyles.logo}
        source={{ uri: 'https://placehold.co/200x200/6366f1/white?text=SkillUp+' }}
      />
      <Text style={GlobalStyles.title}>SkillUpPlus 2030+</Text>
      <TextInput
        style={GlobalStyles.input}
        placeholder="E-mail (aluno@fiap.com.br)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={GlobalStyles.input}
        placeholder="Senha (123)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}