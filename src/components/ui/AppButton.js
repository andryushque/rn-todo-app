import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from './AppText';
import { THEME } from '../../theme';

export const AppButton = (props) => {
    return (
        <TouchableOpacity
            style={{ ...styles.default, ...props.style }}
            activeOpacity={0.8}
            onPress={props.onPress}
        >
            <AppText style={{ ...styles.defaultText, ...props.styleText }}>
                {props.title}
            </AppText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    default: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        backgroundColor: THEME.COLOR.PRIMARY,
    },

    defaultText: {
        fontFamily: THEME.FONT.PRIMARY.REGULAR,
        fontSize: 16,
        textTransform: 'lowercase',
        textAlign: 'center',
        color: THEME.COLOR.WHITE,
    },
});
