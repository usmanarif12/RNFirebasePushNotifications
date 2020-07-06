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

console.disableYellowBox = true;

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedin:false
        }
    }
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        <View style={styles.header}>
          <Animatable.Image
            animation="flipInY"
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <Text style={styles.footerText}>Stay connected and enjoy!</Text>
          <Text style={styles.title}>Sign in with a Account</Text>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => Actions.replace('Register')}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif-medium',
                  }}>
                  Get Started
                </Text>
                <MaterialIcon name="navigate-next" color="#fff" size={20} />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
            <Text style={styles.baselineText}>
              Developed By: Muhammad Usman Arif
            </Text>
          </View>
        </Animatable.View>
      </View>
    );
  }
}
const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#45b3e0',
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  logo: {
    height: height_logo,
    width: 300,
  },
  footerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
  },
  title: {
    color: 'white',
    fontSize: 15,
    marginTop: 5,
    fontFamily: 'sans-serif-medium',
  },
  button: {
    width: 170,
    height: 45,
    backgroundColor: '#1fba4c',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    alignSelf: 'flex-end',
    elevation: 5,
  },
  baselineText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'sans-serif-condensed',
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
