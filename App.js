import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { MainLayout } from './src/MainLayout';
import { TodoState } from './src/context/todo/TodoState';
import { ScreenState } from './src/context/screen/ScreenState';

const App = () => {
    let [fontsLoaded] = useFonts({
        'roboto-regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
        'ubuntu-regular': require('./assets/fonts/Ubuntu/Ubuntu-Regular.ttf'),
        'ubuntu-bold': require('./assets/fonts/Ubuntu/Ubuntu-Bold.ttf'),
    });

    const content = !fontsLoaded ? (
        <AppLoading />
    ) : (
        <ScreenState>
            <TodoState>
                <MainLayout />
            </TodoState>
        </ScreenState>
    );

    return content;
};

export default App;
