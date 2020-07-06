import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Home from './HomeScreen';
import Splash from './SplashScreen';

console.disableYellowBox = true;

export default class SecondarySplash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedin:true
        }

        this.getUserId;
    }

    getUserId = async () => {
        let userId = '';
        try {
          userId = (await AsyncStorage.getItem('loggedUserId')) || 'none';
            console.log('[getUserId]: ', userId);
            if (userId != null || undefined || '') {
                this.setState({
                    isLoggedin: true,
                  });
            }
         
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
        
      };
  render() {
    return (
                this.state.isLoggedin ? 
                    <Home/> : <Splash/>
        
      
    );
  }
}
