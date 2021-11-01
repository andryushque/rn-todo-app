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
import { Http } from '../../http';

const initialState = {
    todos: [],
    loading: true,
    error: null,
};

export const TodoState = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const { changeScreen } = useContext(ScreenContext);
    const errorText = '[ Something went wrong... ]';

    const fetchTodos = async () => {
        showLoader();
        clearError();

        const url = `${DB_URL}/todos.json`;

        try {
            const data = await Http.get(url);
            const todos = data
                ? Object.keys(data).map((key) => ({
                      ...data[key],
                      id: key,
                  }))
                : [];

            if (todos.length) dispatch({ type: FETCH_TODOS, todos });
        } catch (e) {
            showError(errorText);
            console.log(e);
        } finally {
            hideLoader();
        }
    };

    const addTodo = async (title) => {
        clearError();
        const url = `${DB_URL}/todos.json`;

        try {
            const data = await Http.post(url, { title });
            dispatch({ type: ADD_TODO, id: data.name, title });
        } catch (e) {
            showError(errorText);
        }
    };

    const removeTodo = (id) => {
        clearError();
        const todo = state.todos.find((item) => item.id === id);

        const removeHandler = async () => {
            const url = `${DB_URL}/todos/${id}.json`;

            try {
                const data = await Http.delete(url);
                changeScreen(null);
                dispatch({ type: REMOVE_TODO, id });
            } catch (e) {
                showError(errorText);
            }
        };

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
                    onPress: removeHandler,
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    const updateTodo = async (id, title) => {
        clearError();
        const url = `${DB_URL}/todos/${id}.json`;

        try {
            const data = await Http.patch(url, { title });
            dispatch({ type: UPDATE_TODO, title, id });
        } catch (e) {
            showError(errorText);
        }
    };

    const showLoader = () => dispatch({ type: SHOW_LOADER });
    const hideLoader = () => dispatch({ type: HIDE_LOADER });
    const showError = (error) => dispatch({ type: SHOW_ERROR, error });
    const clearError = () => dispatch({ type: CLEAR_ERROR });

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
