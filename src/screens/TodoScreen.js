import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { AppCard } from '../components/ui/AppCard';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppButton } from '../components/ui/AppButton';
import { EditModal } from '../components/EditModal';

import { Feather } from '@expo/vector-icons';
import { THEME } from '../theme';

export const TodoScreen = ({ todo, goBack, removeTodo, updateTodo }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const onRemove = () => removeTodo(todo.id);

    const updateHandler = (title) => {
        updateTodo(todo.id, title);
        closeModal();
    };

    return (
        <View>
            <EditModal
                visible={isModalVisible}
                closeModal={closeModal}
                updateTodo={updateHandler}
                value={todo.title}
            />

            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>

                <AppButton onPress={openModal} color={THEME.COLOR.TRANSPARENT}>
                    <Feather
                        name="edit-3"
                        size={20}
                        color={THEME.COLOR.BLACK}
                    />
                </AppButton>
            </AppCard>

            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton onPress={goBack} color={THEME.COLOR.GREY}>
                        [ Go back ]
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton onPress={onRemove} color={THEME.COLOR.RED}>
                        [ Remove ]
                    </AppButton>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        paddingLeft: THEME.PADDING.DEFAULT,
        fontSize: 16,
    },
    card: {
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: Dimensions.get('window').width / 2.5,
    },
});
