import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Cliente {
  nome: string;
  servico: string;
  telefone: string;
}

export default function Agenda() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const carregarClientes = async () => {
      const clientesJSON = await AsyncStorage.getItem('@clientes');
      const dados = clientesJSON ? JSON.parse(clientesJSON) : [];
      setClientes(dados);
    };

    carregarClientes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda de Clientes</Text>

      <FlatList
        data={clientes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>{item.servico}</Text>
            <Text>{item.telefone}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  nome: { fontWeight: 'bold', fontSize: 16 },
});