import { View, StyleSheet, TextInput } from "react-native";
import { useState, useEffect, useRef } from "react";

const Display = ({ value, onCursorChange }) => {
  const prevValueRef = useRef(value);
  const prevSelectionRef = useRef({ start: value.length, end: value.length });
  const userSelectionRef = useRef(false);

  const [selection, setSelection] = useState({
    start: value.length,
    end: value.length,
  });

  useEffect(() => {
    const prevValue = prevValueRef.current;
    const prevSelection = prevSelectionRef.current;

    // ✅ USER DELETION
    if (userSelectionRef.current && value.length < prevValue.length) {
      const deletedCount = prevValue.length - value.length;

      const newCursor = Math.max(prevSelection.start - deletedCount, 0);

      setSelection({ start: newCursor, end: newCursor });
    }

    // ✅ EXTERNAL CHANGE (button press, =, reset)
    if (!userSelectionRef.current) {
      setSelection({
        start: value.length,
        end: value.length,
      });
    }

    prevValueRef.current = value;
    userSelectionRef.current = false;
  }, [value]);

  const getFontSize = (val) => {
    if (val.length > 20) return 24;
    if (val.length > 14) return 32;
    return 48;
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        // editable={false}          // ⛔ keyboard disabled
        caretHidden={false} // ✅ cursor visible
        showSoftInputOnFocus={false}
        numberOfLines={1}
        selection={selection}
        onSelectionChange={(e) => {
          userSelectionRef.current = true;
          prevSelectionRef.current = e.nativeEvent.selection;
          const sel = e.nativeEvent.selection;
          setSelection(sel);
          onCursorChange?.(sel); // send cursor to parent
        }}
        style={[styles.text, { fontSize: getFontSize(value) }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "flex-end",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Display;
