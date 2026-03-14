import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  statusBadge: {
    backgroundColor: "#0b8185",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 20,
  },

  statusConfirmada: {
    backgroundColor: "#4CAF50",
  },

  statusCancelada: {
    backgroundColor: "#983028",
  },

  statusTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  secao: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },

  secaoConsulta: {
    backgroundColor: "#0b81853a",
    marginBottom: 15,
    borderRadius: 8,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },

  label: {
    fontSize: 18,
    color: "#333",
    marginBottom: 4,
    fontWeight: "bold",
  },

  valor: {
    fontSize: 18,
    color: "#333",
    marginBottom: 4,
  },

  nomeMedico: {
    fontSize: 18,
    color: "#333",
    marginBottom: 4,
    fontWeight: "bold",
  },

  info: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },

  observacoes: {
    fontSize: 14,
    color: "#555",
    fontStyle: "italic",
    marginTop: 8,
  },

  acoes: {
    marginTop: 10,
  },

  botaoContainer: {
    marginBottom: 12,
  },

  mensagem: {
    backgroundColor: "#E8F5E9",
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#216523",
  },

  mensagemCancelada: {
    backgroundColor: "#FFEBEE",
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#802620",
  },

  mensagemTexto: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
  },
});