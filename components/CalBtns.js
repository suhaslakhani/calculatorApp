import { View } from "react-native";
import CustomButtons from "./CustomButtons";

const CalBtns = ({ onPress }) => {
  const rows = [
    ["AC", "%", "C", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["00", "0", ".", "="],
  ];

  return (
    <View>
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={{ flexDirection: "row", gap: 20, justifyContent: "center", marginBottom: 10 }}
        >
          {row.map((item) => (
            <CustomButtons
              key={item}
              title={item}
              onPress={() => onPress(item)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default CalBtns;
