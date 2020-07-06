import React, {useEffect} from 'react';
// import {Actions} from 'react-native-router-flux';
import {Field, reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
    TouchableOpacity,
  
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import AllStyles from '../Resources/Styles/AllStyles';
import textInput from '../Components/TextInput';
import * as Validate from '../Components/Validate';
import DropDown from '../Components/DropDown';
import * as actions from '../Reducers/Actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import store from '../Reducers/Store';

console.disableYellowBox = true;

const _submit = values => {

    actions._addUserDetails(values);
    Actions.replace("Login");
};

const Register = props => {
 
  const {handleSubmit, pristine, submitting, invalid, navigation} = props;


  

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#45b3e0" barStyle="dark-content" />
      <View style={styles.header}>
        <Animatable.Text animation="slideInRight" style={styles.text_header}>
          Register yourself!
        </Animatable.Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text>Full Name</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05357a" size={20} />
          <Field
            style={{
              flex: 1,
              marginTop: Platform.OS === 'ios' ? 0 : -12,
              paddingLeft: 15,
            }}
            name="fullname"
            component={textInput}
            type="text"
            placeholder="Full Name"
            validate={[Validate.required, Validate.maxLength15]}
            onChangeText={val => textInputChange(val)}
          />
        </View>
        <Text style={{marginTop: 25}}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05357a" size={20} />
          <Field
            style={{
              flex: 1,
              marginTop: Platform.OS === 'ios' ? 0 : -12,
              paddingLeft: 15,
            }}
            name="email"
            component={textInput}
            type="text"
            placeholder="Email"
            validate={[Validate.required]}
          />
        </View>
        <Text style={{marginTop: 25}}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05357a" size={20} />
          <Field
            style={{
              flex: 1,
              marginTop: Platform.OS === 'ios' ? 0 : -12,
              paddingLeft: 15,
            }}
            name="password"
            component={textInput}
            type="text"
            placeholder="Password"
            secureTextEntry={true}
            validate={[Validate.required, Validate.pass]}
          />
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={handleSubmit(_submit)}
            disabled={invalid || pristine || submitting}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontFamily: 'sans-serif-medium',
              }}>
              REGISTER
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonLogin}>
          <TouchableOpacity onPress={()=> Actions.replace("Login")}>
            <Text
              style={{
                color: '#45b3e0',
                fontWeight: 'bold',
                fontFamily: 'sans-serif-medium',
              }}>
              LOGIN
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
    form: state.form,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'WizardForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
  })(Register),
);
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
});
