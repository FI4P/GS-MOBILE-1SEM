import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Course } from '../constants/Courses';
import { GlobalStyles } from '../styles/GlobalStyles';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const router = useRouter();

  const handlePress = () => {
   
    router.push(`/(app)/course-detail/${course.id}`);
  };

  return (
    <TouchableOpacity style={GlobalStyles.card} onPress={handlePress}>
      <Image source={{ uri: course.banner }} style={GlobalStyles.cardImage} />
      <View style={GlobalStyles.cardContent}>
        <Text style={GlobalStyles.cardTitle}>{course.title}</Text>
        <Text style={GlobalStyles.cardDescription}>{course.description}</Text>
      </View>
    </TouchableOpacity>
  );
}