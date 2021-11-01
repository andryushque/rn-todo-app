import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

const App = () => {
    const [todoId, setTodoId] = useState(null);
    const [todos, setTodos] = useState([
        { id: '1', title: 'Test todo 1' },
        { id: '2', title: 'Test todo 2' },
        { id: '3', title: 'Test todo 3' },
        { id: '4', title: 'Test todo 4' },
        { id: '5', title: 'Test todo 5' },
    ]);

    const goBack = () => {
        setTodoId(null);
    };

    const addTodo = (title) => {
        const newTodo = {
            id: Date.now().toString(),
            title,
        };

        setTodos((prevTodos) => [newTodo, ...prevTodos]);
    };

    const removeTodo = (id) => {
        const todo = todos.find((todoItem) => todoItem.id === id);

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
                        setTodoId(null);
                        setTodos((prevTodos) =>
                            prevTodos.filter((todo) => todo.id !== id)
                        );
                    },
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    const updateTodo = (id, newTitle) => {
        setTodos((prev) =>
            prev.map((todo) => {
                if (todo.id === id) {
                    todo.title = newTitle;
                }
                return todo;
            })
        );
    };

    let [fontsLoaded] = useFonts({
        'roboto-regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
        'ubuntu-regular': require('./assets/fonts/Ubuntu/Ubuntu-Regular.ttf'),
        'ubuntu-bold': require('./assets/fonts/Ubuntu/Ubuntu-Bold.ttf'),
    });

    let content = (
        <MainScreen
            todos={todos}
            addTodo={addTodo}
            removeTodo={removeTodo}
            openTodo={setTodoId}
        />
    );

    if (todoId) {
        const selectedTodo = todos.find((todo) => todo.id === todoId);
        content = (
            <TodoScreen
                goBack={goBack}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
                todo={selectedTodo}
            />
        );
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <StatusBar style="light" />
                <Navbar title="[ TODO APP ]" />

                <View style={styles.wrapper}>{content}</View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    wrapper: {
        flex: 1,
        padding: 10,
    },
});

export default App;
