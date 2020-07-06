import React, { useEffect } from 'react';

import { View, StyleSheet, Text, Button } from 'react-native';
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import Home from "./src/screens/HomeScreen";
import {Provider} from 'react-redux';
import store from './src/Reducers/Store';
import Splash from "./src/screens/SplashScreen";
import Screen from './src/screens/Routerscreen';

export default function App() {
  return (
    <Provider store={store}>
   
      <Screen/>
   </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})