import React, { useState, useContext } from 'react';
import { VStack, Input, Button } from 'native-base';
import { TodosContext } from './TodosContext';
import { storeAPI } from './storeAPI';

export default function ToDoDetail({ route, navigation }) {
    const { text } = route.params;
    const { state, dispatch } = useContext(TodosContext);
    const [todoText, setTodoText] = useState(text);

    return (
        <VStack space={3} mt="5">
            <Input placeholder="Edit Todo"
                onChangeText={text => setTodoText(text)}
                value={todoText}
            />
            <Button onPress={() => {
                const act = {
                    type: 'edit',
                    payload: { ...route.params, text: todoText }
                }
                storeAPI(act);
                dispatch(act);
                navigation.navigate("ToDoList");
            }}>
                Edit
            </Button>
        </VStack>
    );
}