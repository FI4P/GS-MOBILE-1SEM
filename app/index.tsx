import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

/**
 * Esta é a tela "raiz" (gatekeeper).
 * Ela decide para onde o usuário deve ir.
 */
export default function Index() {
  const { user } = useAuth();

  // Se o estado do usuário ainda está sendo carregado
  if (user === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Se o usuário ESTÁ logado
  if (user) {
    // Redireciona para a tela principal do app
    return <Redirect href="/(app)" />;
  } 
  // Se o usuário NÃO ESTÁ logado
  else {
    // Redireciona para a tela de login
    return <Redirect href="/login" />;
  }
}