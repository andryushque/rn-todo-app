import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native';

import { AddTodo } from '../components/AddTodo';
import { TodoItem } from '../components/TodoItem';
import { AppLoader } from '../components/ui/AppLoader';
import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';

import { THEME } from '../theme';

import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';

export const MainScreen = () => {
    // == state
    const initialState =
        Dimensions.get('window').width - THEME.PADDING.DEFAULT * 2;
    const [deviceWidth, setDeviceWidth] = useState(initialState);
    const { todos, loading, error, fetchTodos, addTodo, removeTodo } =
        useContext(TodoContext);
    const { changeScreen } = useContext(ScreenContext);

    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);
    useEffect(() => {
        loadTodos();
    }, []);

    useEffect(() => {
        const update = () => {
            const width =
                Dimensions.get('window').width - THEME.PADDING.DEFAULT * 2;
            setDeviceWidth(width);
        };

        const subscription = Dimensions.addEventListener('change', update);
        return () => subscription?.remove();
    });

    // == content
    const emptyContent = (
        <View style={styles.img_wrapper}>
            <Image
                style={styles.img}
                // source={require("../../assets/no-items.jpg")}
                source={require('../../assets/no-items.png')}
            />
        </View>
    );

    if (loading) return <AppLoader />;
    if (error)
        return (
            <View style={styles.center}>
                <AppText style={styles.error}>{error}</AppText>
                <AppButton onPress={loadTodos} color={THEME.COLOR.RED}>
                    [ Try again ]
                </AppButton>
            </View>
        );

    return (
        <View>
            <AddTodo onSubmit={addTodo} />

            <View style={{ width: deviceWidth }}>
                <FlatList
                    data={todos}
                    renderItem={({ item }) => (
                        <TodoItem
                            todo={item}
                            removeTodo={removeTodo}
                            changeScreen={changeScreen}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={() => emptyContent}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    img_wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 250,
    },

    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        marginBottom: 15,
        fontSize: 20,
        color: THEME.COLOR.RED,
        textTransform: 'lowercase',
    },
});
