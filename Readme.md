# Hello Expo

This is a set of examples for developing native iOS and Addroid apps by using [React Native](https://reactnative.dev/docs/getting-started) and the [NativeBase](https://docs.nativebase.io/getting-started) component library.  The examples are developed and tested by using the [Expo](https://docs.expo.io/) app framework.

It implements the examples in the book [Beginning React Native with Hooks](https://www.amazon.com/Beginning-React-Native-Hooks-Greg/dp/981147799X) by Greg Lim.  Read the book to understand more details of the examples.  The examples demostrate the use of [NativeBase components](https://reactnative.dev/docs/components-and-apis), as well as common features of native apps including the following:

* [React Hooks](https://reactjs.org/docs/hooks-reference.html#usecontext) for managing app state, and interaction with REST services and external persistence stores.
* [React Navigation](https://reactnavigation.org/docs/tab-based-navigation) for tab or stack based screen navigations.
* [axios](https://axios-http.com/) for invoking REST web services.
* [json-server](https://github.com/typicode/json-server) for testing data persistence.
* [Expo Icons](https://icons.expo.fyi/) that can be selected to display buttons.
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) properties that can be configured for visualization.

## Development Setup

Install NodeJS by using [NVM](https://github.com/nvm-sh/nvm).

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install --lts
```

On Mac, install Xcode from apple store, and then install Xcode CLI tools.

```sh
xcode-select --install
xcode-select -p
```

Install global JS utilities used by the examples.

```sh
npm install -g expo-cli
npm install -g json-server
```

## Start New App Project

If you want to create your own project in a `WORK` folder, and code from scratch, you can get started with the following steps.

```sh
cd ${WORK}
expo init helloexpo --template @native-base/expo-template
```

Start the app in iOS simulator

```sh
cd ${WORK}/helloexpo
expo start --ios
```

To publish and run the app on your device, i.e., iPhone, you can follow the following steps.

* Sign up at [Expo](https://expo.dev/), and create a project.
* Edit [app.json](./app.json) in the local project so the `slug` matches the project name on the Expo dev server, and `owner` matches your Expo user name.
* Publish app to the Expo dev server: `cd $WORK/helloexpo && expo publish`
* On the iPhone, find and install `Expo Go` from apple store.
* Start `Expo Go`, login, and start the previously published app.

## Libraries Used by the Examples

Following are libraries installed during the development of the examples in this project.

```sh
# to call REST web service
npm install axios
# to generate UUID
npm install uuid-random
# swipe list view
npm install --save react-native-swipe-list-view
# react screen navigation
npm install @react-navigation/native
npm install @react-navigation/stack
npm install react-native-gesture-handler
npx expo install @react-native-masked-view/masked-view
npm install @react-navigation/bottom-tabs
```

Note that the [Expo Snack](https://snack.expo.dev/?platform=ios) can be used to test code snippets.

## Demonstrate Data Persistence

To test the `ToDoList` example with external data persistence, we use [json-server](https://github.com/typicode/json-server) as a test database.

Start json-server:

```sh
cd ${WORK}/helloexpo
json-server todos.json
```

Uncomment the line `const storeUrl = "http://localhost:3000/todos/"` in [storeAPI.js](./components/storeAPI.js), and then start the app in iOS simulator.

Any changes to the `ToDoList` will be stored in the file [todos.json](./todos.json).  Note that dragging a ToDo list item to the left in the iOS similator would similate the swipe-left gesture, which allows you to edit or delete the item.