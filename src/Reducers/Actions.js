import store from './Store';

import { ToastAndroid, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export const _addUserDetails = async(values) => {
    const id = Math.floor(Math.random() * 100) + 1;
    store.dispatch({
        type: 'ADD_USER_DETAIL',
        userId:  id,
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        
    })
     AsyncStorage.setItem('loggedInUserID', id.toString()).then(() => {
        Alert.alert('Notice!', 'Registeration Successfull, Login with credentials');
        
    })
    
};
export const _addLoginCredentials = async(values) => {
    // try {
    //     const jsonValue = JSON.stringify(values);
    //     await AsyncStorage.setItem('isLoggedIn', true)
    //   } catch (e) {
       
    //   }
    
    // const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    // isLoggedIn ?
    //     ToastAndroid.showWithGravity(
    //         'Logged in SuccessFully ' + { isLoggedIn },
    //         ToastAndroid.LONG,
    //         ToastAndroid.CENTER
    //     ) : Alert.alert('failed');
};