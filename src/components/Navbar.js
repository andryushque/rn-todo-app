import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { AppText } from './ui/AppText';
import { THEME } from '../theme';

export const Navbar = ({ title }) => {
    const stylesNavbarOS = Platform.select({
        ios: styles.navbarIos,
        android: styles.navbarAndroid,
    });

    return (
        <View style={[styles.navbar, stylesNavbarOS]}>
            <AppText style={styles.text}>{title}</AppText>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 80,
    },
    navbarAndroid: {
        backgroundColor: THEME.COLOR.PRIMARY,
    },
    navbarIos: {
        borderBottomWidth: 1,
        borderBottomColor: THEME.COLOR.PRIMARY,
    },

    text: {
        paddingBottom: THEME.PADDING.DEFAULT,
        fontSize: 18,
        color:
            Platform.OS === 'android' ? THEME.COLOR.WHITE : THEME.COLOR.PRIMARY,
    },
});
