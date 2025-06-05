import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Controle de Serviços Autônomos

        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/cadastro')}
        >
          <Text style={styles.buttonText}>IR PARA CADASTRO DE CLIENTE</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button2}
          onPress={() => router.push('/agenda')}
        >
          <Text style={styles.buttonText}>IR PARA AGENDA </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    marginTop: 25,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
  },
  button2: {
    backgroundColor: '#31EC40',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});