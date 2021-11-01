import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    View,
    Platform,
} from 'react-native';
import { AppText } from './AppText';
import { THEME } from '../../theme';

export const AppButton = ({
    children,
    onPress,
    color = THEME.COLOR.PRIMARY,
}) => {
    const AppButtonWrapper =
        Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <AppButtonWrapper activeOpacity={0.8} onPress={onPress}>
            <View style={{ ...styles.button, backgroundColor: color }}>
                <AppText style={styles.text}>{children}</AppText>
            </View>
        </AppButtonWrapper>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },

    text: {
        fontSize: 16,
        textTransform: 'lowercase',
        textAlign: 'center',
        color: THEME.COLOR.WHITE,
    },
});
