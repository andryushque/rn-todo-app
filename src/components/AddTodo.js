import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import { THEME } from "../theme";

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const pressHandler = () => {
    if (value.trim().length < 3) {
      Alert.alert(
        "Error!",
        `Min length is 3, current length is ${value.trim().length}`
      );
    } else {
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder={"Add todo..."}
        autoCorrect={false}
        autoCapitalize={"none"}
        maxLength={69}
      />
      <Button
        title="[ Add ]"
        color={THEME.COLOR_PRIMARY}
        onPress={pressHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  input: {
    width: "69%",
    padding: 5,
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: THEME.COLOR_PRIMARY,
    fontSize: 16,
  },
});
