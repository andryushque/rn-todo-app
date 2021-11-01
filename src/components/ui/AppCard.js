import React from 'react';
import { StyleSheet, View } from 'react-native';
import { THEME } from '../../theme';

export const AppCard = (props) => {
    return <View style={[styles.default, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
    default: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingVertical: THEME.PADDING.DEFAULT,
        paddingHorizontal: THEME.PADDING.DEFAULT * 0.5,
        borderRadius: 5,
        backgroundColor: THEME.COLOR.WHITE,

        shadowColor: THEME.COLOR.BLACK,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        elevation: 8,
    },
});
