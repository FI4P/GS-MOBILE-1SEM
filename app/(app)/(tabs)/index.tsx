import React from 'react';
import { ScrollView, Text } from 'react-native';
import { CourseCard } from '../../../components/CourseCard';
import { MOCK_COURSES } from '../../../constants/Courses';
import { GlobalStyles } from '../../../styles/GlobalStyles';


export default function HomeScreen() {
  return (
    <ScrollView style={GlobalStyles.defaultContainer}>
      <Text style={GlobalStyles.screenTitle}>Minhas Trilhas</Text>
      {MOCK_COURSES.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </ScrollView>
  );
}