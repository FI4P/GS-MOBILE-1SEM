import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';


export default function AppLayout() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
   
    if (user === false) {
      router.replace('/login');
    }
  }, [user, router]); 
  if (!user) {
    return null; 
  }


  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Início',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings" 
        options={{
          title: 'Configurações',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
     
      <Drawer.Screen
        name="course-detail/[id]"
        options={{
          title: 'Detalhes do Curso',
          drawerItemStyle: { display: 'none' }, 
          headerShown: true, 
        }}
      />
    </Drawer>
  );
}