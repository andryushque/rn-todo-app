import React from "react";
import { StyleSheet, View, FlatList, Text, Image } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { TodoItem } from "../components/TodoItem";

export const MainScreen = ({ todos, addTodo, removeTodo, openTodo }) => {
  const emptyContent = (
    <View style={styles.img_wrapper}>
      <Image
        style={styles.img}
        // source={require("../../assets/no-items.jpg")}
        source={require("../../assets/no-items.png")}
      />
    </View>
  );

  return (
    <View>
      <AddTodo onSubmit={addTodo} />

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem todo={item} onRemove={removeTodo} onOpen={openTodo} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => emptyContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  img_wrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
  },

  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
