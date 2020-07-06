import  React from 'react';
import {Field, reduxForm} from 'redux-form';
import {
  View,
  Alert,
  Dimensions,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../Reducers/Actions'
import {Actions} from 'react-native-router-flux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';


console.disableYellowBox = true;

//Method to check if the account Exists
ValidateUser =  (users, email, password) => {
  
  users.map((item) => {
    item.email === email && item.password === password ?
       AsyncStorage.setItem('loggedUserId', item.userId.toString()).then(() => {
        Actions.replace("Home");
     })
      : email === '' || password === '' ?
        Alert.alert("Error", "Email or Password is empty, try filling them out")

        : email != item.email || password != item.password ?
          Alert.alert('Oooops!', 'Invalid email or password, Please Signup First')
          : Alert.alert('Oooops!', 'Something went wrong, try again later')
  })
}

const Login = (props) => {
  const [ textInputEmail, setTextInputEmail ] = React.useState('');
  const [ textInputPassword, setTextInputPassword ] = React.useState('');
  const userDetails = {users: props.user}
  
  return (
        <View style={styles.mainContainer}>
        <StatusBar backgroundColor="#45b3e0" barStyle="dark-content" />
        <View style={styles.header}>
          <Animatable.Text animation="slideInRight" style={styles.text_header}>
            Login with your account!
          </Animatable.Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          
          <Text style={{marginTop: 25}}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05357a" size={20} />
            <TextInput
                placeholder="Email"
                
                style={styles.textinput}
                onChangeText={TextInputValue =>
                setTextInputEmail(TextInputValue)
                }
              />
          </View>
          <Text style={{marginTop: 25}}>Password</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05357a" size={20} />
            <TextInput
                placeholder="Password"
                style={styles.textinput}
                secureTextEntry={true}
                onChangeText={TextInputValue =>
                setTextInputPassword(TextInputValue)
              
                }
              />
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={()=> ValidateUser(userDetails.users , textInputEmail , textInputPassword)}
             >
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontFamily: 'sans-serif-medium',
                }}>
                LOGIN
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonLogin}>
            <TouchableOpacity onPress={()=> Actions.replace("Register")}>
              <Text
                style={{
                  color: '#45b3e0',
                  fontWeight: 'bold',
                  fontFamily: 'sans-serif-medium',
                }}>
                REGISTER
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
};

function mapStateToProps(state) {
    return {
        user: state.user,
        form: state.form
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'WizardForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(Login));

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#45b3e0',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  text_header: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
  },
  text_footer: {
    fontSize: 18,
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
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#45b3e0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,

    elevation: 5,
  },
  buttonLogin: {
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#45b3e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,

    elevation: 5,
  },
  textinput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 15,
    color: '#05375a'
}
});
