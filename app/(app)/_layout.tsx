import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

// Layout do App (Drawer Navigation)
export default function AppLayout() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // ESTA É A CORREÇÃO:
    // Este "segurança" assiste o estado 'user'.
    // Se o 'user' ficar 'false' (logout),
    // ele redireciona para o login.
    if (user === false) {
      router.replace('/login');
    }
  }, [user, router]); // Dependência: 'user'

  // Se o utilizador ainda não estiver carregado (null) ou 
  // já estiver deslogado (false), não renderize o Drawer.
  if (!user) {
    return null; 
  }

  // Se o utilizador estiver logado (true), renderize o Drawer.
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)" // Link para o layout de Tabs
        options={{
          title: 'Início',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings" // Link para a tela de Configurações
        options={{
          title: 'Configurações',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      {/* Esta tela fica na pilha de navegação, mas escondida do menu */}
      <Drawer.Screen
        name="course-detail/[id]"
        options={{
          title: 'Detalhes do Curso',
          drawerItemStyle: { display: 'none' }, // Esconde do menu
          headerShown: true, // Mostra o header da Stack
        }}
      />
    </Drawer>
  );
}