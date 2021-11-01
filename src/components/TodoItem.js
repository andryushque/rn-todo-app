import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AppTextBold } from './ui/AppTextBold';
import { THEME } from '../theme';

export const TodoItem = ({ todo, onRemove, onOpen }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onOpen(todo.id)}
            onLongPress={onRemove.bind(null, todo.id)}
        >
            <View style={styles.todo}>
                <AppTextBold style={styles.text}>{todo.title}</AppTextBold>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: THEME.PADDING.DEFAULT,
        borderWidth: 1,
        borderColor: THEME.COLOR.LIGHTGRAY,
        borderRadius: 5,
    },

    text: {
        fontSize: 15,
        color: THEME.COLOR.BLACK,
    },
});
