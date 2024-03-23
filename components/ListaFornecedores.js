import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const ListaFornecedores = () => {
    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        const db = SQLite.openDatabase({ name: 'database.db' });

        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM fornecedores',
                [],
                (_, { rows }) => {
                    const result = [];
                    for (let i = 0; i < rows.length; i++) {
                        result.push(rows.item(i));
                    }
                    setFornecedores(result);
                },
                (_, error) => {
                    console.error('Erro ao buscar fornecedores:', error);
                }
            );
        });
    }, []);

    return (
        <View style={{  flex: 1, padding: 20 }}>
            <Text style={{ fontFamily: 'Roboto', fontSize: 20, color: 'white', paddingBottom: 10 }}>
                Lista de Fornecedores</Text>
            <FlatList
                data={fornecedores}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 10, backgroundColor: 'white', padding: 8 }}>
                        <Text style={{ fontFamily: 'Roboto', fontSize: 16 }}>Nome: {item.nome}</Text>
                        <Text style={{ fontFamily: 'Roboto', fontSize: 16 }}>Endereço: {item.endereco}</Text>
                        <Text style={{ fontFamily: 'Roboto', fontSize: 16 }}>Contato: {item.contato}</Text>
                        <Text style={{ fontFamily: 'Roboto', fontSize: 16 }}>Categorias: {item.categorias}</Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

export default ListaFornecedores;
