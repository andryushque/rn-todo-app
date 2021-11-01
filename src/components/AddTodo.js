import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, Keyboard } from 'react-native';
import { AppButton } from './ui/AppButton';

import { Feather } from '@expo/vector-icons';
import { THEME } from '../theme';

export const AddTodo = ({ onSubmit }) => {
    const [value, setValue] = useState('');

    const pressHandler = () => {
        if (value.trim().length < 3) {
            Alert.alert(
                'Error!',
                `Min length is 3, current length is ${value.trim().length}`
            );
        } else {
            onSubmit(value);
            setValue('');
            Keyboard.dismiss();
        }
    };

    return (
        <View style={styles.block}>
            <TextInput
                style={styles.input}
                onChangeText={setValue}
                value={value}
                placeholder={'Add todo...'}
                autoCorrect={false}
                autoCapitalize={'none'}
                maxLength={69}
            />

            <AppButton onPress={pressHandler} color={THEME.COLOR.PRIMARY}>
                <Feather name="plus" size={22} color={THEME.COLOR.WHITE} />
            </AppButton>
        </View>
    );
};

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },

    input: {
        width: '75%',
        padding: 5,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.COLOR.PRIMARY,

        fontFamily: THEME.FONT.PRIMARY.REGULAR,
        fontSize: 16,
    },
});
