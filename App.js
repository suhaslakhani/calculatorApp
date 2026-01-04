import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import CalBtns from "./components/CalBtns";
import Display from "./components/Display";
import { buttonLabels } from "./Constants/buttonLabels";

const { width, height } = Dimensions.get("window");

// Calculator should not grow beyond this
const MAX_WIDTH = 420;
const CALC_HEIGHT = height * 0.8;

export default function App() {
  const [value, setValue] = useState("0");
  const [cursor, setCursor] = useState(null);
  const [previewResult, setPreviewResult] = useState(null);

  const isValidExpression = (expr) => {
    return /[0-9)]$/.test(expr); // must end with a number or )
  };

  const calculate = (expression) => {
    try {
      const operators = ["+", "-", "*", "/"];
      let tokens = [];
      let current = "";

      // Tokenize expression
      for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (char === "%") {
          // Convert last number into percentage
          const value = Number(current || tokens.pop());
          tokens.push(value / 100);
          current = "";
        } else if (operators.includes(char)) {
          tokens.push(Number(current));
          tokens.push(char);
          current = "";
        } else {
          current += char;
        }
      }

      if (current !== "") {
        tokens.push(Number(current));
      }

      // Handle * and /
      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === "*" || tokens[i] === "/") {
          const result =
            tokens[i] === "*"
              ? tokens[i - 1] * tokens[i + 1]
              : tokens[i - 1] / tokens[i + 1];

          tokens.splice(i - 1, 3, result);
          i--;
        }
      }

      // Handle + and -
      let result = tokens[0];
      for (let i = 1; i < tokens.length; i += 2) {
        result =
          tokens[i] === "+" ? result + tokens[i + 1] : result - tokens[i + 1];
      }

      return result;
    } catch {
      return "Error";
    }
  };

  const handlePress = (input) => {
    if (input === "AC") {
      setValue("0");
      setPreviewResult(null);
      return;
    }

    if (input === buttonLabels.clearEntry) {
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
    if (input === "=") {
      const result = calculate(value);
      setValue(result.toString());
      setPreviewResult(null);
      return;
    }

    setValue((prev) => {
      const nextValue = prev === "0" ? input : prev + input;

      if (isValidExpression(nextValue)) {
        const result = calculate(nextValue);
        if (result !== "Error" && result !== nextValue) {
          setPreviewResult(result.toString());
        } else {
          setPreviewResult(null);
        }
      } else {
        setPreviewResult(null);
      }

      return nextValue;
    });
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
            <Display
              value={value}
              previewResult={previewResult}
              onCursorChange={setCursor}
            />
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
