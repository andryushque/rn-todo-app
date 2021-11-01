import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native';
import { AddTodo } from '../components/AddTodo';
import { TodoItem } from '../components/TodoItem';
import { THEME } from '../theme';

export const MainScreen = ({ todos, addTodo, removeTodo, openTodo }) => {
    const [deviceWidth, setDeviceWidth] = useState(
        Dimensions.get('window').width - THEME.PADDING.DEFAULT * 2
    );

    useEffect(() => {
        const update = () => {
            const width =
                Dimensions.get('window').width - THEME.PADDING.DEFAULT * 2;
            setDeviceWidth(width);
        };

        const subscription = Dimensions.addEventListener('change', update);
        return () => subscription?.remove();
    });

    const emptyContent = (
        <View style={styles.img_wrapper}>
            <Image
                style={styles.img}
                // source={require("../../assets/no-items.jpg")}
                source={require('../../assets/no-items.png')}
            />
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
                            onRemove={removeTodo}
                            onOpen={openTodo}
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
});
