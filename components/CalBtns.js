import { View } from "react-native";
import CustomButtons from "./CustomButtons";
import { buttons } from "../Constants/buttons";

const CalBtns = ({ onPress }) => {
  return (
    <View>
      {Array.from({ length: Math.ceil(buttons.length / 4) }).map(
        (_, rowIndex) => (
          <View
            key={rowIndex}
            style={{
              flexDirection: "row",
              gap: 20,
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            {buttons
              .slice(rowIndex * 4, rowIndex * 4 + 4)
              .map((btn) => (
                <CustomButtons
                  key={btn.title}
                  title={btn.title}
                  onPress={() => onPress(btn.title)}
                />
              ))}
          </View>
        )
      )}
    </View>
  );
};

export default CalBtns;

