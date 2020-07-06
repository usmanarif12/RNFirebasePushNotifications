import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  AsyncStorage,
  Modal,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {Field, reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../Reducers/Actions';
import {fcmService} from '../FCMService';
import {localNotificationService} from '../LocalNotificationService';
import data from './data';
import * as Animatable from 'react-native-animatable';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  GooglePay,
  RequestDataType,
  AllowedCardNetworkType,
  AllowedCardAuthMethodsType,
} from 'react-native-google-pay';
import {Actions} from 'react-native-router-flux';

console.disableYellowBox = true;
var userDetails = {users: []};
const allowedCardNetworks: AllowedCardNetworkType[] = ['VISA', 'MASTERCARD'];
const allowedCardAuthMethods: AllowedCardAuthMethodsType[] = [
  'PAN_ONLY',
  'CRYPTOGRAM_3DS',
];
var userId = '';
const stripeRequestData: RequestDataType = {
  //Details of Merchant i.e to whom sent payment
  cardPaymentMethod: {
    tokenizationSpecification: {
      type: 'PAYMENT_GATEWAY',
      gateway: 'stripe',
      gatewayMerchantId: '',
      stripe: {
        publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
        version: '2018-11-08',
      },
    },
    allowedCardNetworks,
    allowedCardAuthMethods,
  },
  transaction: {
    totalPrice: '10',
    totalPriceStatus: 'FINAL',
    currencyCode: 'USD',
  },
  merchantName: 'Example Merchant',
};

class Home extends Component {
  constructor(props) {
    super(props);
    userDetails.users = props.user;
    this.state = {
      flatlistData: data,
      showModal: false,
      status: 'Pending',
      Alert_Visibility: false,
      userIdState: this.getUserId(),
      textHeader: '',
      textBelowHeader: '',
    };
    this.getUserId;
  }

  componentDidMount() {
    //Setting Environment for Google Pay
    if (Platform.OS === 'android') {
      GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
    }

    //Registering Firebase Cloud Messaging
    fcmService.registerApWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister', token);
    }

