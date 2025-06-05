import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

// Tipo do cliente
type Cliente = {
  id: string;
  nome: string;
  telefone: string;
  servico: string;
  endereco: string;
  data: string;
};

export default function Agenda() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const isFocused = useIsFocused();

  // Carrega os clientes
  const carregarClientes = async () => {
    try {
      const clientesJSON = await AsyncStorage.getItem('@clientes');
      const dados: Cliente[] = clientesJSON ? JSON.parse(clientesJSON) : [];
      setClientes(dados);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      Alert.alert('Erro', 'Não foi possível carregar os clientes');
    }
  };

  // Remove um cliente
  const removerCliente = async (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja remover este cliente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              const clientesAtualizados = clientes.filter(cliente => cliente.id !== id);
              await AsyncStorage.setItem('@clientes', JSON.stringify(clientesAtualizados));
              setClientes(clientesAtualizados);
              Alert.alert('Sucesso', 'Cliente removido com sucesso');
            } catch (error) {
              console.error('Erro ao remover cliente:', error);
              Alert.alert('Erro', 'Não foi possível remover o cliente');
            }
          }
        }
      ]
    );
  };

  // Atualiza a lista quando a tela recebe foco
  useEffect(() => {
    if (isFocused) {
      carregarClientes();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda de Clientes</Text>

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Cliente }) => (
          <View style={styles.clienteCard}>
            <View style={styles.clienteInfo}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.info}>Telefone: {item.telefone}</Text>
              <Text style={styles.info}>Serviço: {item.servico}</Text>
              <Text style={styles.info}>Endereço: {item.endereco}</Text>
              <Text style={styles.info}>Data: {item.data}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removerCliente(item.id)}
            >
              <Text style={styles.deleteButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.deleteButton, { backgroundColor: 'gray', marginTop: 20 }]}
        onPress={async () => {
          try {
            await AsyncStorage.removeItem('@clientes');
            setClientes([]);
            Alert.alert('Limpo', 'Todos os clientes foram removidos');
          } catch (error) {
            console.error('Erro ao limpar clientes:', error);
            Alert.alert('Erro', 'Não foi possível apagar os clientes');
          }
        }}
      >
        <Text style={styles.deleteButtonText}>Apagar Todos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  clienteCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clienteInfo: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});