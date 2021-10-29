import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { THEME } from "../theme";

export const Navbar = ({ title }) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: 80,
    backgroundColor: THEME.COLOR_PRIMARY,
  },

  text: {
    paddingBottom: 10,
    fontSize: 18,
    color: THEME.COLOR_WHITE,
  },
});
