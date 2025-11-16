import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { MOCK_COURSES } from '../../../constants/Courses';
import { GlobalStyles } from '../../../styles/GlobalStyles';


export default function CourseDetailScreen() {
 
  const { id } = useLocalSearchParams<{ id: string }>();
  
 
  const course = MOCK_COURSES.find(c => c.id === id);

  if (!course) {
    return (
      <View style={GlobalStyles.defaultContainer}>
        <Text style={GlobalStyles.screenTitle}>Curso não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={GlobalStyles.defaultContainer}>
      
      <Stack.Screen options={{ title: course.title }} />
      
      <Text style={GlobalStyles.screenTitle}>{course.title}</Text>
      <Text style={GlobalStyles.paragraph}>
        Este é o curso com ID: {id}.
      </Text>
      <Text style={GlobalStyles.paragraph}>
        {course.description}
      </Text>
      <Text style={GlobalStyles.paragraph}>
        Aqui viria a descrição completa do curso, módulos, vídeos e atividades
        gamificadas.
      </Text>
      <Button 
        title="Iniciar Curso" 
        onPress={() => Alert.alert('Iniciado!', 'Bons estudos!')} 
      />
    </View>
  );
}