import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import CalBtns from "./components/CalBtns";
import Display from "./components/Display";

export default function App() {
  const [value, setValue] = useState("0");

  const handlePress = (input) => {
    if (input === "AC") {
      setValue("0");
      return;
    }

    if (input === "C") {
      setValue((prev) => prev.slice(0, -1) || "0");
      return;
    }

    if (input === "=") {
      try {
        setValue(String(eval(value)));
      } catch {
        setValue("Error");
      }
      return;
    }

    setValue((prev) =>
      prev === "0" ? input : prev + input
    );
  };

  return (
    <View style={styles.container}>
      <Display value={value} />
      <CalBtns onPress={handlePress} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
