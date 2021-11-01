import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from './ui/AppText';
import { THEME } from '../theme';

export const Navbar = ({ title }) => {
    return (
        <View style={styles.navbar}>
            <AppText style={styles.text}>{title}</AppText>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 80,
        backgroundColor: THEME.COLOR.PRIMARY,
    },

    text: {
        paddingBottom: 10,
        fontSize: 18,
        color: THEME.COLOR.WHITE,
    },
});
