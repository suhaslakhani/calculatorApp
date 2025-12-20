import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButtons = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default CustomButtons;
