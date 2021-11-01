import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { THEME } from '../../theme';

export const AppLoader = () => {
    return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color={THEME.COLOR.PRIMARY} />
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
