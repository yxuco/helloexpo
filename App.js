import React, { useEffect, useReducer } from "react";
import {
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box
} from "native-base";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import NativeBaseIcon from "./components/NativeBaseIcon";
import ProductList from "./components/ProductList";
import LoginForm from "./components/LoginForm";
import GitHub from "./components/GitHub";
import ToDoList from "./components/ToDoList";
import ToDoDetail from "./components/ToDoDetail";
import { TodosContext } from "./components/TodosContext";
import { getTodos } from "./components/storeAPI";
import ToggleDarkMode from "./components/ToggleDarkMode";
import { Platform } from "react-native";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: true }}>
          <Tab.Screen name="ToDos" component={ToDoScreen}
            options={{
              tabBarIcon: ({ color, size }) => (<Feather name="list" color={color} size={size} />),
            }} />
          <Tab.Screen name="Products" component={ProductScreen}
            options={{
              tabBarIcon: ({ color, size }) => (<FontAwesome name="file-picture-o" color={color} size={size} />),
            }} />
          <Tab.Screen name="Users" component={UserScreen}
            options={{
              tabBarIcon: ({ color, size }) => (<Feather name="users" color={color} size={size} />),
            }} />
          <Tab.Screen name="Login" component={LoginScreen}
            options={{
              tabBarIcon: ({ color, size }) => (<AntDesign name="login" color={color} size={size} />),
            }} />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const ToDoStack = createStackNavigator();

function ToDoScreen() {
  // use Redux to manage app state
  // initial app state used by useReducer hook
  const todosInitialState = {
    todos: []
  }

  // actions for updating app state used by useReducer hook
  function todosReducer(state, action) {
    switch (action.type) {
      case 'get':
        // initialize state to data loaded from persistent store
        console.log(`receive state update of ${action.payload.length} items`);
        return { ...state, todos: action.payload }  
      case 'delete':
        const filteredState = state.todos.filter(item => item.id !== action.payload.id);
        return {
          ...state,
          todos: filteredState
        }
      case 'add':
        const addedTodos = [...state.todos, action.payload];
        return {
          ...state,
          todos: addedTodos
        }
      case 'edit':
        const updatedToDo = { ...action.payload };
        const updatedToDoIndex = state.todos.findIndex(t => t.id === action.payload.id);
        const updatedToDos = [
          ...state.todos.slice(0, updatedToDoIndex),
          updatedToDo,
          ...state.todos.slice(updatedToDoIndex + 1)
        ];
        return { ...state, todos: updatedToDos }
      default:
        return todosInitialState
    }
  }

  // useReducer hook to hold app state and dispatch action
  const [state, dispatch] = useReducer(todosReducer, todosInitialState);

  // load data from persistent store
  const data = getTodos();
  console.log(`initial app state of ${data.length} items`);

  // dispatch initial state data from persistent store if data was changed
  // must use effect hook to load data at component mount due to async data retrieval
  useEffect(() => {
    if (data.length > 0) {
      dispatch({ type: "get", payload: data })
    }
  }, [data]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <ToDoStack.Navigator initialRouteName="ToDoList">
        <ToDoStack.Screen name="ToDoList" component={ToDoList} />
        <ToDoStack.Screen name="ToDoDetail" component={ToDoDetail} />
      </ToDoStack.Navigator>
    </TodosContext.Provider>
  );
}

// Example to fetch GitHub users by REST request
function UserScreen() {
  return (
    <VStack
      flex={1} _dark={{ bg: "blueGray.900" }} _light={{ bg: "blueGray.50" }}
      px={4} pb={5} space={3} alignItems="center" justifyContent="space-between">
      <Box h="90%">
        <GitHub />
      </Box>
      <ToggleDarkMode />
    </VStack>
  )
}

// Example to display list of cards
function ProductScreen() {
  return (
    <VStack
      flex={1} _dark={{ bg: "blueGray.900" }} _light={{ bg: "blueGray.50" }}
      px={4} pb={5} space={3} alignItems="center" justifyContent="space-between">
      <Box h="90%">
        <ProductList />
      </Box>
      <ToggleDarkMode />
    </VStack>
  )
}

// Example login form
function LoginScreen() {
  return (
    <VStack
      flex={1} _dark={{ bg: "blueGray.900" }} _light={{ bg: "blueGray.50" }}
      px={4} pb={5} space={3} alignItems="center" justifyContent="space-between">
      <LoginForm />
      <ToggleDarkMode />
    </VStack>
  )
}
