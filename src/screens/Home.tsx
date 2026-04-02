import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Consulta } from "../interfaces/consulta";
import { ConsultaCard } from "../components";
import { styles } from "../styles/app.styles";
import { 
  obterConsultas, 
  salvarConsultas, 
  obterPacienteLogado
} from "../services/storage";

export default function Home({ navigation }: any) {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [nomePaciente, setNomePaciente] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  async function carregarDados() {
    const paciente = await obterPacienteLogado();
    if (!paciente) {
      navigation.replace("Login");
      return;
    }
    
    setNomePaciente(paciente.nome);
    
    const todasConsultas = await obterConsultas();
    const consultasDoPaciente = todasConsultas.filter(
      (c) => c.paciente.id === paciente.id
    );
    setConsultas(consultasDoPaciente);
  }

  async function confirmarConsulta(consultaId: number) {
    try {
      const consultasAtualizadas = consultas.map((c) =>
        c.id === consultaId ? { ...c, status: "confirmada" as const } : c
      );
      setConsultas(consultasAtualizadas);
      
      const todasConsultas = await obterConsultas();
      const consultasAtualizadasCompletas = todasConsultas.map((c) =>
        c.id === consultaId ? { ...c, status: "confirmada" as const } : c
      );
      await salvarConsultas(consultasAtualizadasCompletas);
      
      Alert.alert("Sucesso", "Consulta confirmada com sucesso!");
    } catch (erro) {
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
              const consultasAtualizadas = consultas.map((c) =>
                c.id === consultaId ? { ...c, status: "cancelada" as const } : c
              );
              setConsultas(consultasAtualizadas);
              
              const todasConsultas = await obterConsultas();
              const consultasAtualizadasCompletas = todasConsultas.map((c) =>
                c.id === consultaId ? { ...c, status: "cancelada" as const } : c
              );
              await salvarConsultas(consultasAtualizadasCompletas);
              
              Alert.alert("Sucesso", "Consulta cancelada com sucesso!");
            } catch (erro) {
              Alert.alert("Erro", "Não foi possível cancelar a consulta");
            }
          },
        },
      ]
    );
  }

  async function handleLogout() {
    Alert.alert("Sair", "Deseja realmente sair?", [
      { text: "Cancelar" },
      {
        text: "Sair",
        onPress: () => {
          AsyncStorage.removeItem("@consultas:pacienteLogado")
            .then(() => {
              navigation.replace("Login");
            })
            .catch(() => {
              Alert.alert("Erro", "Não foi possível sair");
            });
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