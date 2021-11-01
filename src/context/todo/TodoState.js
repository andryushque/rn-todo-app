import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';

import { TodoContext } from './todoContext';
import { ScreenContext } from '../screen/screenContext';
import { todoReducer } from './todoReducer';
import {
    ADD_TODO,
    REMOVE_TODO,
    UPDATE_TODO,
    SHOW_LOADER,
    HIDE_LOADER,
    SHOW_ERROR,
    CLEAR_ERROR,
    FETCH_TODOS,
} from '../types';

import { DB_URL } from '@env';

const initialState = {
    todos: [],
    loading: false,
    error: null,
};

export const TodoState = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const { changeScreen } = useContext(ScreenContext);

    const fetchTodos = async () => {
        const response = await fetch(`${DB_URL}/todos.json`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        const todos = Object.keys(data).map((key) => ({
            ...data[key],
            id: key,
        }));

        // console.log('[DATA]:', todos);
        dispatch({ type: FETCH_TODOS, todos });
    };

    const addTodo = async (title) => {
        const response = await fetch(`${DB_URL}/todos.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title }),
        });
        const data = await response.json();
        console.log('[TODO ID]:', data.name);

        dispatch({ type: ADD_TODO, id: data.name, title });
    };
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

    const showLoader = () => dispatch({ type: SHOW_LOADER });
    const hideLoader = () => dispatch({ type: HIDE_LOADER });
    const showError = (error) => dispatch({ type: SHOW_ERROR, error });
    const clearLoader = () => dispatch({ type: CLEAR_ERROR });

    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                loading: state.loading,
                error: state.error,
                fetchTodos,
                addTodo,
                removeTodo,
                updateTodo,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};
