/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import React from "react";
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("Message Handled in background", remoteMessage);
})
function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
        return null;

    }
    return <App/>
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
