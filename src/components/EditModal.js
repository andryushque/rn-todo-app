import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { THEME } from "../theme";

export const EditModal = ({ visible, closeModal, value, updateTodo }) => {
  const [newValue, setNewValue] = useState(value);

  const onUpdate = () => {
    if (newValue.trim().length < 3) {
      Alert.alert(
        "Error!",
        `Min length is 3, current length is ${newValue.trim().length}`
      );
    } else {
      updateTodo(newValue);
    }
  };

  const onCancel = () => {
    setNewValue(value);
    closeModal();
  };

  return (
    <Modal visible={visible} animationType={"slide"} transparent={false}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          onChangeText={setNewValue}
          value={newValue}
          placeholder={"Edit todo..."}
          autoCorrect={false}
          autoCapitalize={"none"}
          maxLength={69}
        />

        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              title={"[ Cancel ]"}
              color={THEME.COLOR_RED}
              onPress={onCancel}
            />
          </View>
          <View style={styles.button}>
            <Button
              title={"[ Save ]"}
              color={THEME.COLOR_PRIMARY}
              onPress={onUpdate}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    width: "80%",
    marginBottom: 20,
    padding: 5,

    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: THEME.COLOR_PRIMARY,

    fontSize: 16,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  button: {
    width: "42%",
  },
});
