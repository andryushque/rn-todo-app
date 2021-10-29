import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";

import { AppCard } from "../components/ui/AppCard";
import { EditModal } from "../components/EditModal";
import { THEME } from "../theme";

export const TodoScreen = ({ todo, goBack, removeTodo, updateTodo }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const updateHandler = (title) => {
    updateTodo(todo.id, title);
    closeModal();
  };

  return (
    <View>
      <EditModal
        visible={isModalVisible}
        closeModal={closeModal}
        updateTodo={updateHandler}
        value={todo.title}
      />

      <AppCard style={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        <TouchableOpacity onPress={openModal} activeOpacity={0.5}>
          <Text style={styles.button_edit}>[ Edit ]</Text>
        </TouchableOpacity>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            title={"[ Go back ]"}
            color={THEME.COLOR_GREY}
            onPress={goBack}
          />
        </View>
        <View style={styles.button}>
          <Button
            title={"[ Remove ]"}
            color={THEME.COLOR_RED}
            onPress={() => removeTodo(todo.id)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },

  card: {
    marginBottom: 20,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    width: "42%",
  },

  button_edit: {
    fontSize: 16,
    textTransform: "lowercase",
    color: THEME.COLOR_PRIMARY,
  },
});
