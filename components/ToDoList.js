import React, { useContext, useEffect, useState } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import { VStack, Heading, Text, Box, Icon, Pressable, HStack, Input, Button } from 'native-base';
import { TodosContext } from './TodosContext';
import { storeAPI } from './storeAPI';
import ToggleDarkMode from './ToggleDarkMode';
import { AntDesign } from '@expo/vector-icons';
import uuid from 'uuid-random';

export default function ToDoList({ navigation }) {
    // receive state and dispatch from App.js
    const { state, dispatch } = useContext(TodosContext);
    const [todoText, setTodoText] = useState("");

    const renderItem = ({ item, index }) => (
        <Box h={50} w="100%" borderBottomWidth={1} px={3}
            bg="warmGray.200" _dark={{ bg: "coolGray.600" }}
            alignItems="flex-start" justifyContent="center">
            <Text fontSize="md">{item.text}</Text>
        </Box>
    );

    const renderHiddenItem = (data, rowMap) => (
        <HStack flex={1} bg="coolGray.800" alignItems={"center"} justifyContent="flex-end">
            <Pressable w={50} h="100%" bg="green.800"
                alignItems="center" justifyContent="center"
                onPress={() => editRow(rowMap, data.item)}
                _pressed={{ opacity: 0.5 }}
            >
                <Icon as={<AntDesign name="edit" />} size="2xl" color="white" />
            </Pressable>
            <Pressable w={50} h="100%" bg="red.800"
                alignItems="center" justifyContent="center"
                onPress={() => deleteRow(rowMap, data.item)}
                _pressed={{ opacity: 0.5 }}
            >
                <Icon as={<AntDesign name="delete" />} color="white" size="2xl" />
            </Pressable>
        </HStack>
    );

    const closeRow = (rowMap, rowKey) => {
        console.log(`closing ${rowKey}`);
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, item) => {
        closeRow(rowMap, item.id);
        const act = {
            type: 'delete',
            payload: item
        };
        storeAPI(act);
        dispatch(act);
    };

    const editRow = (rowMap, todo) => {
        if (rowMap[todo.id]) {
            rowMap[todo.id].closeRow();
        }
        navigation.navigate("ToDoDetail", todo);
    };

    const handleSubmit = () => {
        const newToDo = { id: uuid(), text: todoText };
        console.log(`create todo ${newToDo.id}`);
        const act = {
            type: 'add',
            payload: newToDo
        };
        storeAPI(act);
        dispatch(act);
        setTodoText("");
    }

    return (
        <VStack
            flex={1} _dark={{ bg: "blueGray.900" }} _light={{ bg: "blueGray.50" }}
            px={4} pb={5} space={3} alignItems="center" justifyContent="space-between">
            <Box h="90%" _dark={{ bg: 'coolGray.800' }} _light={{ bg: 'white' }}>
                <Heading p={4} pb={3} size="lg" textAlign="center">
                    To Do List ({state.todos.length} tasks)
                </Heading>
                <HStack p={2} space={2} justifyContent="space-between">
                    <Input placeholder="Enter Todo"
                        onChangeText={text => setTodoText(text)}
                        value={todoText}
                        variant="outline" width="75%" borderRadius="10" py="1" px="2" />
                    <Button onPress={handleSubmit}>
                        Add
                    </Button>
                </HStack>
                <SwipeListView
                    data={state.todos}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-100}
                />
            </Box>
            <ToggleDarkMode />
        </VStack>
    );
}