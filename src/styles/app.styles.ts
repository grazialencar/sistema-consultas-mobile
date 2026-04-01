import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F171F", // Cor de fundo mais escura como no exemplo
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 16,
    color: "#9EADBA",
    opacity: 0.9,
    textAlign: "center",
    marginBottom: 16,
  },
  icone: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2C88D9",
    marginBottom: 16,
    textAlign: "center",
  },
  rodape: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
  },
  rodapeTexto: {
    fontSize: 12,
    color: "#9EADBA",
    textAlign: "center",
    lineHeight: 18,
  },
  // Formulário
  form: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  inputDesabilitado: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#9EADBA",
  },
  // Botões
  botao: {
    backgroundColor: "#2C88D9",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  botaoDesabilitado: {
    backgroundColor: "rgba(44, 136, 217, 0.5)",
  },
  botaoTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  botaoVoltar: {
    marginTop: 15,
    padding: 12,
    alignItems: "center",
  },
  botaoVoltarTexto: {
    color: "#9EADBA",
    fontSize: 14,
  },
  botaoCadastro: {
    padding: 8,
  },
  botaoCadastroTexto: {
    color: "#2C88D9",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  // Opções (especialidades, médicos)
  opcoesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  opcaoBotao: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  opcaoSelecionada: {
    backgroundColor: "#2C88D9",
    borderColor: "#2C88D9",
  },
  opcaoTexto: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  opcaoTextoSelecionado: {
    fontWeight: "bold",
  },
  // Mensagens de erro e info
  erroContainer: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "rgba(211, 69, 91, 0.1)",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(211, 69, 91, 0.3)",
  },
  erroTexto: {
    color: "#D3455B",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  infoContainer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "rgba(44, 136, 217, 0.1)",
    borderRadius: 8,
  },
  infoTexto: {
    color: "#9EADBA",
    fontSize: 12,
    textAlign: "center",
  },
  dicaTexto: {
    color: "#9EADBA",
    fontSize: 12,
    marginTop: 5,
  },
  // Cards de consulta (para Home)
  card: {
    backgroundColor: "#293845",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  cardInfo: {
    fontSize: 14,
    color: "#9EADBA",
    marginBottom: 4,
  },
  cardStatus: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  statusAgendada: {
    color: "#FFA500",
  },
  statusConfirmada: {
    color: "#4CAF50",
  },
  statusCancelada: {
    color: "#D3455B",
  },
  cardBotoes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  botaoConfirmar: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  botaoCancelar: {
    backgroundColor: "rgba(211, 69, 91, 0.8)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  botaoTextoPequeno: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  // Estado vazio
  emptyContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 15,
  },
  emptyTitulo: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtitulo: {
    color: "#9EADBA",
    fontSize: 14,
    textAlign: "center",
  },
});