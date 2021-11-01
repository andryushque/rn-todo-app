import React, { useState } from 'react';
import {
    StyleSheet,
    Modal,
    View,
    TextInput,
    Alert,
    Keyboard,
} from 'react-native';
import { AppButton } from './ui/AppButton';
import { THEME } from '../theme';

export const EditModal = ({ visible, closeModal, value, updateTodo }) => {
    const [newValue, setNewValue] = useState(value);

    const updateHandler = () => {
        if (newValue.trim().length < 3) {
            Alert.alert(
                'Error!',
                `Min length is 3, current length is ${newValue.trim().length}`
            );
        } else {
            Keyboard.dismiss();
            updateTodo(newValue);
            setTimeout(() => {
                closeModal();
            }, 250);
        }
    };

    const cancelHandler = () => {
        Keyboard.dismiss();
        setNewValue(value);
        setTimeout(() => {
            closeModal();
        }, 250);
    };

    return (
        <Modal visible={visible} animationType={'slide'} transparent={false}>
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    onChangeText={setNewValue}
                    value={newValue}
                    placeholder={'Edit todo...'}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    maxLength={69}
                />

                <View style={styles.buttons}>
                    <AppButton onPress={cancelHandler} color={THEME.COLOR.RED}>
                        [ Cancel ]
                    </AppButton>
                    <AppButton onPress={updateHandler}>[ Save ]</AppButton>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    input: {
        width: '80%',
        marginBottom: 20,
        padding: 5,

        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.COLOR.PRIMARY,

        fontFamily: THEME.FONT.PRIMARY.REGULAR,
        fontSize: 16,
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
});
