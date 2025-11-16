import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { GlobalStyles } from '../../../styles/GlobalStyles';


export default function ProfileScreen() {
  const [selectedArea, setSelectedArea] = useState('ia');

  return (
    <View style={GlobalStyles.defaultContainer}>
      <Text style={GlobalStyles.screenTitle}>Autoavaliação</Text>
      <Text style={GlobalStyles.label}>Selecione sua principal área de interesse:</Text>
      <View style={GlobalStyles.pickerContainer}>
        <Picker 
          selectedValue={selectedArea}
          onValueChange={(itemValue) => setSelectedArea(itemValue)}
          style={GlobalStyles.picker}
        >
          <Picker.Item label="Inteligência Artificial" value="ia" />
          <Picker.Item label="Gestão e Soft Skills" value="gestao" />
          <Picker.Item label="Sustentabilidade" value="sust" />
          <Picker.Item label="Análise de Dados" value="dados" />
        </Picker>
      </View>
      <Button 
        title="Salvar Interesses" 
        onPress={() => Alert.alert('Salvo!', `Interesse em ${selectedArea} registrado.`)} 
      />
    </View>
  );
}