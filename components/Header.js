import React from 'react';
import { View, Text } from 'react-native';

const Header = () => {
  return (
    <View style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ textAlign: 'center', fontFamily: 'Roboto', fontSize: 24, lineHeight: 35, color: 'white', fontWeight: 'semibold' }}>Bem-vindo ao Cadastro de Fornecedores</Text>
    </View>
  );
};

export default Header;
