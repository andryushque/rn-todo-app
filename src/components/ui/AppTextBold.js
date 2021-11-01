import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { THEME } from '../../theme';

export const AppTextBold = (props) => {
    return (
        <Text style={{ ...styles.default, ...props.style }}>
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    default: {
        fontFamily: THEME.FONT.PRIMARY.BOLD,
    },
});
