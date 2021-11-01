import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';

import { TodoContext } from './todoContext';
import { ScreenContext } from '../screen/screenContext';
import { todoReducer } from './todoReducer';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types';

const initialState = {
    todos: [
        { id: '1', title: 'Test todo 1' },
        { id: '2', title: 'Test todo 2' },
        { id: '3', title: 'Test todo 3' },
        { id: '4', title: 'Test todo 4' },
        { id: '5', title: 'Test todo 5' },
    ],
};

export const TodoState = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const { changeScreen } = useContext(ScreenContext);

    const addTodo = (title) => dispatch({ type: ADD_TODO, title });
    const removeTodo = (id) => {
        const todo = state.todos.find((item) => item.id === id);

        Alert.alert(
            `Removing todo`,
            `Are you sure you want to remove "${todo.title}"?`,
            [
                {
                    text: 'NO',
                    style: 'cancel',
                },
                {
                    text: 'YES',
                    onPress: () => {
                        changeScreen(null);
                        dispatch({ type: REMOVE_TODO, id });
                    },
                },
            ],
            {
                cancelable: true,
            }
        );
    };
    const updateTodo = (id, title) =>
        dispatch({ type: UPDATE_TODO, title, id });

    return (
        <TodoContext.Provider
            value={{ todos: state.todos, addTodo, removeTodo, updateTodo }}
        >
            {children}
        </TodoContext.Provider>
    );
};
