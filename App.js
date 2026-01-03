import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import CalBtns from "./components/CalBtns";
import Display from "./components/Display";

const { width, height } = Dimensions.get("window");

// Calculator should not grow beyond this
const MAX_WIDTH = 420;
const CALC_HEIGHT = height * 0.8;

export default function App() {
  const [value, setValue] = useState("0");
  const [cursor, setCursor] = useState(null);

  const calculate = (expression) => {
    try {
      const operators = ["+", "-", "*", "/"];
      let numbers = [];
      let current = "";

      for (let char of expression) {
        if (operators.includes(char)) {
          numbers.push(Number(current));
          numbers.push(char);
          current = "";
        } else {
          current += char;
        }
      }
      numbers.push(Number(current));

      for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === "*" || numbers[i] === "/") {
          const result =
            numbers[i] === "*"
              ? numbers[i - 1] * numbers[i + 1]
              : numbers[i - 1] / numbers[i + 1];

          numbers.splice(i - 1, 3, result);
          i--;
        }
      }

      let result = numbers[0];
      for (let i = 1; i < numbers.length; i += 2) {
        result =
          numbers[i] === "+"
            ? result + numbers[i + 1]
            : result - numbers[i + 1];
      }

      return result;
    } catch {
      return "Error";
    }
  };

  const handlePress = (input) => {
    if (input === "AC") return setValue("0");
    if (input === "C") {
      setValue((prev) => {
        if (!cursor || cursor.start === prev.length) {
          // cut from end
          return prev.slice(0, -1) || "0";
        }
        console.log("cursor:", cursor);

        // cut from cursor position
        return (
          prev.slice(0, cursor.start - 1) + prev.slice(cursor.start) || "0"
        );
      });
      return;
    }
    if (input === "=") return setValue(calculate(value).toString());

    setValue((prev) => (prev === "0" ? input : prev + input));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <View style={styles.screen}>
        <View
          style={[
            styles.calculator,
            {
              width: Math.min(width * 0.95, MAX_WIDTH),
              height: CALC_HEIGHT,
            },
          ]}
        >
          <View style={styles.displayContainer}>
            <Display value={value} onCursorChange={setCursor} />
          </View>

          <View style={styles.buttonsContainer}>
            <CalBtns onPress={handlePress} />
          </View>
        </View>

        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2c2c2c",
  },
  screen: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center", // center on tablets
    paddingBottom: 20,
  },
  calculator: {
    borderRadius: 20,
    overflow: "hidden",
  },
  displayContainer: {
    flex: 3,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
  },
  buttonsContainer: {
    flex: 5,
    padding: 8,
  },
});
