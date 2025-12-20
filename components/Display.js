import { View, Text, StyleSheet } from "react-native";

const Display = ({ value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    alignItems: "flex-end",
  },
  text: {
    fontSize: 48,
    fontWeight: "bold",
  },
});

export default Display;
