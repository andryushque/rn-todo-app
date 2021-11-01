import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { Navbar } from './components/Navbar';
import { THEME } from './theme';

import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {
    const { todoId } = useContext(ScreenContext);
    const appTitle = '[ TODO APP ]';

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Navbar title={appTitle} />

            <View style={styles.wrapper}>
                {todoId ? <TodoScreen /> : <MainScreen />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR.WHITE,
    },
    wrapper: {
        flex: 1,
        padding: THEME.PADDING.DEFAULT,
    },
});
