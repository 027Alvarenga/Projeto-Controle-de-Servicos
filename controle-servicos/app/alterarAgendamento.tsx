import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AlterarAgendamento() {
  const { id, nome, telefone, servico, endereco, data } = useLocalSearchParams();

  const [nomeEdit, setNomeEdit] = useState(nome as string);
  const [telefoneEdit, setTelefoneEdit] = useState(telefone as string);
  const [servicoEdit, setServicoEdit] = useState(servico as string);
  const [enderecoEdit, setEnderecoEdit] = useState(endereco as string);
  const [dataEdit, setDataEdit] = useState(data as string);

  const salvarAlteracoes = async () => {
    try {
      const clientesJSON = await AsyncStorage.getItem('@clientes');
      let listaClientes = clientesJSON ? JSON.parse(clientesJSON) : [];

      const index = listaClientes.findIndex((c: any) => c.id === id);
      if (index !== -1) {
        listaClientes[index] = {
          id,
          nome: nomeEdit,
          telefone: telefoneEdit,
          servico: servicoEdit,
          endereco: enderecoEdit,
          data: dataEdit,
        };

        await AsyncStorage.setItem('@clientes', JSON.stringify(listaClientes));
        Alert.alert('Sucesso', 'Cliente atualizado com sucesso');
        router.back(); // Volta para a agenda
      }
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      Alert.alert('Erro', 'Não foi possível salvar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alterar Cliente</Text>

      <TextInput style={styles.input} value={nomeEdit} onChangeText={setNomeEdit} placeholder="Nome" />
      <TextInput style={styles.input} value={telefoneEdit} onChangeText={setTelefoneEdit} placeholder="Telefone" />
      <TextInput style={styles.input} value={servicoEdit} onChangeText={setServicoEdit} placeholder="Serviço" />
      <TextInput style={styles.input} value={enderecoEdit} onChangeText={setEnderecoEdit} placeholder="Endereço" />
      <TextInput style={styles.input} value={dataEdit} onChangeText={setDataEdit} placeholder="Data" />

      <TouchableOpacity style={styles.button} onPress={salvarAlteracoes}>
        <Text style={styles.buttonText}>Salvar Alteração</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  button: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 5 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});