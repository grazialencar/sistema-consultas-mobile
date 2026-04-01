import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";
import { Consulta } from "../interfaces/consulta";
import { ConsultaCard } from "../components";
import { styles } from "../styles/app.styles";
import { 
  obterConsultas, 
  salvarConsultas, 
  obterPacienteLogado, 
  removerPacienteLogado 
} from "../services/storage";

export default function Home({ navigation }: any) {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [nomePaciente, setNomePaciente] = useState("");

  // Carrega dados sempre que a tela ganhar foco
  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  async function carregarDados() {
    // Verifica se há paciente logado
    const paciente = await obterPacienteLogado();
    if (!paciente) {
      // Se não houver, redireciona para login
      console.log("Nenhum paciente logado - redirecionando para Login");
      navigation.replace("Login");
      return;
    }
    
    setNomePaciente(paciente.nome);
    console.log("Paciente logado:", paciente.nome);
    
    // Carrega consultas do paciente
    const todasConsultas = await obterConsultas();
    const consultasDoPaciente = todasConsultas.filter(
      (c) => c.paciente.id === paciente.id
    );
    setConsultas(consultasDoPaciente);
    console.log(`Carregadas ${consultasDoPaciente.length} consultas para ${paciente.nome}`);
  }

  async function confirmarConsulta(consultaId: number) {
    try {
      // Atualiza estado local
      const consultasAtualizadas = consultas.map((c) =>
        c.id === consultaId ? { ...c, status: "confirmada" as const } : c
      );
      setConsultas(consultasAtualizadas);
      
      // Atualiza todas as consultas no storage
      const todasConsultas = await obterConsultas();
      const consultasAtualizadasCompletas = todasConsultas.map((c) =>
        c.id === consultaId ? { ...c, status: "confirmada" as const } : c
      );
      await salvarConsultas(consultasAtualizadasCompletas);
      
      Alert.alert("Sucesso", "Consulta confirmada com sucesso!");
    } catch (erro) {
      console.error("Erro ao confirmar consulta:", erro);
      Alert.alert("Erro", "Não foi possível confirmar a consulta");
    }
  }

  async function cancelarConsulta(consultaId: number) {
    Alert.alert(
      "Cancelar Consulta",
      "Tem certeza que deseja cancelar esta consulta?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            try {
              // Atualiza estado local
              const consultasAtualizadas = consultas.map((c) =>
                c.id === consultaId ? { ...c, status: "cancelada" as const } : c
              );
              setConsultas(consultasAtualizadas);
              
              // Atualiza todas as consultas no storage
              const todasConsultas = await obterConsultas();
              const consultasAtualizadasCompletas = todasConsultas.map((c) =>
                c.id === consultaId ? { ...c, status: "cancelada" as const } : c
              );
              await salvarConsultas(consultasAtualizadasCompletas);
              
              Alert.alert("Sucesso", "Consulta cancelada com sucesso!");
            } catch (erro) {
              console.error("Erro ao cancelar consulta:", erro);
              Alert.alert("Erro", "Não foi possível cancelar a consulta");
            }
          },
        },
      ]
    );
  }

  async function handleLogout() {
    Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        onPress: async () => {
          try {
            console.log("Fazendo logout...");
            await removerPacienteLogado();
            console.log("Paciente removido, navegando para Login");
            navigation.replace("Login");
          } catch (erro) {
            console.error("Erro ao fazer logout:", erro);
            Alert.alert("Erro", "Não foi possível fazer logout");
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Olá, {nomePaciente || "Paciente"}!</Text>
          <Text style={styles.subtitulo}>
            {consultas.length} consulta(s) agendada(s)
          </Text>
        </View>

        {/* Botões de ação */}
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#4CAF50",
              padding: 16,
              borderRadius: 10,
              marginBottom: 10,
            }}
            onPress={() => navigation.navigate("Agendamento")}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
              + Agendar Nova Consulta
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              padding: 12,
              borderRadius: 10,
            }}
            onPress={handleLogout}
          >
            <Text style={{ color: "#fff", fontSize: 14, textAlign: "center" }}>
              Sair
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lista de consultas */}
        {consultas.length === 0 ? (
          <View style={{ 
            backgroundColor: "rgba(255,255,255,0.1)", 
            padding: 30, 
            borderRadius: 15, 
            alignItems: "center" 
          }}>
            <Text style={{ fontSize: 40, marginBottom: 15 }}>📅</Text>
            <Text style={{ color: "#fff", fontSize: 18, marginBottom: 10, textAlign: "center" }}>
              Você ainda não tem consultas agendadas
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textAlign: "center" }}>
              Toque em "Agendar Nova Consulta" para começar
            </Text>
          </View>
        ) : (
          consultas.map((consulta) => (
            <ConsultaCard
              key={consulta.id}
              consulta={consulta}
              onConfirmar={() => confirmarConsulta(consulta.id)}
              onCancelar={() => cancelarConsulta(consulta.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}