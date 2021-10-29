import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { THEME } from "../theme";

export const TodoItem = ({ todo, onRemove, onOpen }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onOpen(todo.id)}
      onLongPress={onRemove.bind(null, todo.id)}
    >
      <View style={styles.todo}>
        <Text style={styles.text}>{todo.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: THEME.COLOR_LIGHTGRAY,
    borderRadius: 5,
  },

  text: {
    fontSize: 15,
    color: THEME.COLOR_BLACK,
  },
});
