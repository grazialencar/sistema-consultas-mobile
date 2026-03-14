import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2b2828",
    marginBottom: 8,
    textAlign: "center"
  },
  subtitulo: {
    fontSize: 18,
    color: "#0b8185",
    opacity: 0.9,
    textAlign: "center",
    marginBottom: 16,
  },
  rodape: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
  },
  rodapeTexto: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    lineHeight: 18,
  },
});