import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

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

                <AppButton color={THEME.COLOR.TRANSPARENT} onPress={openModal}>
                    <Feather
                        name="edit-3"
                        size={20}
                        color={THEME.COLOR.BLACK}
                    />
                </AppButton>
            </AppCard>

            <View style={styles.buttons}>
                <AppButton onPress={goBack} color={THEME.COLOR.GREY}>
                    [ Go back ]
                </AppButton>
                <AppButton
                    onPress={() => removeTodo(todo.id)}
                    color={THEME.COLOR.RED}
                >
                    [ Remove ]
                </AppButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        paddingLeft: 10,
        fontSize: 16,
    },
    card: {
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
