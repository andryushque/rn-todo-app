import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppCard } from '../components/ui/AppCard';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppButton } from '../components/ui/AppButton';
import { EditModal } from '../components/EditModal';
import { THEME } from '../theme';

export const TodoScreen = ({ todo, goBack, removeTodo, updateTodo }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

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
                <AppButton
                    title={'[ Edit ]'}
                    onPress={openModal}
                    style={styles.button_edit}
                    styleText={styles.button_edit_text}
                />
            </AppCard>

            <View style={styles.buttons}>
                <AppButton
                    title={'[ Go back ]'}
                    onPress={goBack}
                    style={styles.button_back}
                />
                <AppButton
                    title={'[ Remove ]'}
                    onPress={() => removeTodo(todo.id)}
                    style={styles.button_remove}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
    },
    card: {
        marginBottom: 20,
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button_back: {
        width: '32%',
        backgroundColor: THEME.COLOR.GREY,
    },
    button_remove: {
        width: '32%',
        backgroundColor: THEME.COLOR.RED,
    },
    button_edit: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: 'transparent',
    },
    button_edit_text: {
        color: THEME.COLOR.PRIMARY,
    },
});
