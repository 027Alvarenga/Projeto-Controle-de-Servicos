import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { use, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [servico, setServico] = useState('');
  const [endereco, setEndereco] = useState('');
  const [data, setData] = useState('');

  const router = useRouter();

  const salvarCliente = async () => {
    if (!nome || !telefone || !servico || !endereco || !data) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const novoCliente = { nome, telefone, servico, endereco, data };

    try {
      // Buscar clientes salvos
      const clientesJSON = await AsyncStorage.getItem('@clientes');
      const clientes = clientesJSON ? JSON.parse(clientesJSON) : [];

      // Adicionar novo cliente
      const novosClientes = [...clientes, novoCliente];

      // Salvar no AsyncStorage
      await AsyncStorage.setItem('@clientes', JSON.stringify(novosClientes));

      // Limpar campos
      setNome('');
      setTelefone('');
      setServico('');
      setEndereco('');
      setData('');

      // Navegar para a agenda
      router.push('/agenda');

    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar o cliente');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Cliente</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Cliente"
        placeholderTextColor="#666"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="#666"
        keyboardType="phone-pad"
        value={telefone}
        onChangeText={(text) => {
        let numeros = text.replace(/\D/g, '');
        if (numeros.length > 11) numeros = numeros.slice(0, 11);

        if (numeros.length >= 7) {
            setTelefone(`(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`);
        } else if (numeros.length >= 3) {
            setTelefone(`(${numeros.slice(0, 2)}) ${numeros.slice(2)}`);
        } else {
            setTelefone(numeros);
        }
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Serviço (ex: corte, unha, treino...)"
        placeholderTextColor="#666"
        value={servico}
        onChangeText={setServico}
      />

      <TextInput
        style={styles.input}
        placeholder="Endereço"
        placeholderTextColor="#666"
        value={endereco}
        onChangeText={setEndereco}
      />

      <TextInput
        style={styles.input}
        placeholder="Data do agendamento"
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={data}
        onChangeText={(text) => {
        let numeros = text.replace(/\D/g, '');
        if (numeros.length > 8) numeros = numeros.slice(0, 8);

        if (numeros.length >= 5) {
        setData(`${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`);
        } else if (numeros.length >= 3) {
        setData(`${numeros.slice(0, 2)}/${numeros.slice(2)}`);
        } else {
        setData(numeros);
    }
  }}
      />

      <Button title="Salvar Cliente e Ir para Agenda" onPress={salvarCliente} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
});