    //Called when notification delivered to user
    function onNotification(notify) {
      console.log('[App] onNotification', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    //Called when user taps the notification
    function onOpenNotification(notify) {
      alert(notify.body);
    }

    return () => {
      console.log('[App] Unregister');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }

  //Payment Methods

  payWithPaypal = () => {
    this.Show_Custom_Alert(false); //Hide Custom Alert
    this.showModal(true); // Paypal Payment Modal => visible
  };
  handleResponse = data => {
    if (data.title === 'success') {
      this.setState({showModal: false, status: 'Complete'});
      Alert.alert('Payment Successfull', 'You had successfuly paid employee');
    } else if (data.title === 'cancel') {
      this.setState({showModal: false, status: 'Cancelled'});
      Alert.alert('Payment Cancelled', 'You had cancelled the payment');
    } else {
      return;
    }
  };

  //Google Pay Api Methods
  payWithGooglePay = (requestData: RequestDataType) => {
    this.Show_Custom_Alert(false); //Hides custom Alert
    // Check if Google Pay is available
    GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then(
      ready => {
        if (ready) {
          // Request payment token
          GooglePay.requestPayment(requestData)
            .then(this.handleSuccess)
            .catch(this.handleError);
        }
      },
    );
  };
  handleSuccess = (token: string) => {
    //If payment completed successfully
    // Send a token to your payment gateway
    Alert.alert('Congratulations!', 'You had successfully paid the amount');
  };
  handleError = (error: any) => {
    //If User cancelled the payment or Failed
    Alert.alert('Error', `${error.message}`);
  };

  //FlatList render Item method
  renderItem = ({item}) => {
    return (
      <Animatable.View
        animation="fadeInUpBig"
        style={{
          justifyContent: 'center',
          borderRadius: 3,
          backgroundColor: '#D8D8D8',
          alignItems: 'center',
          width: '100%',
          flexDirection: 'row',
          height: 120,
          marginTop: 10,
        }}>
        <Image
          source={{uri: item.photo}}
          style={{width: 90, height: 90, borderRadius: 50}}
        />
        <View style={{flexDirection: 'column', marginLeft: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
          <Text style={{fontSize: 14, marginTop: 5}}>{item.position}</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.Show_Custom_Alert(true)}
          style={{
            height: 50,
            width: 80,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 20,
          }}>
          <Text style={{color: 'green', fontWeight: 'bold', fontSize: 16}}>
            Pay
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  // State Altering Methods
  showModal = visibility => {
    //Methd to visible Paypal Modal
    this.setState({
      showModal: visibility,
    });
  };
  closeModal = () => {
    //Method to close Paypal Modal
    this.setState({
      showModal: false,
    });
  };
  Show_Custom_Alert(visible) {
    //A method to toggle the visibility state of Custom Alert
    this.setState({Alert_Visibility: visible});
  }
  //Getting logged in User id from Async Storage
  getUserId = async () => {
    let userId = '';
    try {
      userId = (await AsyncStorage.getItem('loggedUserId')) || 'none';
      console.log('[getUserId]: ', userId);
      this.setState({
        userIdState: userId,
      });
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return userId;
  };

  render() {
    let {userIdState} = this.state;
    console.log('[Render] :', userIdState);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
       
          {userDetails.users.length != 0
            ? userDetails.users.map(item => {
              return (
                userIdState.toString() == item.userId ?
                  <View>
                    <Text style={styles.text_header}>
                      Welcome {item.fullname} !
                    </Text>
                    <Text style={styles.text_footer}>{item.email} </Text>
                  </View> :
                  <View>
                  
                </View>
                ) 
                  
                
              })
            : Actions.Login()}
        </View>
        <View style={styles.footer}>
          <FlatList
            data={this.state.flatlistData}
            renderItem={this.renderItem}
            horizontal={false}
            keyExtractor={(item, index) => index}
          />
        </View>
        {/* Paypal Modal */}
        <Modal
          animationType="slide"
          visible={this.state.showModal}
          onRequestClose={this.closeModal}>
          <View style={{flex: 1}}>
            <WebView
              source={{uri: 'https://payapl-rn.herokuapp.com/'}}
              onNavigationStateChange={data => this.handleResponse(data)}
              mixedContentMode={'compatibility'}
            />
          </View>
        </Modal>
        <View>
          {/* Custome Alert Modal */}
          <Modal
            visible={this.state.Alert_Visibility}
            transparent={false}
            animationType={'fade'}
            onRequestClose={() => {
              this.Show_Custom_Alert(!this.state.Alert_Visibility);
            }}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.Alert_Main_View}>
                <Text style={styles.Alert_Title}>Select Payment Method</Text>

                <View
                  style={{width: '100%', height: 2, backgroundColor: '#fff'}}
                />

                <TouchableOpacity
                  onPress={this.payWithPaypal}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                  }}>
                  <ZocialIcon
                    name="paypal"
                    size={20}
                    color="#000"
                    style={{marginRight: 5}}
                  />
                  <Text> Paypal</Text>
                </TouchableOpacity>

                <View
                  style={{width: '100%', height: 1, backgroundColor: '#fff'}}
                />
                <TouchableOpacity
                  onPress={() => this.payWithGooglePay(stripeRequestData)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                  }}>
                  <AntDesign
                    name="google"
                    size={20}
                    color="#000"
                    style={{marginRight: 5}}
                  />
                  <Text> Google Pay</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}
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
    color: '#fff',
  },
  Alert_Main_View: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D8D8D8',
    height: 180,
    borderBottomWidth: 3,
    borderColor: '#000',
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 7,
  },

  Alert_Title: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    height: '28%',
  },

  Alert_Message: {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    padding: 10,
    height: '42%',
  },

  buttonStyle: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  TextStyle: {
    color: '#000',
    textAlign: 'center',
    fontSize: 22,
    marginTop: -5,
  },
});

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
  })(Home),
);
