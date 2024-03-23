import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Cadastro from './components/Cadastro';
import Header from './components/Header';
import ListaFornecedores from './components/ListaFornecedores';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleCadastroSucesso = () => {
    setRefresh(!refresh);
  };

  return (
    <View style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 40, backgroundColor: 'black' }}>
      <Header></Header>
      
      <Cadastro atualizarListaFornecedores={handleCadastroSucesso} ></Cadastro>

      <ListaFornecedores key={refresh.toString()}></ListaFornecedores>

    </View>
  );
};

export default App;
