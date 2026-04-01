import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Especialidade } from "../types/especialidade";
import { Medico } from "../interfaces/medico";
import { Consulta } from "../interfaces/consulta";
import { styles } from "../styles/app.styles";
import {
  obterEspecialidades,
  obterMedicos,
  obterPacienteLogado,
  salvarConsultas,
  obterConsultas,
} from "../services/storage";

export default function Agendamento({ navigation }: any) {
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [medicosFiltrados, setMedicosFiltrados] = useState<Medico[]>([]);
  const [especialidadeSelecionada, setEspecialidadeSelecionada] =
    useState<Especialidade | null>(null);
  const [medicoSelecionado, setMedicoSelecionado] = useState<Medico | null>(null);
  const [dataConsulta, setDataConsulta] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const esps = await obterEspecialidades();
    const meds = await obterMedicos();
    setEspecialidades(esps);
    setMedicos(meds);
  }

  // Filtra médicos quando uma especialidade é selecionada
  function selecionarEspecialidade(esp: Especialidade) {
    setEspecialidadeSelecionada(esp);
    setMedicoSelecionado(null); // Reseta médico ao mudar especialidade
    // Filtra médicos da especialidade
    const medicosEsp = medicos.filter((m) => m.especialidade.id === esp.id);
    setMedicosFiltrados(medicosEsp);
  }

  async function agendarConsulta() {
    // Validações
    if (!especialidadeSelecionada) {
      Alert.alert("Atenção", "Selecione uma especialidade");
      return;
    }
    if (!medicoSelecionado) {
      Alert.alert("Atenção", "Selecione um médico");
      return;
    }
    if (!dataConsulta) {
      Alert.alert("Atenção", "Informe a data da consulta");
      return;
    }

    // Valida formato da data
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataConsulta)) {
      Alert.alert("Erro", "Use o formato DD/MM/AAAA para a data");
      return;
    }

    try {
      // Busca paciente logado
      const paciente = await obterPacienteLogado();
      if (!paciente) {
        Alert.alert("Erro", "Você precisa estar logado para agendar");
        navigation.replace("Login");
        return;
      }

      // Converte data
      const [dia, mes, ano] = dataConsulta.split("/");
      const data = new Date(Number(ano), Number(mes) - 1, Number(dia));

      // Valida se a data não é no passado
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      if (data < hoje) {
        Alert.alert("Erro", "Não é possível agendar consultas no passado");
        return;
      }

      // Cria nova consulta
      const novaConsulta: Consulta = {
        id: Date.now(),
        medico: medicoSelecionado,
        paciente: paciente,
        data: data,
        valor: 350,
        status: "agendada",
        observacoes: `Consulta agendada via app`,
      };

      // Salva consulta
      const consultas = await obterConsultas();
      await salvarConsultas([...consultas, novaConsulta]);

      Alert.alert(
        "Sucesso!",
        `Consulta agendada com ${medicoSelecionado.nome} para ${dataConsulta}`,
        [
          {
            text: "Ver minhas consultas",
            onPress: () => navigation.navigate("Home"),
          },
        ]
      );

      // Limpa formulário
      setEspecialidadeSelecionada(null);
      setMedicoSelecionado(null);
      setDataConsulta("");
      setMedicosFiltrados([]);
    } catch (erro) {
      console.error("Erro ao agendar:", erro);
      Alert.alert("Erro", "Não foi possível agendar a consulta");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Agendar Consulta</Text>
          <Text style={styles.subtitulo}>
            Escolha a especialidade, o médico e a data
          </Text>
        </View>

        <View style={styles.form}>
          {/* Especialidades */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Especialidade *</Text>
            <View style={styles.opcoesContainer}>
              {especialidades.map((esp) => (
                <TouchableOpacity
                  key={esp.id}
                  style={[
                    styles.opcaoBotao,
                    especialidadeSelecionada?.id === esp.id && styles.opcaoSelecionada,
                  ]}
                  onPress={() => selecionarEspecialidade(esp)}
                >
                  <Text
                    style={[
                      styles.opcaoTexto,
                      especialidadeSelecionada?.id === esp.id && styles.opcaoTextoSelecionado,
                    ]}
                  >
                    {esp.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Médicos (só aparece se uma especialidade foi selecionada) */}
          {especialidadeSelecionada && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Médico *</Text>
              <View style={styles.opcoesContainer}>
                {medicosFiltrados.map((med) => (
                  <TouchableOpacity
                    key={med.id}
                    style={[
                      styles.opcaoBotao,
                      medicoSelecionado?.id === med.id && styles.opcaoSelecionada,
                    ]}
                    onPress={() => setMedicoSelecionado(med)}
                  >
                    <Text
                      style={[
                        styles.opcaoTexto,
                        medicoSelecionado?.id === med.id && styles.opcaoTextoSelecionado,
                      ]}
                    >
                      {med.nome}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Data da consulta */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Data da Consulta *</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              value={dataConsulta}
              onChangeText={setDataConsulta}
              keyboardType="numeric"
              maxLength={10}
            />
            <Text style={styles.dicaTexto}>Exemplo: 15/05/2026</Text>
          </View>

          {/* Botão de agendamento */}
          <TouchableOpacity style={styles.botao} onPress={agendarConsulta}>
            <Text style={styles.botaoTexto}>Agendar Consulta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}