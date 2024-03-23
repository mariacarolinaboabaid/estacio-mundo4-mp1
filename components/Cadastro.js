import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const Cadastro = ({ atualizarListaFornecedores }) => {
    const [fornecedor, setFornecedor] = useState({
        nome: '',
        endereco: '',
        contato: '',
        categorias: ''
    });

    const limparCampos = () => {
        setFornecedor({
            nome: '',
            endereco: '',
            contato: '',
            categorias: ''
        });
    };

    const salvar = () => {
        if (!fornecedor.nome || !fornecedor.endereco || !fornecedor.contato || !fornecedor.categorias) {
            alert("O preenchimento de todos os campos são obrigatórios!")
            return false;
        }

        const db = SQLite.openDatabase({ name: 'database.db' });

        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS fornecedores (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, endereco TEXT, contato TEXT, categorias TEXT)'
            );
        });

        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO fornecedores (nome, endereco, contato, categorias) VALUES (?, ?, ?, ?)',
                [fornecedor.nome, fornecedor.endereco, fornecedor.contato, fornecedor.categorias],
                (_, resultSet) => {
                    console.log('Dados inseridos com sucesso!');
                    atualizarListaFornecedores();
                    limparCampos(); 
                },
                (_, error) => {
                    console.error('Erro ao inserir dados:', error);
                }
            );
        });
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontFamily: 'Roboto', fontSize: 16, color: 'white', paddingBottom: 10 }}>
                Nome</Text>
            <TextInput
                value={fornecedor.nome}
                onChangeText={text => setFornecedor({ ...fornecedor, nome: text })}
                style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 20, padding: 5, backgroundColor: 'white', borderRadius: 8, color: 'blue', textDecorationLine: 'none' }}
            />

            <Text style={{ fontFamily: 'Roboto', fontSize: 16, color: 'white', paddingBottom: 10 }}>
                Endereço</Text>
            <TextInput
                value={fornecedor.endereco}
                onChangeText={text => setFornecedor({ ...fornecedor, endereco: text })}
                style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 20, padding: 5, backgroundColor: 'white', borderRadius: 8, color: 'blue', textDecorationLine: 'none' }}
            />

            <Text style={{ fontFamily: 'Roboto', fontSize: 16, color: 'white', paddingBottom: 10 }}>
                Contato</Text>
            <TextInput
                value={fornecedor.contato}
                onChangeText={text => setFornecedor({ ...fornecedor, contato: text })}
                style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 20, padding: 5, backgroundColor: 'white', borderRadius: 8, color: 'blue', textDecorationLine: 'none' }}
            />

            <Text style={{ fontFamily: 'Roboto', fontSize: 16, color: 'white', paddingBottom: 10 }}>
                Categorias</Text>
            <TextInput
                value={fornecedor.categorias}
                onChangeText={text => setFornecedor({ ...fornecedor, categorias: text })}
                style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 20, padding: 5, backgroundColor: 'white', borderRadius: 8, color: 'blue', textDecorationLine: 'none' }}
            />

            <Button
                title="Salvar" onPress={salvar} />
        </View>
    );
};

export default Cadastro;
